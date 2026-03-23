import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { dayjs } from "@/lib/dayjs";

import type { DateRangeError } from "@/schema/apod.schema";
import type { Dispatch, SetStateAction } from "react";
import type { DateRange } from "react-day-picker";

export default function DatePickerRange({
  date,
  setDate,
  errors,
}: {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  errors: DateRangeError | undefined;
}) {
  return (
    <Field data-invalid={errors ? true : false}>
      <FieldLabel htmlFor="date-picker-range">Explore From... To...</FieldLabel>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format("LL")} - {dayjs(date.to).format("LL")}
                </>
              ) : (
                dayjs(date.from).format("LL")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      {errors ? (
        <>
          <FieldError>{errors?.fieldErrors.start_date?.[0]}</FieldError>
          <FieldError>{errors?.fieldErrors.end_date?.[0]}</FieldError>
        </>
      ) : (
        <></>
      )}
    </Field>
  );
}
