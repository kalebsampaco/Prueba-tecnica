/************ import libraries ************/
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { isEmpty, isNil } from "lodash";
import Sequelize = require("sequelize");

/************ Import models ************/
import CliCliente from "../models/cliCliente";
import CliUsuario from "../models/cliUsuario";
import RolCliente from "../models/rolCliente";
import Roles from "../models/roles";
import Users from "../models/users";

/************ Instance operador sequelize ************/
const OP = Sequelize.Op;

/************ import function to compare hash and tokenHeader ************/
import RolesAdicionales from "../models/rolesAdicionales";
import { compareHash, getTokenFromHeader } from "./Hash";

/************ Import .env ************/
const { SECRET } = process.env;

/***
 * @author Kalebsampaco
 * @description it receives the authentication info and generate a Fernet token
 * it return the Fernet token in the response object.
 * if auth info is incorrect, it sends a 401 status error in response
 * @param {body} {body} object with user information
 * @param  {Response} response
 * @param  {Request} request
 * @returns {Promise}
 */
export async function authenticate(request: Request, response: Response) {
  const { username, password } = request.body;
  const NEW_CONFIG = {
    where: { usr_username: username, usr_erased: 0 },
    include: [
      {
        model: Roles,
        attributes: ["rl_id", "rl_rol"],
        where: { rl_tipo: 1 },
        include: [
          {
            model: RolCliente,
          },
        ],
      },
    ],
  };
  const result = await Users.findOne(NEW_CONFIG);
  if (result && result.getDataValue("usr_verify") === 0) {
    response
      .status(401)
      .send({ status: "error", message: "El usuario no se ha verificado" });
  } else {
    if (result && result.getDataValue("usr_state") === 0) {
      response.status(401).send({
        status: "error",
        message: "¡El usuario se ha bloqueado!. Consultar con el administrador",
      });
    } else {
      const passwordMatch = await compareHash(
        password,
        result ? result.getDataValue("usr_password_hash") : ""
      );
      if (!isNil(result) && !isEmpty(result) && passwordMatch) {
        result.usr_password_hash = "";
        const access_token = jwt.sign(
          {
            usr_id: result.getDataValue("usr_id"),
            usr_rol_id: result.getDataValue("usr_rol_id"),
          },
          SECRET,
          { expiresIn: "7d" }
        );
        const bodyUpdate = { usr_username: username };
        try {
          const users = await Users.findByPk(result.getDataValue("usr_id"));
          await users.update(bodyUpdate);
        } catch (error) {
          response
            .status(401)
            .send({ status: "error", message: "Error al actualizar datos" });
        }
        const data = {
          ...result["dataValues"],
          data: {
            displayName: result.getDataValue("usr_username"),
            name: result["dataValues"]["user_solicitante"]["us_nombres"],
            lastname: result["dataValues"]["user_solicitante"]["us_apellidos"],
            photoURL: result.getDataValue("usr_avatar"),
            email: result.getDataValue("usr_email"),
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
        response.status(200).send({
          auth_info: {
            access_token,
            user: data,
          },
        });
      } else {
        console.log(
          "------------------- authenticate ----------------------------- "
        );
        response.status(401).send({
          status: "error",
          message: "Error con el usuario y/o contraseña",
        });
      }
    }
  }
}


/**
 * @author kalebsampaco
 * @description it receives the authentication info and generate a Fernet token
 * it return the Fernet token in the response object.
 * if auth info is incorrect, it sends a 401 status error in response
 * @param {body} {body} object with user information
 * @param  {Response} response
 * @param  {Request} request
 * @returns {Promise}
 */
export async function authenticateOfficial(
request: Request, response: Response, p0: string) {
  const { username, password, cliente } = request.body;
  const NEW_CONFIG = {
    where: { usr_username: username, usr_erased: 0 },
    include: [
      {
        model: Roles,
        attributes: ["rl_id", "rl_rol"],
        where: { rl_tipo: 2 },
        include: [
          {
            model: RolCliente,
          },
        ],
      },
      {
        model: CliUsuario,
        attributes: ["cu_id", "cu_nombres", "cu_apellidos"],
        where: { cu_id_cliente: cliente },
        include: [
          {
            model: CliCliente,
            attributes: ["cc_id", "cc_nombre"],
            where: { cc_estado: 1 },
          },
        ],
      },
      {
        model: RolesAdicionales,
        required: false,
        where: { estado: 1 },
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
  };
  const result = await Users.findOne(NEW_CONFIG);
  if (result && result.getDataValue("usr_verify") === 0) {
    response
      .status(401)
      .send({ status: "error", message: "El usuario no se ha verificado" });
  } else {
    if (result && result.getDataValue("usr_state") === 0) {
      response.status(401).send({
        status: "error",
        message: "¡El usuario se ha bloqueado!. Consultar con el administrador",
      });
    } else {
      const passwordMatch = await compareHash(
        password,
        result ? result.getDataValue("usr_password_hash") : ""
      );
      if (!isNil(result) && !isEmpty(result) && passwordMatch) {
        result.usr_password_hash = "";
        const access_token = jwt.sign(
          {
            usr_id: result.getDataValue("usr_id"),
            usr_rol_id: result.getDataValue("usr_rol_id"),
          },
          SECRET,
          { expiresIn: "7d" }
        );
        const bodyUpdate = { usr_username: username };
        try {
          const users = await Users.findByPk(result.getDataValue("usr_id"));
          await users.update(bodyUpdate);
        } catch (error) {
          response
            .status(401)
            .send({ status: "error", message: "Error al actualizar datos" });
        }
        const data = {
          ...result["dataValues"],
          data: {
            rolesAdd:
              result?.roles_add.length > 0
                ? result.roles_add.map((e) => e)
                : [],
            displayName: result.getDataValue("usr_username"),
            name: result["dataValues"]["cli_usuario"]["cu_nombres"],
            lastname: result["dataValues"]["cli_usuario"]["cu_apellidos"],
            photoURL: result.getDataValue("usr_avatar"),
            email: result.getDataValue("usr_email"),
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
        response.status(200).send({
          auth_info: {
            access_token,
            user: data,
          },
        });
      } else {
        console.log(
          "------------------- authenticate Official ----------------------------- "
        );
        response.status(401).send({
          status: "error",
          message: "Error con el usuario y/o contraseña",
        });
      }
    }
  }
}

/**
 * @author Kalebsampaco
 * @param  {{body:IUser}} {body}
 * @param  {Response} response
 * @description it receives the user authentication info and generates a JWT token
 * it return the JWT token in the response object. If auth info is incorrent, it
 * sends a 401 status error in response
 */
export async function authenticateToken(request: Request, response: Response) {
  try {
    const token = getTokenFromHeader(request.headers.authorization || "");
    const { usr_id }: any = jwt.verify(token, SECRET);
    const NEW_CONFIG = {
      where: { usr_id, usr_erased: 0, usr_state: 1, usr_verify: 1 },
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
    result.usr_password_hash = "";
    const updatedAccessToken = jwt.sign(
      {
        usr_id: result.getDataValue("usr_id"),
        usr_rol_id: result.getDataValue("usr_rol_id"),
      },
      SECRET,
      {
        expiresIn: "7d",
      }
    );

    let dataUser = {};
    if (result["dataValues"]["fk_roles"]["rl_tipo"] === 0) {
      dataUser = {
        displayName: result.getDataValue("usr_username"),
        photoURL: result.getDataValue("usr_avatar"),
        email: result.getDataValue("usr_username"),
      };
    }  else {
      const NEW_CONFIG = {
        where: { usr_id, usr_erased: 0, usr_state: 1 },
        include: [
          {
            model: Roles,
            attributes: ["rl_id", "rl_rol"],
          },
          {
            model: RolesAdicionales,
            attributes: ["id", "id_rol", "estado"],
            where: { estado: 1 },
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
        rolesAdd:
          result?.roles_add.length > 0 ? result.roles_add.map((e) => e) : [],
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

    response.status(200).send({
      auth_info: {
        user: data,
        access_token: updatedAccessToken,
      },
    });
  } catch (e) {
    const error = "Invalid access token detected";
    response.status(401).send({ status: "error", error });
  }
}

/**
 * @author Styk Medina
 * @description it send code to user in app. Verify if celphone exist
 * if exist send code else register basic info user
 * @param {body} {body} object with user information
 * @param request
 * @param response
 */
export async function sendCode(request: Request, response: Response) {
  try {
    const { email, celular } = request.body;

    const code = Math.floor(Math.random() * 1000 + 1000);
    const NEW_CONFIG = {
      where: { usr_username: email, usr_erased: 0, usr_state: 1 },
    };
    const data = await Users.findOne(NEW_CONFIG);
    if (data) {
      if (data.getDataValue("usr_verify") === 1) {
        response
          .status(401)
          .send({ status: "error", message: "El usuario ya fue verificado" });
      } else {
        const result = await Users.findByPk(data.getDataValue("usr_id"));
        await result.update({ usr_sms_code: code });
      }

        response.status(200).send({
          status: "success",
          message: "Se ha reenviado un nuevo sms",
          code,
        });
    } else {
      response
        .status(500)
        .send({ status: "error", message: "¡Usuario no existe!" });
    }
  } catch (e) {
    response
      .status(500)
      .send({ status: e, message: "No se pudo enviar el codigo" });
  }
}

import { promisify } from "util";
const verifyAsync = promisify(jwt.verify);

/**
 * @author Kalebsampaco
 * @description The middleware takes any controller in the API and validates
 * the Fernet token (if it's valid) and returns the response for the desired
 * action in the controller, if it's not valid, it returns and error object in the response.
 * @param {any} controller
 * @param  {Response} response
 * @param  {Request} request
 * @returns {Promise}
 */
export const authMiddleware =
  (controller: any) => async (request: Request, response: Response) => {
   try {

      const token = getTokenFromHeader(request.headers.authorization || "");
      const decoded = jwt.verify(token, SECRET) as any; // Decodifica el token
      console.log(decoded);
      const { usr_id, usr_rol_id } = decoded;
      await controller(request, response, usr_id, usr_rol_id);
    } catch (error) {
      response.status(401).send({ status: "error", message: error.message });
    }
  };

/**
 * @author Kalebsampaco
 * @description The middleware takes any controller in the API and validates
 * the Fernet token (if it's valid) and returns the response for the desired
 * action in the controller, if it's not valid, it returns and error object in the response.
 * @param {any} controller
 * @param  {Response} response
 * @param  {Request} request
 * @returns {Promise}
 */
export const authMiddlewareRole =
  (controller: any, role: number[]) =>
  async (request: Request, response: Response) => {
    const token = getTokenFromHeader(request.headers.authorization || "");

    await jwt.verify(token, SECRET, async (error: Error, decoded) => {
      if (error) {
        response.status(401).send({ status: "error", message: error.message });
      } else {
        const { usr_id, usr_rol_id } = decoded;

        let rolesAdd = [];
        const rol = role.filter((i: any) => i === usr_rol_id);

        if (isNil(rol) || isEmpty(rol)) {
          /*Incluir la busqueda de roles adicionales para el usuario de la consulta*/
          rolesAdd = await RolesAdicionales.findAll({
            where: {
              id_usuario: usr_id,
              estado: 1,
              id_rol: {
                [OP.in]: role,
              },
            },
          });
        }

        if (rol.length > 0 || role[0] === 0 || rolesAdd.length > 0) {
          await controller(request, response, usr_id, usr_rol_id);
        } else {
          response.status(401).send({
            status: "error",
            message: "Usuario no permitido para usar este endpoint",
          });
        }
      }
    });
  };

