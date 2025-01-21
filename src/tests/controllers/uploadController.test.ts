import { Request, Response } from "express";
import fs from "fs";
import { postData } from "../../controllers/uploadController";
import { DataService } from "../../services/dataService";

jest.mock("fs");
jest.mock("path");
jest.mock("../../services/dataService");

describe("postData", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  const error: Error = new Error("Test error");

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      json: jsonMock,
      status: statusMock,
    };
  });

  it("should return 400 if no file is uploaded", async () => {
    await postData(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "No file uploaded" });
  });

  it("should return 201 if file is uploaded successfully", async () => {
    const mockFile = { filename: "test.csv" };
    const mockReq = { file: mockFile };

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.renameSync as jest.Mock).mockImplementation();
    (DataService.getInstance as jest.Mock).mockReturnValue({
      updateData: jest.fn().mockImplementation(),
    });

    await postData(mockReq as Request, res as Response);

    expect(DataService.getInstance().updateData).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "File replaced successfully" });
  });

  it("should return 500 if there is an error during file upload", async () => {
    const mockFile = { filename: "test.csv" };
    const mockReq = { file: mockFile };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.renameSync as jest.Mock).mockImplementation(() => {
      throw new Error("Test error");
    });

    await postData(mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Failed to replace the file",
      details: expect.any(Error),
    });
  });
});
