import csv from "csv-parser";
import fs from "fs";
import { Person, PersonSchema } from "../models/personSchema";

interface DataParser {
  parse(): Promise<Person[]>;
}

export class CSVParser implements DataParser {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async parse(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      const results: Person[] = [];
      const stream = fs.createReadStream(this.filePath);
      stream.on("error", (err) => reject(err));
      stream
        .pipe(csv())
        .on("data", (data) => {
          try {
            const person = PersonSchema.parse({
              ID: parseInt(Object.values(data)[0] as string),
              Name: data.Name,
              Age: parseInt(data.Age),
              Salary: parseFloat(data.Salary),
            });
            results.push(person);
          } catch (error) {
            console.error(`Invalid row in csv file: ${JSON.stringify(data)}. Error: ${error}`);
          }
        })
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    });
  }
}
