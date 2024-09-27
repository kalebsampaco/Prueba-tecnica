import {
  create,
  getAll,
  getById,
  getByIdRol,
  update,
  updateAndInactiveuser,
} from "../controllers/cliUsuario.controllers";
import {
  authMiddleware
} from "../functions/authentication";

export default [
  {
    path: "/cli_usuario/lista",
    method: "get",
    action: authMiddleware(getAll),
  },
  {
    path: "/cli_usuario/:id/:cu",
    method: "get",
    action: authMiddleware(getById),
  },
  {
    path: "/cli_usuario",
    method: "post",
    action: authMiddleware(create),
  },
  {
    path: "/cli_usuario/:id",
    method: "put",
    action: authMiddleware(update),
  },
  {
    path: "/cli_usuario_rol/:idRol/:idTerritorial",
    method: "get",
    action: authMiddleware(getByIdRol),
  },

  {
    path: "/cli_usuario/updateAndInactiveuser",
    method: "post",
    action: authMiddleware(updateAndInactiveuser),
  },

];
