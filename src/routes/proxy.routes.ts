import express, { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { AUTH_SERVICE_URL, TASKS_SERVICE_URL } from "../config/env";
import { authenticate } from "../middlewares/auth.middleware";
import { logger } from "../middlewares/logger.middleware";
const proxyRoutes = express.Router();

proxyRoutes.use(
  "/gateway/api/auth/",
  createProxyMiddleware<Request, Response>({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/auth/:path": "" },
    logger: console,
  })
);
proxyRoutes.use(
  "/gateway/api/tasks",
  authenticate,
  createProxyMiddleware<Request, Response>({
    target: TASKS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/tasks": "" },
    logger: console,
  })
);

proxyRoutes.get("/", async (req: Request, res: Response) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    memoryUsage: process.memoryUsage(),
  };

  try {
    res.status(200).json(healthCheck);
  } catch (e: any) {
    healthCheck.message = e.message;
    logger.error("Health Check Failed", e);
    res.status(503).json(healthCheck);
  }
});

export default proxyRoutes;
