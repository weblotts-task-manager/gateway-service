import { Router } from "express";
import { GatewayController } from "../controllers/gateway.controller";
import { GatewayService } from "../services/gateway.service";
import { ServiceConfig } from "../types/custom.types";

const serviceConfigs: ServiceConfig[] = [
  {
    name: "user-service",
    baseUrl: process.env.USER_SERVICE_URL || "http://localhost:5001",
    timeout: 3000,
  },
  {
    name: "task-service",
    baseUrl: process.env.TASK_SERVICE_URL || "http://localhost:5002",
  },
];

const gatewayService = new GatewayService(serviceConfigs);
const gatewayController = new GatewayController(gatewayService);

const gatewayRouter = Router();

gatewayRouter.get("/health", gatewayController.healthCheck);
gatewayRouter.all("/:service/:path", gatewayController.routeRequest);

export default gatewayRouter;
