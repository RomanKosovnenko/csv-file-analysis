import { Request, Response } from "express";
import { getVisualization } from "../../controllers/visualizationController";
import { DataService } from "../../services/dataService";
import { BarChartVisualizationService } from "../../services/visualizationService";
import { mockedData } from "../utils/testUtils";

jest.mock("../../services/dataService");
jest.mock("../../services/visualizationService");

describe("getVisualization", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockDataServiceInstance: jest.Mocked<DataService>;
  let mockVisualizationServiceInstance: jest.Mocked<BarChartVisualizationService>;

  beforeEach(() => {
    req = {};
    res = {
      set: jest.fn(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockDataServiceInstance = {
      getData: jest.fn().mockReturnValue(mockedData),
    } as unknown as jest.Mocked<DataService>;

    (DataService.getInstance as jest.Mock).mockReturnValue(mockDataServiceInstance);

    mockVisualizationServiceInstance = {
      generateChart: jest.fn().mockResolvedValue(Buffer.from("mockBuffer")),
    } as unknown as jest.Mocked<BarChartVisualizationService>;

    (BarChartVisualizationService as jest.Mock).mockImplementation(() => mockVisualizationServiceInstance);
  });

  it("should send image buffer on successful data retrieval and chart generation", async () => {
    await getVisualization(req as Request, res as Response);

    expect(mockDataServiceInstance.getData).toHaveBeenCalled();
    expect(mockVisualizationServiceInstance.generateChart).toHaveBeenCalledWith(mockedData, 800, 600);
    expect(res.set).toHaveBeenCalledWith("Content-Type", "image/png");
    expect(res.send).toHaveBeenCalledWith(Buffer.from("mockBuffer"));
  });

  it("should handle known errors and respond with 500 status", async () => {
    const error = new Error("Test error");
    mockVisualizationServiceInstance.generateChart.mockRejectedValueOnce(error);

    await getVisualization(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Test error" });
  });

  it("should handle unknown errors and respond with 500 status", async () => {
    mockVisualizationServiceInstance.generateChart.mockRejectedValueOnce("Unknown error");

    await getVisualization(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "An unknown error occurred" });
  });
});
