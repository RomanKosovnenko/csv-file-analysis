import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import v1Routes from "./routes/v1";
import { DataService } from "./services/dataService";

dotenv.config();

const app = express();
DataService.getInstance();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1", v1Routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
