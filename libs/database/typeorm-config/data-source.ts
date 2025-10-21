import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { entities } from "../src/lib/database.module";

config(); // Подключение .env

console.log("hit data source");
export default new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306", 10),
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASS || "defaultpassword",
  database: process.env.MYSQL_DB || "ridy",
  entities: entities,
  migrations: ["libs/database/src/lib/migration/*.ts"], // важно: путь до миграций
  synchronize: false,
  logging: true,
});
