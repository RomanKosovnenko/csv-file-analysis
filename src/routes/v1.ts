import { Router } from "express";
import { getStats } from "../controllers/statsController";
import { getVisualization } from "../controllers/visualizationController";

const router = Router();

router.get("/stats", getStats);
router.get("/visualization", getVisualization);

export default router;
