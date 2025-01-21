import { Request, Response } from "express";
import { StatsService } from "../services/statsService";
import { DataService } from "./../services/dataService";

export const getStats = async (req: Request, res: Response) => {
  try {
    const data = DataService.getInstance().getData();
    const statsService = new StatsService();

    const stats = statsService.getStatistics(data);
    res.json(stats);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
