import express from "express";
import authRouter from "./routes/auth.route";
import listingRouter from "./routes/listing.route";
import reservationRouter from "./routes/reservation.route";
import userRouter from "./routes/user.route";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/user", userRouter);

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

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be defined");
  }

  const port = process.env.PORT || 8800;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}!!!!!!`);
  });
};

start();
