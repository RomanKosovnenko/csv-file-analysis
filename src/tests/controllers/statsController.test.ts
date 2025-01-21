import { Request, Response } from "express";
import { getStats } from "../../controllers/statsController";
import { Person } from "../../models/personSchema";
import { DataService } from "../../services/dataService";
import { StatsService } from "../../services/statsService";

jest.mock("../../services/dataService");
jest.mock("../../services/statsService");

describe("getStats", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  const data: Person[] = [
    { ID: 1, Name: "Lola Schmitt", Age: 25, Salary: 3000 },
    { ID: 2, Name: "Mina Johns", Age: 35, Salary: 4000 },
    { ID: 3, Name: "Elda Zemlak", Age: 45, Salary: 5000 },
    { ID: 4, Name: "Rocio Robel", Age: 55, Salary: 6000 },
    { ID: 6, Name: "Chaz Kshlerin", Age: 65, Salary: 7000 },
  ];

  const stats = {
    minAge: 25,
    averageAge: 45,
    maxAge: 65,
    minSalary: 3000,
    averageSalary: 5000,
    maxSalary: 7000,
    under30Count: 1,
    over60Count: 1,
  };

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
      getData: jest.fn().mockReturnValue(data),
    });
    (StatsService.prototype.getStatistics as jest.Mock).mockReturnValue(stats);

    await getStats(req as Request, res as Response);

    expect(DataService.getInstance().getData).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(stats);
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
