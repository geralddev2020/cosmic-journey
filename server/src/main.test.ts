import { describe, expect, test } from "@jest/globals";
import supertest from "supertest";

import { ROUTES } from "./constants/routes";
import { serverInstance } from "./main";

describe("Main server instance", () => {
  test("should return ok", async () => {
    const response = await supertest(serverInstance).get(ROUTES.HEALTH);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});

describe("APOD endpoint", () => {
  test("should return 400 for missing query parameters", async () => {
    const response = await supertest(serverInstance).get("/apod");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 400 for future date", async () => {
    const response = await supertest(serverInstance).get("/apod?date=2026-06-01");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 400 for invalid date format", async () => {
    const response = await supertest(serverInstance).get("/apod?date=invalid-date");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 400 for date range with start after end", async () => {
    const response = await supertest(serverInstance).get(
      "/apod?start_date=2020-01-02&end_date=2020-01-01",
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 400 for date range with future end date", async () => {
    const response = await supertest(serverInstance).get(
      "/apod?start_date=2026-01-01&end_date=2027-01-01",
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 400 for date range missing end_date", async () => {
    const response = await supertest(serverInstance).get("/apod?start_date=2020-01-01");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 400 for date range missing start_date", async () => {
    const response = await supertest(serverInstance).get("/apod?end_date=2020-01-01");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 200 for valid date range", async () => {
    const response = await supertest(serverInstance).get(
      "/apod?start_date=2020-01-01&end_date=2020-01-02",
    );
    expect(response.status).toBe(200);
  });

  test("should return 400 for count out of range (too low)", async () => {
    const response = await supertest(serverInstance).get("/apod?count=0");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 400 for count out of range (too high)", async () => {
    const response = await supertest(serverInstance).get("/apod?count=101");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 200 for valid count", async () => {
    const response = await supertest(serverInstance).get("/apod?count=5");
    expect(response.status).toBe(200);
  });

  test("should return 400 for combining date and date range", async () => {
    const response = await supertest(serverInstance).get(
      "/apod?date=2020-01-01&start_date=2020-01-01&end_date=2020-01-02",
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 400 for combining count and date", async () => {
    const response = await supertest(serverInstance).get("/apod?count=5&date=2020-01-01");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("should return 400 for combining count and date range", async () => {
    const response = await supertest(serverInstance).get(
      "/apod?count=5&start_date=2020-01-01&end_date=2020-01-02",
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
