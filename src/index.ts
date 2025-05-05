import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import proxyRoutes from "./routes/proxy.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;
app.use(morgan("dev"));

// app.get("/gateway/api/health", function (req: Request, res: Response) {
//   res.status(200).json({ message: "Gateway OK" });
// });

app.use(proxyRoutes);

app.listen(PORT, () => console.log(`Gateway running on port: ${PORT}`));
