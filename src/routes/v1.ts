import { Router } from "express";
import { getStats } from "../controllers/statsController";
import { postData } from "../controllers/uploadController";
import { getVisualization } from "../controllers/visualizationController";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/stats", getStats);
router.get("/visualization", getVisualization);
router.post("/upload", upload.single("file"), postData);

export default router;
