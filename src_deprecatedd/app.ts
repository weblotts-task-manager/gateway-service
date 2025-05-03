import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import gatewayRouter from "./routes/gateway.routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeLogger();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: true, // or specify your frontend origins ['http://localhost:3000']
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    this.app.use("/api/gateway", gatewayRouter);
  }

  private initializeLogger(): void {
    this.app.use((req, res, next) => {
      console.log("Incoming request:", {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
      });
      next();
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public listen(port: number): void {
    this.app.listen(port, () =>
      console.log(`Gateway service running on port ${port}`)
    );
  }
}

export default App;
