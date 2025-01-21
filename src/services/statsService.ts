import { Person } from "../models/personSchema";

interface StatisticsService {
  getStatistics(data: Person[]): {
    minAge: number;
    averageAge: number;
    maxAge: number;
    minSalary: number;
    averageSalary: number;
    maxSalary: number;
    under30Count: number;
    over60Count: number;
  };
}

export class StatsService implements StatisticsService {
  getStatistics(data: Person[]) {
    const ages = data.map((person) => person.Age);
    const salaries = data.map((person) => person.Salary);
    const totalAge = ages.reduce((sum, age) => sum + age, 0);
    const totalSalary = salaries.reduce((sum, salary) => sum + salary, 0);
    const under30Count = ages.filter((age) => age < 30).length;
    const over60Count = ages.filter((age) => age >= 60).length;

    return {
      minAge: Math.min(...ages),
      averageAge: totalAge / data.length,
      maxAge: Math.max(...ages),
      minSalary: Math.min(...salaries),
      averageSalary: totalSalary / data.length,
      maxSalary: Math.max(...salaries),
      under30Count,
      over60Count,
    };
  }
}
