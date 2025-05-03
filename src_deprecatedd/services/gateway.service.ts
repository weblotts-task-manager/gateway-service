import axios, { AxiosInstance } from "axios";
import { ServiceConfig } from "../types/custom.types";

export class GatewayService {
  private services: Record<string, AxiosInstance>;
  private defaultTime: number;

  constructor(serviceConfigs: ServiceConfig[]) {
    this.defaultTime = 5000;
    this.services = {};

    serviceConfigs.forEach((config) => {
      this.services[config.name] = axios.create({
        baseURL: config.baseUrl,
        timeout: config.timeout || this.defaultTime,
      });
    });
  }

  public async routeRequest(serviceName: string, req: any): Promise<any> {
    if (!this.services[serviceName]) {
      throw new Error(`Service ${serviceName} not configured`);
    }
    const { method, path, body, query, headers } = req;
    try {
      const response = await this.services[serviceName]({
        method,
        url: path,
        data: body,
        params: query,
        headers: this.filterHeaders(headers),
      });
      return response.data;
    } catch (e: any) {
      if (e.response) {
        throw {
          status: e.response.status,
          data: e.response.data,
        };
      } else {
        throw {
          status: 500,
          data: { message: "Service unavailable" },
        };
      }
    }
  }

  private filterHeaders(headers: any): any {
    const headersToRemove = ["authorization", "cookie", "host"];
    const filteredHeaders = { ...headers, "x-gateway-request": "true" };

    headersToRemove.forEach((header) => {
      if (filteredHeaders[header]) {
        delete filteredHeaders[header];
      }
    });
    return filteredHeaders;
  }
}
