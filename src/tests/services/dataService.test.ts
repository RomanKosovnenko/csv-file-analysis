import { Person } from "../../models/personSchema";
import { DataService } from "../../services/dataService";
import { CSVParser } from "../../utils/csvParser";
import { mockedData } from "../utils/testUtils";

jest.mock("../../utils/csvParser");

describe("DataService", () => {
  let dataService: DataService;
  let mockCSVParser: jest.Mocked<CSVParser>;

  beforeEach(() => {
    mockCSVParser = new CSVParser("data.csv") as jest.Mocked<CSVParser>;
    (CSVParser as jest.Mock).mockImplementation(() => mockCSVParser);
    dataService = DataService.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize data on creation", async () => {
    mockCSVParser.parse.mockResolvedValue(mockedData);

    await dataService["initialize"]();

    expect(mockCSVParser.parse).toHaveBeenCalled();
    expect(dataService.getData()).toEqual(mockedData);
  });

  it("should handle errors during data loading", async () => {
    mockCSVParser.parse.mockRejectedValue(new Error("Failed to parse CSV"));

    await dataService["initialize"]();

    expect(mockCSVParser.parse).toHaveBeenCalled();
    expect(dataService.getData()).toEqual([]);
  });

  it("should return data when getData is called", async () => {
    mockCSVParser.parse.mockResolvedValue(mockedData);

    await dataService["initialize"]();

    expect(dataService.getData()).toEqual(mockedData);
  });

  it("should update data when updateData is called", async () => {
    const updatedData: Person[] = [{ ID: 1, Name: "John Doe", Age: 25, Salary: 100000 }];
    mockCSVParser.parse.mockResolvedValueOnce(mockedData).mockResolvedValueOnce(updatedData);

    await dataService["initialize"]();
    expect(dataService.getData()).toEqual(mockedData);

    dataService.updateData();
    await new Promise(process.nextTick);

    expect(dataService.getData()).toEqual(updatedData);
  });
});
