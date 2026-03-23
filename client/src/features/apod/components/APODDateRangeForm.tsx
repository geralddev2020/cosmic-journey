import DatePickerRange from "@/components/shared/date/DatePickerRange";
import { Button } from "@/components/ui/button";
import useMutateDateRange from "@/features/apod/hooks/useMutateDateRange";

export default function APODDateRangeForm() {
  const { date, setDate, handleFormValidation, dateError, isLoading } = useMutateDateRange();

  return (
    <form className="flex flex-col pb-4 relative" onSubmit={handleFormValidation}>
      <DatePickerRange date={date} setDate={setDate} errors={dateError} />
      <Button disabled={isLoading} type="submit" className="w-full mt-4">
        Update
      </Button>
    </form>
  );
}
