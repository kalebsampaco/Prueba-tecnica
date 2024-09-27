/************ import libraries ************/
import to from "await-to-js";
import { Request, Response } from "express";
import Sequelize = require("sequelize");
const OP = Sequelize.Op;

/************ Import models ************/
import CliUsuario from "../models/cliUsuario";
import Users from "../models/users";

import { getHash } from "./Hash";
/************ Import .env ************/
const { SECRET } = process.env;

/**
 * @author Kalebsampaco
 * @param  {{body:IUser}} {body}
 * @param  {Response} response
 * @description it receives the user authentication info and generates a JWT token
 * it return the JWT token in the response object. If auth info is incorrent, it
 * sends a 401 status error in response
 */
export async function registerFunctionary(
  request: Request,
  response: Response
) {
  const {
    reg_password,
    reg_email,
    reg_celular,
    reg_rol,
    reg_id_tipo_documento,
    reg_nombres,
    reg_apellidos,
    reg_documento,
    reg_id_cliente,
    reg_genero,
  } = request.body;

  try {
    // Se verifica si existe el email
    const resultEmail = await Users.findOne({
      where: { usr_username: reg_email },
    });
    console.log(resultEmail, 'email existe')
    if (resultEmail) {
      response
        .status(201)
        .send({
          status: "info",
          message:
            "¡El email que ha ingresado YA existe! Verifique e intente de nuevo.",
        });
    }
    // ------------------------------------------------------------
    const passEncrypt = await getHash(reg_password);
    const code = Math.floor(Math.random() * 1000 + 1000);
    // ------------------------------------------------------------
    const [errUsr, resultUsr] = await to(
      Users.create({
        usr_rol_id: reg_rol,
        usr_username: reg_email,
        usr_password_hash: passEncrypt,
        usr_email: reg_email,
        usr_phone: reg_celular,
        usr_verify:1,
        usr_sms_code: code,
        usr_creator_id: 1,
        usr_editor_id: 1,
        usr_created_at: new Date(),
        usr_updated_at: new Date(),
      })
    );

    console.log(errUsr, 'error en tabla user');
    if (errUsr) {
      response.status(500).send({ status: "error", message: errUsr.message });
    }

    const [errCliCliente, resulCliCliente] = await to(
      CliUsuario.create({
        cu_id_usuario: resultUsr.getDataValue("usr_id"),
        cu_id_cliente: reg_id_cliente,
        cu_id_rol: reg_rol,
        cu_id_tipo_documento: reg_id_tipo_documento,
        cu_nombres: reg_nombres,
        cu_apellidos: reg_apellidos,
        cu_documento: reg_documento,
        cu_email: reg_email,
        cu_celular: reg_celular,
        cu_estado: 1,
        cu_genero: reg_genero,
        cu_id_creador: 5,
        cu_id_editor: 5,
        cu_fecha_creacion: new Date(),
        cu_fecha_edicion: new Date(),
      })
    );
    console.log(errCliCliente, 'error en tabla cliente');
    if (errCliCliente) {
      resultUsr.destroy();
      response
        .status(500)
        .send({ status: "error", message: errCliCliente.message });
    }

      response
        .status(200)
        .send({ status: "success", message: "Usuario creado satisfactoriamente" });


  } catch (error) {
    response.status(401).send({ status: error, message: error.message });
  }
}

