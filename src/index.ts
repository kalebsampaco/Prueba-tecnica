import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as useragent from "express-useragent";
dotenv.config();
// tslint:disable-next-line:no-duplicate-imports
import { Request, Response } from "express";
import helmet from "helmet";
import * as morgan from "morgan";
import "reflect-metadata";
import * as errorhandler from "strong-error-handler";
import sequelizeInstance from "./db-config";
import { errorResourceNotFound } from "./middleware/errorhandler";
import { originHandler } from "./middleware/originHandler";
import CliCliente from './models/cliCliente';
import CliUsuario from './models/cliUsuario';
import RolCliente from './models/rolCliente';
import Users from './models/users';
import routes from "./routes";
import routesHome from "./routesHome";
;
// import * as  cluster from 'cluster';
const cluster = require("cluster");


// Registra los modelos
const models = {
  CliCliente,
  CliUsuario,
  RolCliente,
  Users,
  // Añade otros modelos aquí si los tienes
};

// Asociaciones de modelos (si existen)
// sequelizeInstance.addModels([CliCliente, CliUsuario, RolCliente, Users]);



sequelizeInstance
  .authenticate()
  .then(() => {
    if (cluster.isMaster) {
      sequelizeInstance.sync({ alter: false, force: false }).then(() => {
        initServer();
      });
    } else {
      initServer();
    }
  })
  .catch((err) => {
    console.error(err);
  });

function initServer() {
  const numCPUs = require("os").cpus().length;

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < 1; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log(
        "worker %d died (%s). restarting...",
        worker.process.pid,
        signal || code
      );
      cluster.fork();
    });
  }
  // tslint:disable-next-line:brace-style
  else {
    const app = express();
    app.use(morgan("dev"));
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(useragent.express());
    app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
    app.use(
      errorhandler({
        debug: process.env.ENV !== "prod",
        log: true,
      })
    );
    routesHome.forEach((route) => {
      app[route.method](
        `${route.path}`,
        (
          request: Request,
          response: Response,
          next: (error: Error) => void
        ) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });
    app.use(originHandler);
    routes.forEach((route) => {
      app[route.method](
        `/api/v1${route.path}`,
        (
          request: Request,
          response: Response,
          next: (error: Error) => void
        ) => {
          route
            .action(request, response,null)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });
    app.use(errorResourceNotFound);
    app.listen(process.env.APP_PORT || 3001);
    console.log(`Worker ${process.pid} started`);
  }
}
