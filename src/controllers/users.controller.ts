/************ import libraries ************/
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { isEmpty, isNil } from "lodash";
import sequelize from "../db-config";
import Sequelize = require("sequelize");

/************ import models ************/
import CliCliente from "../models/cliCliente";
import CliUsuario from "../models/cliUsuario";
import RolCliente from "../models/rolCliente";
import Roles from "../models/roles";
import Users from "../models/users";

/************ Functions ************/

/************ Instance operador sequelize ************/
const OP = Sequelize.Op;
const { SECRET } = process.env;

/************ import function to compare hash and tokenHeader ************/
import { compareHash, getHash } from "../functions/Hash";
import RolesAdicionales from "../models/rolesAdicionales";



/**
 * @author kalebsamapco
 * @description Function to get by id
 * @param request
 * @param response
 */
export async function getFunctionaryById(request: Request, response: Response) {
  try {
    const result = await CliUsuario.findOne({
      where: { cu_id_usuario: request.params.id },
      include: [
        {
          model: Roles,
          attributes: ["rl_id", "rl_rol"],
          include: [
            {
              model: RolCliente,
            },
          ],
        },
        {
          model: CliCliente,
          attributes: ["cc_id", "cc_nombre", "cc_nit"],
        },
        {
          model: Users,
          as: "fk_usuario",
          attributes: ["usr_id"],
          include: [
            {
              model: RolesAdicionales,
              attributes: ["id", "id_rol", "estado"],
              required: false,
              include: [
                {
                  model: Roles,
                  attributes: ["rl_id", "rl_rol"],
                  include: [
                    {
                      model: RolCliente,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}

/**
 * @author kalebsamapco
 * @description Function to update
 * @param request
 * @param response
 */
export async function updateFunctionary(request: Request, response: Response) {
  const params = request.body;
  let queryUpdate = [];
  let queryCreate = [];
  try {
    const result = await CliUsuario.findOne({
      where: { cu_id_usuario: request.params.id },
    });

    if (isNil(result) && isEmpty(result)) {
      response
        .status(201)
        .send({ status: "info", message: "No hay coincidencias" });
    } else {
      const resultCliPhone = await CliUsuario.findAll({
        where: {
          cu_celular: params.cu_celular,
          cu_id_usuario: { [OP.ne]: request.params.id },
        },
      });
      const resultUserPhone = await Users.findAll({
        where: {
          usr_phone: params.cu_celular,
          usr_id: { [OP.ne]: request.params.id },
        },
      });

      const resultCliEmail = await CliUsuario.findAll({
        where: {
          cu_email: params.cu_email,
          cu_id_usuario: { [OP.ne]: request.params.id },
        },
      });
      const resultUserEmail = await Users.findAll({
        where: {
          usr_username: params.cu_email,
          usr_id: { [OP.ne]: request.params.id },
        },
      });

      // if (!isEmpty(resultCliPhone) || !isEmpty(resultUserPhone)) {
      //   response.status(201).send({ status: 'info', message: 'Error: El celular ingresado ya pertenece a otro usuario. Verifique e intente de nuevo.' });
      // } else {

      if (!isEmpty(resultCliEmail) || !isEmpty(resultUserEmail)) {
        response.status(201).send({
          status: "info",
          message:
            "Error: El correo ingresado ya pertenece a otro usuario. Verifique e intente de nuevo.",
        });
      } else {
        const resultUser = await Users.findOne({
          where: { usr_id: result.getDataValue("cu_id_usuario") },
        });

        const data = await result.update(params);
        const dataUser = await resultUser.update({
          usr_email: params.cu_email,
          usr_phone: params.cu_celular,
          usr_username: params.cu_email,
          us_id_rol: params.cu_id_rol,
        });

        if (params.cu_rol_add.length > 0) {
          var reduce = await params.cu_rol_add.reduce(
            async (acc: any, thing, index) => {
              let resultRolAdd = await RolesAdicionales.findOne({
                where: {
                  id_usuario: result.getDataValue("cu_id_usuario"),
                  id_rol: thing.id_rol,
                },
              });

              if (isNil(resultRolAdd) && isEmpty(resultRolAdd)) {
                queryCreate.push({
                  id_rol: thing.id_rol,
                  id_usuario: result.getDataValue("cu_id_usuario"),
                  estado: thing.estado,
                });
              } else {
                queryUpdate.push(
                  sequelize.query(
                    `UPDATE roles_add SET estado = ${
                      thing.estado
                    }, fecha_edicion = NOW() WHERE id_usuario = ${result.getDataValue(
                      "cu_id_usuario"
                    )} AND id_rol = ${thing.id_rol};`
                  )
                );
              }
            },
            []
          );

          if (queryCreate.length > 0)
            await RolesAdicionales.bulkCreate(queryCreate);

          if (queryUpdate.length > 0) {
            const updateData = await Promise.all(queryUpdate);
          }
        }
        response.status(200).send(data);
      }
      // }
    }
  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}

/**
 * @author kalebsamapco
 * @description Function to update
 * @param request
 * @param response
 */
export async function changePassword(
  request: Request,
  response: Response,
  usr_id: number
) {
  const params = request.body;

  try {
    const user = await Users.findByPk(request.params.id);
    const passwordMatch = await compareHash(
      params.old_password,
      user ? user.getDataValue("usr_password_hash") : ""
    );
    const newPassword = await getHash(params.new_passward);
    if (passwordMatch) {
      await user.update({
        usr_password_hash: newPassword,
        usr_editor_id: usr_id,
        usr_updated_at: new Date(),
      });
      response
        .status(200)
        .send({ message: "¡La contraseña actualizada con exito!" });
    } else {
      response.status(201).send({
        status: "info",
        message:
          "Error: La clave actual ingresada no coincide. Verifique e intente de nuevo",
      });
    }
  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}

/**
 * @author kalebsampaco
 * @description Envia un email al correo de un usuario en caso de que este olvide su contraseña.
 * @param request
 * @param response
 */

export async function forgotPassword(request: Request, response: Response) {
  try {
    const result = await Users.findOne({
      where: { usr_username: request.params.email },
    });
    if (result) {
      if (result.getDataValue("usr_verify") === 0) {
        response.status(401).send({
          status: "error",
          message:
            "El usuario no se ha verificado y no puede restablecer contraseña",
        });
      } else {
        if (result.getDataValue("usr_state") === 0) {
          response.status(401).send({
            status: "error",
            message:
              "¡El usuario se ha bloqueado!. Consultar con el administrador",
          });
        } else {
          const code = Math.floor(Math.random() * 1000 + 1000);

          const token = jwt.sign(
            { usr_id: result.getDataValue("usr_id") },
            SECRET,
            { expiresIn: "7d" }
          );
          await result.update({ usr_reset_pass: token, usr_reset_code: code });

          const phone = result.getDataValue("usr_phone");

            response.status(200).send({
              status: "success",
              message: "Se ha reenviado un nuevo sms",
              token,
            });
        }
      }
    } else {
      response.status(201).send({
        status: "info",
        message: "No existe un usuario asociado al correo ingresado",
      });
    }
  } catch (error) {
    console.log(
      "------------------- forgotPass ----------------------------- ",
      error
    );
    response.status(500).send({ status: "error", message: error.message });
  }
}

/**
 * @author kalebsamapco
 * @description Cambia el password cuando se esta reiniciando
 * @param request
 * @param response
 */

export async function codePassword(request: Request, response: Response) {
  const { token, code } = request.body;
  try {
    const user = await Users.findOne({
      where: { usr_reset_pass: token, usr_verify: 1 },
    });
    if (user) {
        await user.update({ usr_reset_code: null });
        response
          .status(200)
          .send({ status: "success", message: "El codigo es válido" });
    } else {
      response.status(201).send({
        status: "info",
        message: "Token invalido, vuelve a intentarlo",
      });
    }
  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}

/**
 * @author kalebsamapco
 * @description Cambia el password cuando se esta reiniciando
 * @param request
 * @param response
 */

export async function resetPassword(request: Request, response: Response) {
  const { password_reset, token } = request.body;
  try {
    const user = await Users.findOne({
      where: { usr_reset_pass: token, usr_verify: 1 },
    });
    if (user) {
      const newPassword = await getHash(password_reset);
      await user.update({
        usr_password_hash: newPassword,
        usr_reset_pass: null,
      });
      response.status(200).send({
        status: "success",
        message: "La contraseña se ha actualizado con exito",
      });
    } else {
      response.status(201).send({
        status: "info",
        message: "Token invalido, vuelve a intentarlo",
      });
    }
  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}

/**
 * @author kalebsamapco
 * @description Function to update
 * @param request
 * @param response
 */
export async function updatePhoto(
  request: Request,
  response: Response,
  usr_id: number
) {
  try {
    const NEW_CONFIG = {
      where: { usr_id: request.params.id },
      include: [
        {
          model: Roles,
          attributes: ["rl_id", "rl_rol", "rl_tipo"],
          include: [
            {
              model: RolCliente,
            },
          ],
        },
      ],
    };
    const result = await Users.findOne(NEW_CONFIG);
    await result.update({ usr_avatar: request.body.usr_avatar });

    let dataUser = {};
    if (result["dataValues"]["fk_roles"]["rl_tipo"] === 1) {
      const NEW_CONFIG = {
        where: { usr_id, usr_erased: 0, usr_state: 1 },
        include: [
          {
            model: Roles,
            attributes: ["rl_id", "rl_rol"],
            where: { rl_tipo: 1 },
          },
        ],
      };
      const result = await Users.findOne(NEW_CONFIG);
      dataUser = {
        displayName: result.getDataValue("usr_username"),
        name: result["dataValues"]["user_solicitante"]["us_nombres"],
        lastname: result["dataValues"]["user_solicitante"]["us_apellidos"],
        photoURL: result.getDataValue("usr_avatar"),
        email: result.getDataValue("usr_email"),
      };
    } else {
      const NEW_CONFIG = {
        where: { usr_id, usr_erased: 0, usr_state: 1 },
        include: [
          {
            model: Roles,
            attributes: ["rl_id", "rl_rol"],
          },
          {
            model: CliUsuario,
            attributes: ["cu_id", "cu_nombres", "cu_apellidos"],
            include: [
              {
                model: CliCliente,
                attributes: ["cc_id", "cc_nombre"],
              },
            ],
          },
        ],
      };
      const result = await Users.findOne(NEW_CONFIG);
      dataUser = {
        displayName: result.getDataValue("usr_username"),
        name: result["dataValues"]["cli_usuario"]["cu_nombres"],
        lastname: result["dataValues"]["cli_usuario"]["cu_apellidos"],
        photoURL: result.getDataValue("usr_avatar"),
        email: result.getDataValue("usr_email"),
      };
    }

    const data = {
      ...result["dataValues"],
      data: {
        ...dataUser,
        settings: {
          layout: {
            style: "layout1",
            config: {
              scroll: "content",
              navbar: {
                display: true,
                folded: false,
                position: "left",
              },
              toolbar: {
                display: true,
                style: "fixed",
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
              mode: "fullwidth",
            },
          },
          customScrollbars: true,
          theme: {
            main: "default",
            navbar: "mainThemeLight",
            toolbar: "mainThemeLight",
            footer: "mainThemeDark",
          },
        },
      },
    };
    response.status(200).send(data);
  } catch (error) {
    console.log(
      "------------------- update ----------------------------- ",
      error
    );
    response.status(500).send({ status: "error", message: error.message });
  }
}

export async function sayHello(request: Request, response: Response) {
  try {
    response.status(200).send({ status: "success", message: "Hello World" });
  } catch (e) {
    response.status(500).send({ status: "error", message: e.message });
  }
}
