import { useMutation } from "@tanstack/react-query";
import { useState, type SyntheticEvent } from "react";
import { useSearchParams } from "react-router";
import z from "zod";
import { APOD_ERROR_MESSAGES } from "@/constants/errorMessages";
import { dayjs } from "@/lib/dayjs";
import { queryClient } from "@/providers/AppQueryClientProvider";
import {
  apodDateRangeRequestSchema,
  type DateRangeError,
  type DateRangeType,
} from "@/schema/apod.schema";
import { useUIStore } from "@/store/useUIStore";

import type { DateRange } from "react-day-picker";

export default function useMutateDateRange() {
  const currentSearchParams = new URLSearchParams(window.location.search);
  const startDateParam = currentSearchParams.get("start_date");
  const endDateParam = currentSearchParams.get("end_date");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(startDateParam ?? dayjs().subtract(7, "days").toDate()),
    to: new Date(endDateParam ?? dayjs().toDate()),
  });
  const [dateError, setDateError] = useState<DateRangeError>();
  const [_, setSearchParams] = useSearchParams();
  const isLoading = useUIStore((state) => state.isLoading);

  const dateRangeMutation = useMutation({
    mutationFn: handleAPODMutation,
    onSuccess: invalidateHandleFetchQuery,
  });

  const handleFormValidation = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date || !date.from || !date.to) {
      setDateError({
        formErrors: [""],
        fieldErrors: {
          start_date: [APOD_ERROR_MESSAGES.INVALID_QUERY_DATE_RANGE_ERROR],
        },
      });
      return;
    }

    const queryRequest = {
      start_date: dayjs(date.from).format("YYYY-MM-DD"),
      end_date: dayjs(date.to).format("YYYY-MM-DD"),
    };

    const validateRequest = apodDateRangeRequestSchema.safeParse(queryRequest);

    if (validateRequest.error) {
      const flattenError = z.flattenError(validateRequest.error);
      console.log("flattenError:", flattenError);
      setDateError(flattenError);
      return;
    }
    setDateError(undefined);
    dateRangeMutation.mutate(validateRequest.data);
  };

  async function handleAPODMutation(requestDateRange: DateRangeType) {
    setSearchParams({
      start_date: requestDateRange.start_date,
      end_date: requestDateRange.end_date,
    });
  }

  async function invalidateHandleFetchQuery() {
    await queryClient.invalidateQueries({ queryKey: ["apod"] });
  }

  return {
    date,
    setDate,
    handleFormValidation,
    dateError,
    isLoading,
  };
}
