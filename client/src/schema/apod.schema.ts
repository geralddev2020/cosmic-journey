import z from "zod";
import { initialRandomAPODEntries } from "@/constants/appConfig";
import { APOD_ERROR_MESSAGES } from "@/constants/errorMessages";

export const APODSchema = z.object({
  date: z.iso.date(APOD_ERROR_MESSAGES.INVALID_DATE).optional(),
  start_date: z.iso.date(`Start date: ${APOD_ERROR_MESSAGES.INVALID_DATE}`).optional(),
  end_date: z.iso.date(`End date: ${APOD_ERROR_MESSAGES.INVALID_DATE}`).optional(),
  count: z.coerce.number().min(1).max(100).optional(),
});

export const apodDateRangeRequestSchema = APODSchema.required({
  start_date: true,
  end_date: true,
})
  .pick({ start_date: true, end_date: true })
  .superRefine((data, ctx) => {
    if (new Date(data.start_date) > new Date(data.end_date)) {
      ctx.addIssue({
        code: "custom",
        message: APOD_ERROR_MESSAGES.INVALID_DATE_RANGE_ERROR,
        path: ["start_date"],
      });
    }

    if (new Date(data.end_date) >= new Date()) {
      ctx.addIssue({
        code: "custom",
        message: APOD_ERROR_MESSAGES.FUTURE_DATE_ERROR,
        path: ["end_date"],
      });
    }
  });

export const querySchema = z
  .object({
    start_date: z.iso.date(APOD_ERROR_MESSAGES.INVALID_DATE).optional(),
    end_date: z.iso.date(APOD_ERROR_MESSAGES.INVALID_DATE).optional(),
    count: z.coerce.number().min(1).max(30).optional(),
  })
  .refine((data) => {
    const hasStart = !!data.start_date;
    const hasEnd = !!data.end_date;
    return hasStart === hasEnd;
  }, APOD_ERROR_MESSAGES.INVALID_QUERY_DATE_RANGE_ERROR)
  .transform((data) => {
    const hasDates = data.start_date && data.end_date;

    if (hasDates) {
      return {
        start_date: data.start_date,
        end_date: data.end_date,
      };
    }

    return {
      count: data.count ?? initialRandomAPODEntries,
    };
  });

/**
 * Types
 */
export type DateRangeType = z.infer<typeof apodDateRangeRequestSchema>;
export type DateRangeError = z.core.$ZodFlattenedError<DateRangeType>;
export type QueryParams = z.infer<typeof querySchema>;
export type APODRequest = z.infer<typeof APODSchema>;

/**
 * API Response Schema
 */
export const apodResponseSchema = z.object({
  copyright: z.string().optional(),
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string().optional(),
  media_type: z.string(),
  service_version: z.string(),
  title: z.string(),
  url: z.string(),
});

export type APODResponse = z.infer<typeof apodResponseSchema>;
const apodArrayResponseSchema = z.array(apodResponseSchema);
export type APODArrayResponse = z.infer<typeof apodArrayResponseSchema>;

export const apodSummarySchema = z.object({
  total_entries: z.number().default(0),
  total_images: z.number().default(0),
  with_copyright: z.number().default(0),
  average_words: z.number().default(0),
  image_count: z.number().default(0),
  video_count: z.number().default(0),
  entries: z.array(apodResponseSchema),
});

export type APODSummaryResponse = z.infer<typeof apodSummarySchema>;
