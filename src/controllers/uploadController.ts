import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { DATA_DIR } from "../middlewares/uploadMiddleware";
import { DataService } from "../services/dataService";
const DATA_FILE_PATH = path.join(`${DATA_DIR}/data.csv`);

export const postData = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  const tempFilePath = path.join(DATA_DIR, req.file.filename);

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.renameSync(tempFilePath, DATA_FILE_PATH);

    await DataService.getInstance().updateData();

    res.status(201).json({ message: "File replaced successfully" });
  } catch (error) {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    res.status(500).json({ error: "Failed to replace the file", details: error });
  }
};
