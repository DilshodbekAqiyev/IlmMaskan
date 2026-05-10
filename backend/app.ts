require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import { rateLimit } from "express-rate-limit";
import { i18next, middleware } from "./utils/i18n";
import dns from 'dns'

dns.setServers(['8.8.8.8','1.1.1.1']);

// cors => cross origin resource sharing
const allowedOrigins = process.env.ORIGIN
  ? process.env.ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:3000", "https://ilm-maskan.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// i18next middleware
app.use(middleware.handle(i18next));

// api requests limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  },
});

// limiter
app.use(limiter);

// routes
app.use(
  "/api/v1",
  userRouter,
  orderRouter,
  courseRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter,
);

// testing api
app.get("/test", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      message: "API is working",
    });
  } catch (error) {
    next(error);
  }
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// middleware calls
app.use(ErrorMiddleware);
