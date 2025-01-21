import { createCanvas } from "canvas";
import { Person } from "../../models/personSchema";
import { BarChartVisualizationService } from "../../services/visualizationService";

jest.mock("canvas", () => ({
  createCanvas: jest.fn(),
}));

describe("BarChartVisualizationService", () => {
  let service: BarChartVisualizationService;
  const mockData: Person[] = [
    { ID: 1, Name: "Lola Schmitt", Age: 25, Salary: 3000 },
    { ID: 2, Name: "Mina Johns", Age: 35, Salary: 4000 },
    { ID: 3, Name: "Elda Zemlak", Age: 45, Salary: 5000 },
    { ID: 4, Name: "Rocio Robel", Age: 55, Salary: 6000 },
    { ID: 6, Name: "Chaz Kshlerin", Age: 65, Salary: 7000 },
  ];

  beforeEach(() => {
    service = new BarChartVisualizationService();
  });

  it("should generate a chart buffer with correct age group counts", async () => {
    const mockCanvas = {
      getContext: jest.fn().mockReturnValue({}),
      toBuffer: jest.fn().mockReturnValue(Buffer.from("mockBuffer")),
    };

    (createCanvas as jest.Mock).mockReturnValue(mockCanvas);

    const buffer = await service.generateChart(mockData, 800, 600);

    expect(createCanvas).toHaveBeenCalledWith(800, 600);
    expect(mockCanvas.getContext).toHaveBeenCalledWith("2d");
    expect(mockCanvas.toBuffer).toHaveBeenCalledWith("image/png");
    expect(buffer).toEqual(Buffer.from("mockBuffer"));
  });

  it("should handle empty data array", async () => {
    const mockCanvas = {
      getContext: jest.fn().mockReturnValue({}),
      toBuffer: jest.fn().mockReturnValue(Buffer.from("mockBuffer")),
    };

    (createCanvas as jest.Mock).mockReturnValue(mockCanvas);

    const buffer = await service.generateChart([], 800, 600);

    expect(createCanvas).toHaveBeenCalledWith(800, 600);
    expect(mockCanvas.getContext).toHaveBeenCalledWith("2d");
    expect(mockCanvas.toBuffer).toHaveBeenCalledWith("image/png");
    expect(buffer).toEqual(Buffer.from("mockBuffer"));
  });
});
