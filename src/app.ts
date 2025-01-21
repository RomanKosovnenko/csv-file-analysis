import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { DataService } from "./services/dataService";

dotenv.config();

const app = express();
DataService.getInstance();
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
