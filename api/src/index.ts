import express from "express";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { NotFoundError } from "./errors/not-found-error.js";
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  console.log("404 route reached");
  next(new NotFoundError());
});

app.use(errorHandler);

app.listen(8800, () => {
  console.log("Server is running!");
});
