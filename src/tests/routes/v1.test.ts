import express from "express";
import request from "supertest";
import { getStats } from "../../controllers/statsController";
import { getVisualization } from "../../controllers/visualizationController";
import router from "../../routes/v1";

jest.mock("../../controllers/statsController", () => ({
  getStats: jest.fn((req, res) => res.status(200).send("Stats data")),
}));

jest.mock("../../controllers/visualizationController", () => ({
  getVisualization: jest.fn((req, res) => res.status(200).send("Visualization data")),
}));

jest.mock("../../controllers/uploadController", () => ({
  postData: jest.fn((req, res) => res.status(201).send("Uploaded data")),
}));

const app = express();
app.use("/api/v1", router);

describe("v1 routes", () => {
  it("should call getStats controller on /stats route", async () => {
    const response = await request(app).get("/api/v1/stats");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Stats data");
    expect(getStats).toHaveBeenCalled();
  });

  it("should call getVisualization controller on /visualization route", async () => {
    const response = await request(app).get("/api/v1/visualization");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Visualization data");
    expect(getVisualization).toHaveBeenCalled();
  });

  it("should call postData controller on /upload route", async () => {
    const response = await request(app).post("/api/v1/upload");
    expect(response.status).toBe(201);
    expect(response.text).toBe("Uploaded data");
    expect(getVisualization).toHaveBeenCalled();
  });
});
