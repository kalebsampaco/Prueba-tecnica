/************ import libraries ************/
import to from "await-to-js";
import { Request, Response } from 'express';
import { isEmpty } from "lodash";
import Sequelize = require("sequelize");

/************ import models ************/
import GiftCards from '../models/giftCard';

/************ Functions ************/
import { whereModel } from "../functions/whereModel";

/************ Instance operador sequelize ************/
const OP = Sequelize.Op;


export async function getAll(
  request: Request,
  response: Response,
  usr_id: number
) {
  const params: any = request.query;
  const where = whereModel(!isEmpty(params) ? JSON.parse(params.filters) : {});
  const limit = { limit: Number(params.rows) || 10 };
  const offset = {
    offset: (Number(params.page) || 0) * (Number(params.rows) || 20),
  };

  try {
    const result = await GiftCards.findAndCountAll({
      where: { user: usr_id},
    });
    response.status(200).send(result);
  } catch (error) {
    response.status(202).send({ status: "error", message: error.message });
  }
}

/**
 * @author Kalebsampaco
 * @description Function to get by id
 * @param request
 * @param response
 */
export async function getById(request: Request, response: Response, usr_id: number) {
  try {
    const result = await GiftCards.findOne({
      where: { cc_id: request.params.id, user: usr_id },
    });
    if(result) {
      return response.status(200).send(result);
    } else {
      response.status(500).send({ status: "error", message: 'Esta giftCard no le pertenece a este usuario' });
    }
  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}


/**
 * @author kalebsampaco
 * @param  {{body:any}} {body}
 * @param  {Response} response
 * @description it receives the user authentication info and generates a JWT token
 * it return the JWT token in the response object. If auth info is incorrent, it
 * sends a 500 status error in response
 */
export async function create(request: Request, response: Response, usr_id: number) {
  const {
    amount,
    currency,
    expirationDate,
    user
  } = request.body;

  try {
      const day = new Date();
      if (!amount || amount === 0) return response.status(500).send({ status: "error", message: 'el amount es cero o nulo' });
      console.log(new Date(expirationDate), day)
      if (!expirationDate || new Date(expirationDate) <= day) return response.status(500).send({ status: "error", message: 'la fecha no es futura o es nula' });
      const [errUsr, resultUsr] = await to(
        GiftCards.create({
          amount: amount,
          currency: currency,
          expirationDate: expirationDate,
          user: user
        })
      );
      if (errUsr) {
        return response.status(500).send({ status: "error", message: errUsr.message });
      }

      // ------------------------------------------------------------
      response
        .status(200)
        .send({ status: "success", message: "giftcard creado con exito" });
      // }

  } catch (error) {
    response.status(500).send({ status: error, message: error.message });
  }
}

/**
 * @author kalebsampaco
 * @description Function to update
 * @param request
 * @param response
 */
export async function update(request: Request, response: Response, usr_id: number) {
  const params = request.body;
  let errors: any = [];

  try {
    const day = new Date();
    if (!params.amount || params.amount === 0) return response.status(500).send({ status: "error", message: 'el amount es cero o nulo' });

    if (!params.expirationDate || new Date(params.expirationDate) <= day) return response.status(500).send({ status: "error", message: 'la fecha no es futura o es nula' });
    const result = await GiftCards.findOne({
      where: { cc_id: request.params.id, user: usr_id},
    });

    if (result) {

        const data = await result.update(params);

        response.status(200).send({
          userUpdate: data,
          errors,
        });

    } else {
      response.status(500).send({
        status: "error",
        message: "Acción imposible, no existe un gift card con ese id o no está asignado al usuario",
      });
    }
  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}

export async function deleteGiftCard(request: Request, response: Response, usr_id: number) {
  try {
    const result = await GiftCards.findOne({
      where: { cc_id: request.params.id, user: usr_id},
    });

    if (result) {
        const data = await result.destroy();

        return response.status(200).send({
          userUpdate: data
        });

    } else {
      return response.status(500).send({
        status: "error",
        message: "Acción imposible, no existe un gift card con ese id o no está asignado al usuario",
      });
    }

  } catch (error) {
    return response.status(500).send({ status: "error", message: error.message });
  }
}

/**
 * @author kalebsampaco
 * @description Function to update
 * @param request
 * @param response
 */
export async function transferAmount(request: Request, response: Response, usr_id: number) {
  const { sourceCardId, destinationCardId, amount } = request.body;

  console.log(amount, sourceCardId, destinationCardId)
  // Validación del body
  if (!amount || amount <= 0) {
    return response.status(400).send({ status: "error", message: "El amount es cero, nulo o negativo" });
  }
  const resultSource = await GiftCards.findOne({
      where: { cc_id: sourceCardId, user: usr_id},
    });

    const resultDestination = await GiftCards.findOne({
      where: { cc_id: destinationCardId, user: usr_id},
    });

    if (!resultSource) {
      return response.status(404).send({
        status: "error",
        message: `No se encontró la gift card origen con id ${sourceCardId} asociada al usuario.`,
      });
    }

    if (!resultDestination) {
      return response.status(404).send({
        status: "error",
        message: `No se encontró la gift card destino con id ${destinationCardId} asociada al usuario.`,
      });
    }
  try {


    if(resultSource.amount < amount) return response.status(500).send({ status: "error", message: 'La giftCard origen no tiene saldo suficiente' });
    resultSource.amount -= amount;
    resultDestination.amount += amount;

    const dataSource = await resultSource.save();
    const dataDestination = await resultDestination.save()

    response.status(200).send({
      sourceUpdate: dataSource,
      destinationUpdate: dataDestination
    });

  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}
