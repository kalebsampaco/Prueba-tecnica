/************ import libraries ************/
import { Request, Response } from 'express';
import Sequelize = require('sequelize');

/************ import models ************/
import RolCliente from '../models/rolCliente';

/************ Functions ************/

/************ Instance operador sequelize ************/
const OP = Sequelize.Op;

/**
 * @author kalebsamapco
 * @description Function to get types of categories
 * @param request
 * @param response
 */
 export async function getRolByClient(request: Request, response: Response) {
    try {
        const result = await RolCliente.findAndCountAll({
            attributes: ['rc_id', 'rc_nombre', 'rc_id_cliente'],
            where: { rc_id_cliente: request.params.ccId }
        });
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send({ status: 'error', message: error.message });
    }
}
