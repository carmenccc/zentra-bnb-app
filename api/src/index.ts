import express from "express";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { NotFoundError } from "./errors/not-found-error.js";
import cookieSession from "cookie-session";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  console.log("404 route reached");
  next(new NotFoundError());
});

app.use(errorHandler);

const start = async () => {
  // ensure environment variables are defined
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  app.listen(8800, () => {
    console.log("Server is running!!!!!!");
  });
};

start();
