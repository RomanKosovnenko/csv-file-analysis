import { Request, Response } from "express";
import { getStats } from "../../controllers/statsController";
import { DataService } from "../../services/dataService";
import { StatsService } from "../../services/statsService";
import { mockedData, mockedStats } from "./../utils/testUtils";

jest.mock("../../services/dataService");
jest.mock("../../services/statsService");

describe("getStats", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  const error: Error = new Error("Test error");

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      json: jsonMock,
      status: statusMock,
    };
  });

  it("should return stats data successfully", async () => {
    (DataService.getInstance as jest.Mock).mockReturnValue({
      getData: jest.fn().mockReturnValue(mockedData),
    });
    (StatsService.prototype.getStatistics as jest.Mock).mockReturnValue(mockedStats);

    await getStats(req as Request, res as Response);

    expect(DataService.getInstance().getData).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockedStats);
  });

  it("should handle errors and return 500 status", async () => {
    (StatsService.prototype.getStatistics as jest.Mock).mockImplementation(() => {
      throw error;
    });

    await getStats(req as Request, res as Response);

    expect(DataService.getInstance().getData).toHaveBeenCalled();
    expect(StatsService.prototype.getStatistics).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
