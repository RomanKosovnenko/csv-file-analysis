import { Request, Response } from "express";
import { DataService } from "../services/dataService";
import { BarChartVisualizationService } from "../services/visualizationService";

export const getVisualization = async (req: Request, res: Response) => {
  try {
    const data = DataService.getInstance().getData();
    const visualizationService = new BarChartVisualizationService();
    const imageBuffer = await visualizationService.generateChart(data, 800, 600);
    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
