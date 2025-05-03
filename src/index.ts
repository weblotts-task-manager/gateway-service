import dotenv from "dotenv";
import express, { Request, Response } from "express";
import proxyRoutes from "./routes/proxy.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

app.use((req, res, next) => {
  console.log("Incoming request:", {
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
  });
  next();
});

app.get("/gateway/api/health", function (req: Request, res: Response) {
  res.status(200).json({ message: "Gateway OK" });
});

app.use(proxyRoutes);

app.listen(PORT, () => console.log(`Gateway running on port: ${PORT}`));
