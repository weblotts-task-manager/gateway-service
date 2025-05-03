import dotenv from "dotenv";
import App from "./app";

dotenv.config();
const PORT = process.env.PORT || 50010;

const app = new App();
app.listen(Number(PORT));
