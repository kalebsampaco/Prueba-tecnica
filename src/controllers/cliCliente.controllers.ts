/************ import libraries ************/
import { Request, Response } from 'express';
import Sequelize = require('sequelize');

/************ import models ************/
import CliCliente from '../models/cliCliente';

/************ Functions ************/

/************ Instance operador sequelize ************/
const OP = Sequelize.Op;

/**
 * @author kalebsampaco
 * @description Function to get types of categories
 * @param request
 * @param response
 */
export async function getClientByState(request: Request, response: Response) {
    try {
        const result = await CliCliente.findOne({
            attributes: ['cc_id', 'cc_id_ciudad', 'cc_nombre', 'cc_descripcion', 'cc_estado', 'cc_id_ciudad'],
        });
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send({ status: 'error', message: error.message });
    }
}

/**
 * @author kalebsampaco
 * @description Function to get types of categories
 * @param request
 * @param response
 */
export async function getAllList(request: Request, response: Response){
    try {
        const result = await CliCliente.findAndCountAll({ where: { cc_estado: 1}, attributes: ['cc_id', 'cc_nombre', 'cc_estado'] });
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send({ status: 'error', message: error.message });
    }
}
