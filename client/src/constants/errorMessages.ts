export const APOD_ERROR_MESSAGES = {
  FUTURE_DATE_ERROR: "Date cannot be in the future",
  INVALID_DATE_RANGE_ERROR: "Start date cannot be after end date",
  MISSING_QUERY_REQUEST_ERROR:
    "Atleast one of date, start_date/end_date, or count must be provided",
  INVALID_QUERY_COMBINATION_ERROR: "Cannot combine date, date range, and count parameters",
  INVALID_QUERY_DATE_ERROR: "Cannot specify both date and date range",
  INVALID_QUERY_DATE_RANGE_ERROR: "Must specify both start_date and end_date",
  EXTERNAL_ERROR: "Something went wrong. Please try again.",
  INVALID_DATE: "Invalid date",
};
