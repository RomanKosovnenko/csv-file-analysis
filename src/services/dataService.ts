import { Person } from "./../models/personSchema";
import { CSVParser } from "./../utils/csvParser";

interface PersonDataService {
  getData(): Person[];
  updateData(): void;
}

const CSV_FILE_PATH = "./data/data.csv";

export class DataService implements PersonDataService {
  private static instance: DataService;
  private data: Person[] = [];
  private csvParser = new CSVParser(CSV_FILE_PATH);

  private constructor() {
    this.initialize();
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private async initialize() {
    try {
      this.data = await this.csvParser.parse();
      console.log("Data loaded successfully");
    } catch (err) {
      console.error(`Error during data loading. Error: ${err}`);
      this.data = [];
    }
  }

  getData(): Person[] {
    return this.data;
  }

  async updateData(): Promise<void> {
    await this.initialize();
  }
}
