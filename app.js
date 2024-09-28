// Util Package imports
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors';
// import "express-async-errors";

// routes import
import testRoute  from "./routes/testRoute.js";
import registerRoute from "./routes/registerRoute.js";
import logInRoute from "./routes/logInRoute.js"

// DB Connection Import
import { connectDB } from "./db/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
dotenv.config();


const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// connect to database
connectDB();
// routes
app.use("/api/v1", testRoute);
app.use("/api/v1", registerRoute);
app.use("/api/v1", logInRoute);
app.use("/", (req, res) => {
  res.send("<h1>Welcome to job portal app<h1/>");
});

app.use(errorHandler)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.ENV_MODE} mode on: http://localhost:${port}`
  );
});
