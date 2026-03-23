import type { Request, Response } from "express";

import { afterEach, describe, expect, jest, test } from "@jest/globals";

import * as apodService from "../services/apod.service";
import { getAPODEntries } from "./apod.controller";

const mockRequest = (data?: Partial<Request>) => {
  return {
    body: {},
    params: {},
    query: {},
    ...data,
  } as Request;
};

export const mockResponse = (): Response => {
  const response = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn(() => response),
  } as unknown as Response;

  return response;
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("getAPODEntries endpoint", () => {
  test("should return 400 for missing query parameters", async () => {
    jest.spyOn(apodService, "fetchAPOD").mockResolvedValue({});

    const request = mockRequest({});
    const response = mockResponse();

    await getAPODEntries(request, response);

    expect(apodService.fetchAPOD).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(400);
  });

  test("should return 200 when you submitted a valid request", async () => {
    jest.spyOn(apodService, "fetchAPOD").mockResolvedValue([]);

    const request = mockRequest({
      query: {
        start_date: "2025-01-01",
        end_date: "2025-01-02",
      },
    });
    const response = mockResponse();

    await getAPODEntries(request, response);

    expect(apodService.fetchAPOD).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
  });
});
