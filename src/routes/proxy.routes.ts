import express, { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authenticate } from "../middlewares/auth.middleware";
const proxyRoutes = express.Router();

proxyRoutes.use(
  "/gateway/api/auth/",
  createProxyMiddleware<Request, Response>({
    target: "http://localhost:5002/api/auth/",
    changeOrigin: true,
    pathRewrite: { "^/api/auth/:path": "" },
    logger: console,
  })
);
proxyRoutes.use(
  "/gateway/api/tasks",
  authenticate,
  createProxyMiddleware<Request, Response>({
    target: "http://localhost:5003/api/tasks/",
    changeOrigin: true,
    pathRewrite: { "^/api/tasks": "" },
    logger: console,
  })
);

export default proxyRoutes;
