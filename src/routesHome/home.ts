import { sayHello } from "../controllers/users.controller";
import { getHome } from "../controllers/home.controller";

export default [
  {
    path: "/",
    method: "get",
    action: getHome,
  },
  {
    path: "/api/v1/state",
    method: "get",
    action: sayHello,
  },
];
