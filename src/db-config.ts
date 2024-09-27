import * as dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
dotenv.config();

const production = {
  host: 'localhost',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
};


const sequelize = new Sequelize({
  port: (process.env.DB_PORT as any) || 3306,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
  modelPaths: [`${__dirname}/models`],
  define: {
    underscored: true,
    charset: "utf8",
    timestamps: false,
  },
});

export default sequelize;
