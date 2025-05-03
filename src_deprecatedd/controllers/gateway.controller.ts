import { NextFunction, Request, Response } from "express";
import { GatewayService } from "../services/gateway.service";

export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  public async routeRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const serviceName = req.params.service;
      const result = await this.gatewayService.routeRequest(serviceName, req);
      res.json(result);
    } catch (e: any) {
      next(e);
    }
  }

  public healthCheck(req: Request, res: Response): void {
    res.json({ status: "OK", timeStamp: new Date().toISOString() });
  }
}
