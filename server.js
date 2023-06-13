const path = require("path");

const express = require("express");
//logging request
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
//security import

const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

//Documntaion swagger-UI

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// error require
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

//config enviroment
dotenv.config({ path: "config.env" });

//databse connction
const dbConnection = require("./config/database");

dbConnection();

//setting app

const app = express(); //build app

app.use(cors());
app.options("*", cors());

app.use(compression()); //reduce size of data return

app.use(express.json({ limit: "10kb" })); //'set JSON and limit request

app.use(express.urlencoded({ extended: false })); //make send data from form
app.use(express.static(path.join(__dirname, "uploads"))); // make uploads folder as public

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //document

//Security best parctice
app.use(mongoSanitize()); //prevent mongo injection
app.use(xss()); //prevent add html or script to data when send
app.use(
  hpp({
    whitelist: [
      "price",
      "sold",
      "ratingsQuantity",
      "ratingsAverage",
      "quantity",
    ],
  }),
); //middleware to protect against HTTP Parameter Pollution attacks

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Too many accounts created from this IP, please try again after an 15 minutes",
});

// Apply the rate limiting middleware to all requests
app.use("/api", limiter);

/************************** */

//logging request on when development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//  Router section=>

const mountRoutes = require("./routers");

mountRoutes(app);

//handling global error <=

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

/************************* */

//run server port

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log("server is connect");
});

//handling unexpect error and close server

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});

module.exports = app;
