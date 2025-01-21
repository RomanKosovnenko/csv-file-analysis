import { createCanvas } from "canvas";
import { ChartConfiguration } from "chart.js";
import Chart from "chart.js/auto";
import { Person } from "../models/personSchema";

interface VisualizationService {
  generateChart(data: Person[], width: number, height: number): Promise<Buffer>;
}

export class BarChartVisualizationService implements VisualizationService {
  async generateChart(data: Person[], width: 800, height: 600): Promise<Buffer> {
    const ageGroups = { "<30": 0, "30-40": 0, "40-50": 0, "50-60": 0, ">=60": 0 };

    data.forEach(({ Age }) => {
      if (Age < 30) ageGroups["<30"]++;
      else if (Age < 40) ageGroups["30-40"]++;
      else if (Age < 50) ageGroups["40-50"]++;
      else if (Age < 60) ageGroups["50-60"]++;
      else ageGroups[">=60"]++;
    });

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d") as unknown as CanvasRenderingContext2D;

    const chartConfig: ChartConfiguration = {
      type: "bar",
      data: {
        labels: Object.keys(ageGroups),
        datasets: [
          {
            label: "Age Groups",
            data: Object.values(ageGroups),
          },
        ],
      },
    };

    new Chart(ctx, chartConfig);
    const buffer = canvas.toBuffer("image/png");
    return buffer;
  }
}
