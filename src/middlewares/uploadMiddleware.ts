import fs from "fs";
import multer from "multer";
import path from "path";

export const DATA_DIR = path.join(__dirname, "../../data");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    cb(null, DATA_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, "temp.csv");
  },
});

export const upload = multer({ storage });
