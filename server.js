const path = require("path");
//logging request
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require('compression');
// error require
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

//config enviroment
dotenv.config({ path: "config.env" });

//databse connction
const dbConnection = require("./config/database");

dbConnection();

//setting app

const app = express();

app.use(cors());
app.options('*', cors());
app.use(compression());
app.use(express.json()); //set JSON
app.use(express.urlencoded({ extended: false })); //make send data from form
app.use(express.static(path.join(__dirname, "uploads"))); // make uploads folder as public

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
