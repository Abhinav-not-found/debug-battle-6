import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import routes from "./routes/index.js";

const app = express();

// ─── Security ───────────────────────────────────────────────────────────────
app.use(helmet());

// ─── Rate Limiting ───────────────────────────────────────────────────────────
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: env.NODE_ENV === "development" ? 10000 : 500,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		statusCode: 429,
		message: "Too many requests, please try again later.",
	},
});

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: env.NODE_ENV === "development" ? 10000 : 100,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		statusCode: 429,
		message: "Too many authentication attempts, please try again later.",
	},
});

app.use(limiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/signup", routes);

// ─── Body Parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static('public'))
app.use(cookieParser());
app.use(compression());
app.use(morgan("dev"));

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use("/api", routes);

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
	res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Error Handling ──────────────────────────────────────────────────────────
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
