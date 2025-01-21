import { Person } from "../../models/personSchema";
import { StatsService } from "../../services/statsService";

describe("StatsService", () => {
  const data: Person[] = [
    { ID: 1, Name: "Lola Schmitt", Age: 25, Salary: 3000 },
    { ID: 2, Name: "Mina Johns", Age: 35, Salary: 4000 },
    { ID: 3, Name: "Elda Zemlak", Age: 45, Salary: 5000 },
    { ID: 4, Name: "Rocio Robel", Age: 55, Salary: 6000 },
    { ID: 6, Name: "Chaz Kshlerin", Age: 65, Salary: 7000 },
  ];

  let statsService: StatsService;

  beforeEach(() => {
    statsService = new StatsService();
  });

  it("should calculate statistics correctly", () => {
    const result = statsService.getStatistics(data);

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
    const result = statsService.getStatistics(data.slice(1, 2));

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
