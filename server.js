const server = {
  async start() {
    const app = initializeApp();
    addErrorResponses(app);
    connectToDatabase();
    await runMigrations();
    runApp(app);
  },
};

function initializeApp() {
  const cors = require("cors");
  const express = require("express");
  const router = require("./config/routes");
  const configureEnvironment = require("./config/environment");

  // Setup Environment Variables
  configureEnvironment();

  const app = express();

  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // parse application/json
  app.use(express.json());

  // TODOs: Log request and response by creating a middleware and using the middleware here.
  // The requests can be logged in the database.
  // For security, a middleware to verify client credientials can also be implemented.
  // By so doing, only authorized clients can access the API

  app.use("/", router); //api/controllers entry point

  return app;
}

function addErrorResponses(app) {
  app.use((error, _, res, __) => {
    const ApiError = require("./api_error");

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        message: error.message,
        ...error.extraAttributes,
      });
    }

    console.log(error.stack);
    res.status(500).json({
      message: "Something went wrong",
    });
  });
}

function connectToDatabase() {
  const sequelize = require("./db/sequelize");

  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

async function runMigrations() {
  const sequelize = require("./db/sequelize");
  const { Umzug, SequelizeStorage } = require("umzug");

  const umzug = new Umzug({
    storage: new SequelizeStorage({ sequelize }),
    context: sequelize.getQueryInterface(),
    migrations: {
      glob: process.cwd() + "/db/migrations/*.js",
    },
    logger: console,
  });

  await umzug.up();
}

function runApp(app) {
  app.listen(process.env.PORT || 8000, () => console.log("Server Started"));
}

server.start();

module.exports = server;
