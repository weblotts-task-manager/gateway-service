export interface ServiceConfig {
  name: string;
  baseUrl: string;
  timeout?: number;
}

export interface GatewayRequest {
  method: string;
  path: string;
  body?: any;
  query?: any;
  headers?: any;
}
