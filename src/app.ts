import dotenv from "dotenv";
import express, { Request, Response } from "express";
import v1Routes from "./routes/v1";
import { DataService } from "./services/dataService";

dotenv.config();

const app = express();
DataService.getInstance();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", v1Routes);

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
