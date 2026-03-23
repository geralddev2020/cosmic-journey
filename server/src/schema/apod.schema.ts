import z from "zod";

import { APOD_ERROR_MESSAGES } from "../constants/errorMessages";

/**
 * @description Schema from the APOD API documentation: https://api.nasa.gov/#apod excluding the "thumbs" and "api_key" parameter.
 */

export const APODSchema = z.object({
  date: z.iso.date().optional(),
  start_date: z.iso.date().optional(),
  end_date: z.iso.date().optional(),
  count: z.coerce.number().min(1).max(100).optional(),
});

export type APODRequest = z.infer<typeof APODSchema>;

export const apodDateRequestSchema = APODSchema.required({
  date: true,
})
  .pick({ date: true })
  .superRefine((data, ctx) => {
    if (new Date(data.date) >= new Date()) {
      ctx.addIssue({
        code: "custom",
        message: APOD_ERROR_MESSAGES.FUTURE_DATE_ERROR,
        path: ["date"],
      });
    }
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

export const apodCountRequestSchema = APODSchema.required({
  count: true,
}).pick({ count: true });

export const apodRequestSchema = APODSchema.extend({}).superRefine((data, ctx) => {
  const hasDate = !!data.date;
  const hasStart = !!data.start_date;
  const hasEnd = !!data.end_date;
  const hasCount = typeof data.count === "number";

  if (!hasDate && !hasStart && !hasEnd && !hasCount) {
    ctx.addIssue({
      code: "custom",
      message: APOD_ERROR_MESSAGES.MISSING_QUERY_REQUEST_ERROR,
    });
  }

  if (hasCount && (hasDate || hasStart || hasEnd)) {
    ctx.addIssue({
      code: "custom",
      message: APOD_ERROR_MESSAGES.INVALID_QUERY_COMBINATION_ERROR,
      path: ["count"],
    });
  }

  if (hasDate && (data.start_date || data.end_date)) {
    ctx.addIssue({
      code: "custom",
      message: APOD_ERROR_MESSAGES.INVALID_QUERY_DATE_ERROR,
      path: ["date"],
    });
  }

  if ((hasStart && !hasEnd) || (!hasStart && hasEnd)) {
    ctx.addIssue({
      code: "custom",
      message: APOD_ERROR_MESSAGES.INVALID_QUERY_DATE_RANGE_ERROR,
      path: ["start_date", "end_date"],
    });
  }
});

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

export const apodArrayResponseSchema = z.array(apodResponseSchema);

export const apodSummarySchema = apodArrayResponseSchema.transform((data) => {
  const totalEntries = data.length;
  const totalImages = data.filter((e) => e.media_type === "image").length;
  const withCopyright = data.filter((e) => e.copyright).length;
  const averageWords = Math.round(
    data.reduce((acc, e) => acc + e.explanation.split(" ").length, 0) / data.length,
  );
  const imageCount = data.filter((entry) => entry.media_type === "image").length;
  const videoCount = data.filter((entry) => entry.media_type === "video").length;

  return {
    total_entries: totalEntries,
    total_images: totalImages,
    with_copyright: withCopyright,
    average_words: averageWords,
    image_count: imageCount,
    video_count: videoCount,
    entries: data,
  };
});
