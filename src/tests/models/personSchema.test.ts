import { PersonSchema } from "../../models/personSchema";

describe("PersonSchema", () => {
  it("validates correct data", () => {
    const validPerson = {
      ID: 1,
      Name: "John Doe",
      Age: 30,
      Salary: 50000,
    };

    expect(() => PersonSchema.parse(validPerson)).not.toThrow();
  });

  it("throws error for invalid data", () => {
    const invalidPerson = {
      ID: "abc",
      Name: "John Doe",
      Age: -1,
      Salary: 50000,
    };

    expect(() => PersonSchema.parse(invalidPerson)).toThrow();
  });
});
