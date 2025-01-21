import { Person } from "../../models/personSchema";
import { DataService } from "../../services/dataService";
import { CSVParser } from "../../utils/csvParser";

jest.mock("../../utils/csvParser");

describe("DataService", () => {
  let dataService: DataService;
  let mockCSVParser: jest.Mocked<CSVParser>;
  const mockData: Person[] = [{ ID: 1, Name: "John Doe", Age: 30, Salary: 50000 }];

  beforeEach(() => {
    mockCSVParser = new CSVParser("data.csv") as jest.Mocked<CSVParser>;
    (CSVParser as jest.Mock).mockImplementation(() => mockCSVParser);
    dataService = DataService.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize data on creation", async () => {
    mockCSVParser.parse.mockResolvedValue(mockData);

    await dataService["initialize"]();

    expect(mockCSVParser.parse).toHaveBeenCalled();
    expect(dataService.getData()).toEqual(mockData);
  });

  it("should handle errors during data loading", async () => {
    mockCSVParser.parse.mockRejectedValue(new Error("Failed to parse CSV"));

    await dataService["initialize"]();

    expect(mockCSVParser.parse).toHaveBeenCalled();
    expect(dataService.getData()).toEqual([]);
  });

  it("should return data when getData is called", async () => {
    mockCSVParser.parse.mockResolvedValue(mockData);

    await dataService["initialize"]();

    expect(dataService.getData()).toEqual(mockData);
  });

  it("should update data when updateData is called", async () => {
    const initialData: Person[] = [{ ID: 1, Name: "John Doe", Age: 30, Salary: 50000 }];
    const updatedData: Person[] = [{ ID: 1, Name: "John Doe", Age: 25, Salary: 100000 }];
    mockCSVParser.parse.mockResolvedValueOnce(initialData).mockResolvedValueOnce(updatedData);

    await dataService["initialize"]();
    expect(dataService.getData()).toEqual(initialData);

    dataService.updateData();
    await new Promise(process.nextTick);

    expect(dataService.getData()).toEqual(updatedData);
  });
});
