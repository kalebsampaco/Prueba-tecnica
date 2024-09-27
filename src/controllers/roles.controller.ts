/************ import libraries ************/
import { Request, Response } from "express";
import { HttpResponse } from "../util/HttpResponse";

/************ import models ************/
import RolCliente from "../models/rolCliente";
import Roles from "../models/roles";

/**
 * @author kalebsamapco
 * @description Function to get types of categories
 * @param request
 * @param response
 */
export async function getAllOfficialList(request: Request, response: Response) {
  try {
    const result = await Roles.findAndCountAll({
      where: { rl_estado: 1, rl_tipo: 2 },
      order: [[{ model: RolCliente, as: "rol_cliente" }, "rc_nombre", "ASC"]],
      attributes: ["rl_id", "rl_rol", "rl_estado"],
      include: [
        {
          model: RolCliente,
        },
      ],
    });
    const filterRol = result.rows.filter((e) => e.rl_rol !== "CLI_ADMIN");
    response.status(200).send({ count: filterRol.length, rows: filterRol });
  } catch (error) {
    response.status(500).send({ status: "error", message: error.message });
  }
}

/**
 * @author kalebsamapco
 * @description Function to list
 * @param response
 */
export async function getRoles(request: Request, response: Response) {
  const httpResponse = new HttpResponse();
  try {
    const result = await Roles.findAll({
      where: { rl_estado: 1 },
      order: [[{ model: RolCliente, as: "rol_cliente" }, "rc_nombre", "ASC"]],
      attributes: ["rl_id", "rl_rol", "rl_tipo"],
      include: [
        {
          model: RolCliente,
        },
      ],
    });
    if (result.length > 0) httpResponse.findAll(result);
    else httpResponse.emptyRecords();
    response.status(200).send(httpResponse);
  } catch (error) {
    httpResponse.error("Error listando los registros", error);
    response.status(202).send(httpResponse);
  }
}

/**
 * @author kalebsamapco
 * @description Function to bring the roles with names
 * @param response
 */
export async function getRolesWithNameRol(request: Request, response: Response) {
  const httpResponse = new HttpResponse();
  try {
    const result = await Roles.findAll({
      where: { rl_estado: 1 },
      attributes: ["rl_id", "rl_rol", "rl_tipo"],
      include: [
        {
          model: RolCliente,
        },
      ],
    });
    if (result.length > 0) httpResponse.findAll(result);
    else httpResponse.emptyRecords();

    response.status(200).send(httpResponse);
  } catch (error) {
    httpResponse.error("Error listando los registros", error);
    response.status(202).send(httpResponse);
  }
}
