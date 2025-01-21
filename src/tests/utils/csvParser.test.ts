import fs from "fs";
import { console } from "inspector";
import path from "path";
import { PersonSchema } from "../../models/personSchema";
import { CSVParser } from "../../utils/csvParser";

describe("CSVParser", () => {
  const testFilePath = path.join(__dirname, "testData.csv");

  beforeAll(() => {
    const csvContent = `ID,Name,Age,Salary
    1,John Doe,25,50000
    2,Jane Smith,30,60000
    3,Invalid User,-5,40000
    4,Another User,40,invalid_salary`;

    fs.writeFileSync(testFilePath, csvContent);
  });

  afterAll(() => {
    fs.unlinkSync(testFilePath);
  });

  it("should parse valid rows correctly", async () => {
    const parser = new CSVParser(testFilePath);
    const result = await parser.parse();

    console.log(result);

    expect(result).toEqual([
      { ID: 1, Name: "John Doe", Age: 25, Salary: 50000 },
      { ID: 2, Name: "Jane Smith", Age: 30, Salary: 60000 },
    ]);
  });

  it("should skip rows with invalid data", async () => {
    const parser = new CSVParser(testFilePath);
    const result = await parser.parse();

    expect(result).not.toContainEqual(expect.objectContaining({ Name: "Invalid User" }));
    expect(result).not.toContainEqual(expect.objectContaining({ Name: "Another User" }));
  });

  it("should validate each row using the PersonSchema", async () => {
    const parser = new CSVParser(testFilePath);
    const result = await parser.parse();

    result.forEach((row) => {
      expect(() => PersonSchema.parse(row)).not.toThrow();
    });
  });

  it("should handle an empty CSV file gracefully", async () => {
    const emptyFilePath = path.join(__dirname, "empty.csv");
    fs.writeFileSync(emptyFilePath, "");

    const parser = new CSVParser(emptyFilePath);
    const result = await parser.parse();

    expect(result).toEqual([]);

    fs.unlinkSync(emptyFilePath);
  });

  it("should throw an error for a non-existent file", async () => {
    const nonExistentFilePath = path.join(__dirname, "nonexistent.csv");
    const parser = new CSVParser(nonExistentFilePath);

    await expect(parser.parse()).rejects.toThrow();
  });
});
