import { authMiddleware } from '../functions/authentication';
import { getAllList, getClientByState } from '../controllers/cliCliente.controllers';

export default [
  {
    path: '/cli_cliente/departamento/:stId',
    method: 'get',
    action: getClientByState,
  },
  {
    path: '/cli_cliente/list',
    method: 'get',
    action: getAllList,
  },
];
