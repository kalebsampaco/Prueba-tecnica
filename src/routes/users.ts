import {
  changePassword,
  codePassword,
  forgotPassword,
  getFunctionaryById,
  resetPassword,
  updateFunctionary,
  updatePhoto
} from "../controllers/users.controller";
import {
  authMiddleware,
  authenticateOfficial,
  authenticateToken,
  sendCode,
} from "../functions/authentication";
import {
  registerFunctionary,
} from "../functions/register";

export default [
  {
    path: "/authenticate_funcionario",
    method: "post",
    action: authenticateOfficial,
  },
  {
    path: "/authenticate/jwt",
    method: "get",
    action: authenticateToken,
  },
  {
    path: "/register_funcionario",
    method: "post",
    action: registerFunctionary,
  },
  {
    path: "/enviar_codigo",
    method: "post",
    action: sendCode,
  },
  {
    path: "/funcionario/perfil/:id",
    method: "get",
    action: authMiddleware(getFunctionaryById),
  },
  {
    path: "/funcionario/perfil/:id",
    method: "put",
    action: authMiddleware(updateFunctionary),
  },
  {
    path: "/user/change_password/:id",
    method: "put",
    action: authMiddleware(changePassword),
  },
  {
    path: "/user/forgot_password/:email",
    method: "get",
    action: forgotPassword,
  },
  {
    path: "/user/reset_password",
    method: "post",
    action: resetPassword,
  },
  {
    path: "/user/code_password",
    method: "post",
    action: codePassword,
  },
  {
    path: "/user/photo/:id",
    method: "put",
    action: authMiddleware(updatePhoto),
  },
];
