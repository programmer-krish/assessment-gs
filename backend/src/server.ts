import dotenv from "dotenv";
import chalk from "chalk";
import http from "http";
import { app } from "./app";
import { log } from "./logger";

dotenv.config();
const port = process.env.PORT || 8000;

const server = http.createServer(app);

//configure the port
server.listen(port, () => {
  log.info(
    chalk.white.bgGreen.bold(" PORT ") +
      chalk.white.bgBlue.bold(` ${port} `) +
      chalk.white.bgGreen.bold(" MODE ") +
      chalk.white.bgRed.bold(` ${process.env.NODE_ENV || "dev"} `)
  );
});

export default server;
