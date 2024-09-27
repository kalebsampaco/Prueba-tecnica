/************ import libraries ************/
import to from "await-to-js";
import { Request, Response } from "express";
import { isEmpty, isNil } from "lodash";
import { QueryTypes } from "sequelize";
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
import { getHash } from "../functions/Hash";
import { orderModel } from "../functions/orderModel";
import { whereModel } from "../functions/whereModel";
import RolesAdicionales from "../models/rolesAdicionales";
import { HttpResponse } from "../util/HttpResponse";


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
  const order = !isEmpty(params.filters)
    ? orderModel(params.order_field, params.order_type)
    : {};

  const NEW_CONFIG: any = !isEmpty(params)
    ? {
        ...offset,
        ...limit,
        ...where,
        ...order,
        attributes: {
          exclude: ["cu_id_editor", "cu_fecha_edicion"],
          include: [
            [
              sequelize.Sequelize.literal(`
        (SELECT COUNT(*) as total FROM cli_usuario AS cu2
        )
      `), //cu.cu_id_usuario group by cu.cu_id
              "total_tramites",
            ],
          ],
        },
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
          {
            model: Users,
            as: "fk_usuario",
            attributes: ["usr_id", "usr_username", "usr_phone"],
          },
        ],
      }
    : {
        ...where,
        attributes: {
          exclude: ["cu_id_editor", "cu_fecha_edicion"],
          include: [
            [
              sequelize.Sequelize.literal(`
          (SELECT COUNT(*) as total FROM cli_usuario AS cu2
          )
        `), //cu.cu_id_usuario group by cu.cu_id
              "total_tramites",
            ],
          ],
        },
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
          {
            model: Users,
            as: "fk_usuario",
            attributes: ["usr_id", "usr_username", "usr_phone"],
          },
        ],
      };

  try {
    const result = await CliUsuario.findAndCountAll(NEW_CONFIG);
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
export async function getById(request: Request, response: Response) {
  try {
    const { cu } = request.params;
    const result = await CliUsuario.findOne({
      where: { cu_id: request.params.id },
      attributes: {
        exclude: ["cu_id_editor", "cu_fecha_edicion"],
      },
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
          attributes: ["usr_id", "usr_username", "usr_phone"],
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
 * @author Styk Medina
 * @param  {{body:IUser}} {body}
 * @param  {Response} response
 * @description it receives the user authentication info and generates a JWT token
 * it return the JWT token in the response object. If auth info is incorrent, it
 * sends a 500 status error in response
 */
export async function create(request: Request, response: Response) {
  const {
    cu_password,
    cu_email,
    cu_celular,
    cu_id_rol,
    cu_estado,
    cu_id_tipo_documento,
    cu_nombres,
    cu_apellidos,
    cu_documento,
    cu_id_cliente,
    cu_genero,
    cu_rol_add,
    cu_id_territorial,
  } = request.body;

  try {
    // Se verifica si existe el email
    const resultEmail = await Users.findOne({
      where: { usr_username: cu_email },
    });
    if (cu_id_rol == 5 || cu_id_rol == 25) {
      const resultRolExists = await Users.findOne({
        where: { usr_rol_id: cu_id_rol },
      });
      if (resultRolExists) {
        response.status(500).send({
          status: "error",
          message: "Acción imposible, ya existe un usuario con ese rol",
        });
        return;
      }
    }

    if (resultEmail) {
      if (resultEmail.getDataValue("usr_verify") === 1) {
        response.status(201).send({
          status: "info",
          message:
            "¡El email que ha ingresado YA existe! Verifique e intente de nuevo.",
        });
      } else {
        const existPhone = await Users.findAll({
          where: { usr_phone: cu_celular, usr_username: { [OP.ne]: cu_email } },
        });
        // if (!isEmpty(existPhone)) {
        //   response.status(201).send({ status: 'info', message: '¡El celular que ha ingresado YA existe! Verifique e intente de nuevo.' });
        // } else {

        // Si tratan de registarse con un correo de un usuario ciudadano
        const result = await Roles.findAll({ where: { rl_tipo: 2 } });
        const inquery = result.filter(
          (x) => x.rl_id === resultEmail.getDataValue("usr_rol_id")
        );

        if (!isEmpty(inquery)) {
          const passEncrypt = await getHash(cu_password);
          // const code = Math.floor(Math.random() * 1000 + 1000);
          // ------------------------------------------------------------
          await resultEmail.update({
            /*usr_sms_code: code,*/ usr_password_hash: passEncrypt,
            usr_phone: cu_celular,
            usr_rol_id: cu_id_rol,
            usr_updated_at: new Date(),
            usr_state_login: 1,
            usr_verify: 1,
          });
          // ------------------------------------------------------------
          const resultUS = await CliUsuario.findOne({
            where: { cu_id_usuario: resultEmail.getDataValue("usr_id") },
          });
          await resultUS.update({
            cu_id_cliente: cu_id_cliente,
            cu_id_rol: cu_id_rol,
            cu_id_tipo_documento: cu_id_tipo_documento,
            cu_nombres: cu_nombres,
            cu_apellidos: cu_apellidos,
            cu_documento: cu_documento,
            cu_email: cu_email,
            cu_estado: cu_estado,
            cu_celular: cu_celular,
            cu_genero: cu_genero,
            cu_id_creador: 5,
            cu_fecha_edicion: new Date(),
          });
          // ------------------------------------------------------------
          response
            .status(200)
            .send({ status: "success", message: "Usuario creado con exito" });
        } else {
          response.status(201).send({
            status: "info",
            message: "Email y/o celular ya está registrado #1",
          });
        }
        // }
      }
    } else {
      // No existe el email y se verifica por celular
      // const resultPhone = await Users.findOne({ where: { usr_phone: cu_celular } })
      // ------------------------------------------------------------
      // if (resultPhone) {
      //   response.status(201).send({ status: 'info', message: '¡El celular que ha ingresado YA existe! Verifique e intente de nuevo.' });
      // } else {
      // ------------------------------------------------------------
      const passEncrypt = await getHash(cu_password);
      // const code = Math.floor(Math.random() * 1000 + 1000);
      // ------------------------------------------------------------
      const [errUsr, resultUsr] = await to(
        Users.create({
          usr_rol_id: cu_id_rol,
          usr_username: cu_email,
          usr_password_hash: passEncrypt,
          usr_email: cu_email,
          usr_phone: cu_celular,
          // usr_sms_code: code,
          usr_creator_id: 5,
          usr_editor_id: 1,
          usr_state_login: 1,
          usr_verify: 1,
          usr_state: cu_estado,
          usr_created_at: new Date(),
          usr_updated_at: new Date(),
        })
      );
      if (errUsr) {
        response.status(500).send({ status: "error", message: errUsr.message });
      }

      const [errCliCliente, resulCliCliente] = await to(
        CliUsuario.create({
          cu_id_usuario: resultUsr.getDataValue("usr_id"),
          cu_id_cliente: cu_id_cliente,
          cu_id_rol: cu_id_rol,
          cu_id_tipo_documento: cu_id_tipo_documento,
          cu_nombres: cu_nombres,
          cu_apellidos: cu_apellidos,
          cu_documento: cu_documento,
          cu_email: cu_email,
          cu_celular: cu_celular,
          cu_estado: cu_estado,
          cu_genero: cu_genero,
          cu_id_creador: 5,
          cu_id_editor: 5,
          cu_fecha_creacion: new Date(),
          cu_fecha_edicion: new Date(),
          cu_id_territorial,
        })
      );

      if (errCliCliente) {
        resultUsr.destroy();
        response
          .status(500)
          .send({ status: "error", message: errCliCliente.message });
      }

      if (cu_rol_add.length > 0) {
        let id_usuario = resultUsr.getDataValue("usr_id");

        var rolesAdicionales = await cu_rol_add.reduce(
          async (acc: any, thing, index) => {
            Object.assign(cu_rol_add[index], { estado: 1, id_usuario });
            return acc;
          },
          []
        );

        let up = 1;
        let noExists = 0;
        let find = cu_rol_add.filter(async (e: any) => {
          if (e.id_rol === 25 || e.id_rol === 5) {
            return new Promise(async (resolve, reject) => {
              resolve(
                await RolesAdicionales.findAll({
                  where: { id_rol: e.id_rol },
                })
              );
            });
          } else {
            noExists += 1;
          }
        });
        if (noExists == 0) up = 0;
        if (up == 1) {
          const [errRolAdicional, resulRolAdicional] = await to(
            RolesAdicionales.bulkCreate(cu_rol_add)
          );
          if (errRolAdicional) {
            resulCliCliente.destroy();
            response
              .status(500)
              .send({ status: "error", message: errRolAdicional.message });
          }
        } else {
          response.status(500).send({
            status: "error",
            message: "Acción imposible, ya existe un usuario con ese rol",
          });
        }
      }

      // ------------------------------------------------------------
      response
        .status(200)
        .send({ status: "success", message: "Usuario creado con exito" });
      // }
    }
  } catch (error) {
    response.status(500).send({ status: error, message: error.message });
  }
}

export async function updateAndInactiveuser(req: Request, res: Response) {
  try {
    let {
      cu_id_usuario_send,
      cu_id_usuario_receive,
      cu_id_territorial_receive,
      rol,
      check,
      cu_resolucion,
    } = req.body;

    //5 DIRECTOR GENERAL --- 25 CLI_SUBDIRECTOR_JURIDICO

    const validChange = await sequelize.query(
      `SELECT COUNT(*) AS total FROM cli_usuario WHERE cu_id_rol = ${rol} AND cu_estado = 1`,
      {
        //AND cu_id_territorial = ${cu_id_territorial_receive}
        type: QueryTypes.SELECT,
      }
    );
    const validChange2 = await sequelize.query(
      `SELECT COUNT(*) AS total FROM users WHERE usr_rol_id = ${rol} AND usr_state = 1`,
      {
        //AND cu_id_territorial = ${cu_id_territorial_receive}
        type: QueryTypes.SELECT,
      }
    );

    const validRol = await sequelize.query(
      `
      SELECT cu_id_rol FROM cli_usuario WHERE cu_id_usuario = ${cu_id_usuario_send}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (
      validChange[0]["total"] <= 1 ||
      validChange2[0]["total"] <= 1 ||
      validRol[0]["cu_id_rol"] == 19
    ) {
      //valid user receive active
      const activeValid = await sequelize.query(
        `SELECT cu_estado, cu_id_rol FROM cli_usuario WHERE cu_id_usuario = ${cu_id_usuario_receive}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      const activeValid2 = await sequelize.query(
        `SELECT usr_state FROM users WHERE usr_id = ${cu_id_usuario_receive}`,
        {
          type: QueryTypes.SELECT,
        }
      );

      if (
        activeValid[0]["cu_estado"] == 1 &&
        activeValid2[0]["usr_state"] == 1
      ) {
        //update user receive, buscar los tramites del usuario y repatirlo entre que pertenezcan a la misma territorial
        const tramitesUserReceive = await sequelize.query(
          `
          SELECT ss.ss_id, 1 AS tipo FROM sol_solicitud AS ss WHERE ss.ss_id_responsable_actual = :idUsuarioReceive
          UNION
          SELECT x.id_solicitud, 2 as tipo FROM asignacion_paralela x WHERE x.ss_id_responsable = :idUsuarioReceive`,
          {
            replacements: {
              idUsuarioReceive: cu_id_usuario_receive,
            },
            type: QueryTypes.SELECT,
          }
        );

        const usersTerritorial = await sequelize.query(
          `
          SELECT
            t.*,
            (
            SELECT
              COUNT(*)
            FROM
              sol_asignacion_historial
            WHERE
              sah_id_user = t.usr_id) AS total
          FROM
            (
            SELECT
              u.usr_id,
              u.usr_username,
              u.usr_rol_id
            FROM
              users AS u
            WHERE
              u.usr_state = 1
              AND u.usr_verify = 1
              AND u.usr_rol_id = :idRole) AS t
          INNER JOIN cli_usuario cu ON
            cu.cu_id_usuario = t.usr_id
            AND cu.cu_id_territorial = :idTerritorial
            AND cu.cu_id_usuario != :idUsuarioReceive
          ORDER BY
            total ASC`,
          {
            replacements: {
              idRole: activeValid[0]["cu_id_rol"],
              idTerritorial: cu_id_territorial_receive,
              idUsuarioReceive: cu_id_usuario_receive,
            },
            type: QueryTypes.SELECT,
          }
        );

        if (tramitesUserReceive.length > 0 && usersTerritorial.length == 0) {
          res.status(500).send({
            message:
              "No es posible realizar la acción, no existen usuarios con el mismo rol en la misma territorial a los que puedas asignarles los tramites",
          });
          return;
        }

        let j = 0;
        for (let i = 0; i < tramitesUserReceive.length; i++) {
          if (i == 0) {
            j = 0;
          } else {
            j++;
            if (j > usersTerritorial.length) {
              j = 0;
            }
          }

          if (j == 0 || j < usersTerritorial.length) {
            if (tramitesUserReceive[i]["tipo"] == 1) {
              await sequelize.query(
                `UPDATE sol_solicitud SET ss_id_responsable_actual = ${usersTerritorial[j]["usr_id"]} WHERE ss_id = ${tramitesUserReceive[i]["ss_id"]}`,
                {
                  type: QueryTypes.UPDATE,
                }
              );
            } else {
              await sequelize.query(
                `UPDATE asignacion_paralela SET ss_id_responsable = ${usersTerritorial[j]["usr_id"]} WHERE id_solicitud = ${tramitesUserReceive[i]["ss_id"]}`,
                {
                  type: QueryTypes.UPDATE,
                }
              );
            }
          }
        }
        //end
        //update user receive in tramites
        const tramitesUserSend = await sequelize.query(
          `
          SELECT ss.ss_id, 1 as tipo FROM sol_solicitud as ss where ss.ss_id_responsable_actual = ${cu_id_usuario_send}
          UNION
          SELECT x.id_solicitud, 2 as tipo FROM asignacion_paralela x WHERE x.ss_id_responsable = ${cu_id_usuario_send}`,
          {
            type: QueryTypes.SELECT,
          }
        );
        for (let g = 0; g < tramitesUserSend.length; g++) {
          if (tramitesUserSend[g]["tipo"] == 1) {
            await sequelize.query(
              `UPDATE sol_solicitud SET ss_id_responsable_actual = ${cu_id_usuario_receive} WHERE ss_id = ${tramitesUserSend[g]["ss_id"]}`,
              {
                type: QueryTypes.UPDATE,
              }
            );
          } else {
            await sequelize.query(
              `UPDATE asignacion_paralela SET ss_id_responsable = ${cu_id_usuario_receive} WHERE id_solicitud = ${tramitesUserSend[g]["ss_id"]}`,
              {
                type: QueryTypes.UPDATE,
              }
            );
          }
          await sequelize.query(
            `UPDATE acto_administrativo SET aa_id_firmante = ${cu_id_usuario_receive} WHERE aa_id_solicitud = ${tramitesUserSend[g]["ss_id"]} AND aa_id_firmante = ${cu_id_usuario_send}`,
            {
              type: QueryTypes.UPDATE,
            }
          );
        }
        //end
        //update encargado to user receive

        if (check) {
          await sequelize.query(
            `UPDATE cli_usuario SET  ${
              cu_resolucion != ""
                ? "cu_resolucion = " + `'${cu_resolucion}'` + " ,"
                : " "
            } cu_encargado = 1, cu_id_rol = ${rol}, cu_estado = 1 WHERE cu_id_usuario = ${cu_id_usuario_receive}`,
            {
              type: QueryTypes.UPDATE,
            }
          );
          await sequelize.query(
            `UPDATE users SET usr_rol_id = ${rol}, usr_state = 1 WHERE usr_id = ${cu_id_usuario_receive}`,
            {
              type: QueryTypes.UPDATE,
            }
          );
        } else {
          await sequelize.query(
            `UPDATE cli_usuario SET ${
              cu_resolucion != ""
                ? "cu_resolucion = " + `'${cu_resolucion}'` + " ,"
                : " "
            } cu_encargado = 0, cu_id_rol = ${rol}, cu_estado = 1 WHERE cu_id_usuario = ${cu_id_usuario_receive}`,
            {
              type: QueryTypes.UPDATE,
            }
          );
          await sequelize.query(
            `UPDATE users SET usr_rol_id = ${rol}, usr_state = 1 WHERE usr_id = ${cu_id_usuario_receive}`,
            {
              type: QueryTypes.UPDATE,
            }
          );
        }
        //end
        //update user send
        await sequelize.query(
          `UPDATE cli_usuario SET cu_estado = 0, cu_id_rol = 19 WHERE cu_id_usuario = ${cu_id_usuario_send}`,
          {
            type: QueryTypes.UPDATE,
          }
        );
        await sequelize.query(
          `UPDATE users SET usr_rol_id = 19, usr_state = 0 WHERE usr_id = ${cu_id_usuario_send}`,
          {
            type: QueryTypes.UPDATE,
          }
        );

        /* Final */
        res.status(200).send({
          message: "Éxito",
        });
      } else {
        res.status(500).send({
          message:
            "No es posible realizar la acción, el usuario al que le vas asignar se encuentra inactivo",
        });
      }
    } else {
      res.status(500).send({
        message:
          "No es posible realizar la acción, ya existe usuario con este rol",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

/**
 * @author kalebsampaco
 * @description Function to update
 * @param request
 * @param response
 */
export async function update(request: Request, response: Response) {
  const params = request.body;
  let queryUpdate = [],
    queryCreate = [],
    queryRolInactivo = [],
    solicitudesActualizadas: any = [],
    errors: any = [],
    update = false,
    find = [],
    find1 = [],
    valid = [];

  try {
    const { cu_id_rol, cu_rol_add } = request.body;

    if (cu_rol_add && cu_rol_add.length > 0) {
      let rol = cu_rol_add.find((e) => e.id_rol === 25 || e.id_rol === 5);
      if (rol) {
        find = await RolesAdicionales.findAll({
          where: { id_rol: rol },
        });
        find1 = await CliUsuario.findAll({
          where: { cu_id_rol: rol },
        });
      }
    }

    if ([5, 25].includes(cu_id_rol)) {
      valid = await CliUsuario.findAll({
        where: { cu_id_rol: cu_id_rol },
      });
    }

    update = find.length > 1 || find1.length > 1 || valid.length > 1;

    if (!update) {
      const result = await CliUsuario.findOne({
        where: { cu_id: request.params.id },
      });

      const resultCliEmail = await CliUsuario.findAll({
        where: {
          cu_email: params.cu_email,
          cu_id_usuario: { [OP.ne]: result.getDataValue("cu_id_usuario") },
        },
      });
      const resultUserEmail = await Users.findAll({
        where: {
          usr_username: params.cu_email,
          usr_id: { [OP.ne]: result.getDataValue("cu_id_usuario") },
        },
      });

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

        let usr_rol_id = resultUser.usr_rol_id;

        const data = await result.update(params);
        await resultUser.update({
          usr_email: params.cu_email,
          usr_phone: params.cu_celular,
          usr_username: params.cu_email,
          usr_rol_id: params.cu_id_rol,
          usr_state: params.cu_estado,
        });

        if (params.cu_rol_add.length > 0) {
          for (const thing of params.cu_rol_add) {
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
                  `UPDATE roles_add SET estado = ${thing.estado}, fecha_edicion = NOW() WHERE id_usuario = ${result.cu_id_usuario} AND id_rol = ${thing.id_rol};`
                )
              );
            }

            if (thing.estado == 0) queryRolInactivo.push(thing.id_rol);
          }

          if (queryCreate.length > 0)
            await RolesAdicionales.bulkCreate(queryCreate);

          if (queryUpdate.length > 0) await Promise.all(queryUpdate);

        }


        solicitudesActualizadas = [...new Set(solicitudesActualizadas)];

        response.status(200).send({
          userUpdate: data,
          solUpdate: solicitudesActualizadas.length,
          sol: solicitudesActualizadas,
          errors,
        });
      }
    } else {
      response.status(500).send({
        status: "error",
        message: "Acción imposible, ya existe un usuario con ese rol",
      });
    }
  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}

/**
 * @author kalebsamapco
 * @description Function to get by idRol
 * @param request
 * @param response
 */
export async function getByIdRol(request: Request, response: Response) {
  const httpResponse = new HttpResponse();
  try {
    const result = await sequelize.query(
      `select cu.* from cli_usuario cu
        inner join users u on u.usr_id = cu.cu_id_usuario and u.usr_state = 1
        left join roles_add ra on ra.id_usuario = cu.cu_id_usuario
          where ((cu.cu_id_rol = ${request.params.idRol} and cu.cu_estado = 1)
            or (ra.id_rol = ${request.params.idRol} and ra.estado = 1)) and cu.cu_id_territorial = ${request.params.idTerritorial}
        GROUP by cu.cu_id `,
      {
        replacements: {},
        type: sequelize["QueryTypes"].SELECT,
      }
    );

    httpResponse.findAll(result);
    response.status(200).send(httpResponse);
  } catch (error) {
    httpResponse.error(error);
    response.status(500).send(httpResponse);
  }
}


