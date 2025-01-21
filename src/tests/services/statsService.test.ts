import { StatsService } from "../../services/statsService";
import { mockedData } from "../utils/testUtils";

describe("StatsService", () => {
  let statsService: StatsService;

  beforeEach(() => {
    statsService = new StatsService();
  });

  it("should calculate statistics correctly", () => {
    const result = statsService.getStatistics(mockedData);

    expect(result.minAge).toBe(25);
    expect(result.averageAge).toBe(45);
    expect(result.maxAge).toBe(65);
    expect(result.minSalary).toBe(3000);
    expect(result.averageSalary).toBe(5000);
    expect(result.maxSalary).toBe(7000);
    expect(result.under30Count).toBe(1);
    expect(result.over60Count).toBe(1);
  });

  it("should handle empty data array", () => {
    const result = statsService.getStatistics([]);

    expect(result.minAge).toBe(Infinity);
    expect(result.averageAge).toBe(NaN);
    expect(result.maxAge).toBe(-Infinity);
    expect(result.minSalary).toBe(Infinity);
    expect(result.averageSalary).toBe(NaN);
    expect(result.maxSalary).toBe(-Infinity);
    expect(result.under30Count).toBe(0);
    expect(result.over60Count).toBe(0);
  });

  it("should handle data with one person", () => {
    const result = statsService.getStatistics(mockedData.slice(1, 2));

    expect(result.minAge).toBe(35);
    expect(result.averageAge).toBe(35);
    expect(result.maxAge).toBe(35);
    expect(result.minSalary).toBe(4000);
    expect(result.averageSalary).toBe(4000);
    expect(result.maxSalary).toBe(4000);
    expect(result.under30Count).toBe(0);
    expect(result.over60Count).toBe(0);
  });
});
