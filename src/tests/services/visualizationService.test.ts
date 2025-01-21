import { createCanvas } from "canvas";
import { BarChartVisualizationService } from "../../services/visualizationService";
import { mockedData } from "../utils/testUtils";

jest.mock("canvas", () => ({
  createCanvas: jest.fn(),
}));

describe("BarChartVisualizationService", () => {
  let service: BarChartVisualizationService;

  beforeEach(() => {
    service = new BarChartVisualizationService();
  });

  it("should generate a chart buffer with correct age group counts", async () => {
    const mockCanvas = {
      getContext: jest.fn().mockReturnValue({}),
      toBuffer: jest.fn().mockReturnValue(Buffer.from("mockBuffer")),
    };

    (createCanvas as jest.Mock).mockReturnValue(mockCanvas);

    const buffer = await service.generateChart(mockedData, 800, 600);

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
