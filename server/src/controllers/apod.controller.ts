import type { Request, Response } from "express";

import z from "zod";

import { APOD_ERROR_MESSAGES } from "../constants/errorMessages";
import { log } from "../lib/logger";
import {
  apodCountRequestSchema,
  apodDateRangeRequestSchema,
  APODRequest,
  apodRequestSchema,
  apodSummarySchema,
} from "../schema/apod.schema";
import { fetchAPOD } from "../services/apod.service";

export const getAPODEntries = async (request: Request, response: Response) => {
  const initialValidation = apodRequestSchema.safeParse(request.query);

  if (!initialValidation.success) {
    response.status(400).json({ error: z.flattenError(initialValidation.error) });
    return;
  }

  let schema: z.ZodSchema | null = null;
  if (initialValidation.data.start_date) {
    schema = apodDateRangeRequestSchema;
  }
  if (initialValidation.data.count) {
    schema = apodCountRequestSchema;
  }

  if (!schema) {
    response.status(400).json({ error: "Invalid query parameters" });
    return;
  }

  const validatedQuery = schema.safeParse(initialValidation.data);

  if (!validatedQuery.success) {
    const flattenError = z.flattenError(validatedQuery.error);
    response.status(400).json({ error: flattenError });
    return;
  }

  const results = await fetchAPOD(validatedQuery.data as APODRequest).catch((err) => {
    log("Error fetching data from NASA", err);
    response.status(400).json({ error: APOD_ERROR_MESSAGES.EXTERNAL_ERROR });
    return;
  });

  const tranformResults = apodSummarySchema.safeParse(results);

  if (!tranformResults.success) {
    const flattenError = z.flattenError(tranformResults.error);
    response.status(400).json({ error: flattenError });
    return;
  }
  response.status(200).json(tranformResults.data);
};
