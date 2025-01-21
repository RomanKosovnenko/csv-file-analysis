import { Person } from "../../models/personSchema";

export const mockedData: Person[] = [
  { ID: 1, Name: "Lola Schmitt", Age: 25, Salary: 3000 },
  { ID: 2, Name: "Mina Johns", Age: 35, Salary: 4000 },
  { ID: 3, Name: "Elda Zemlak", Age: 45, Salary: 5000 },
  { ID: 4, Name: "Rocio Robel", Age: 55, Salary: 6000 },
  { ID: 6, Name: "Chaz Kshlerin", Age: 65, Salary: 7000 },
];

export const mockedStats = {
  minAge: 25,
  averageAge: 45,
  maxAge: 65,
  minSalary: 3000,
  averageSalary: 5000,
  maxSalary: 7000,
  under30Count: 1,
  over60Count: 1,
};
