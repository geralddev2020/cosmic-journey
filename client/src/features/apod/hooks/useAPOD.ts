import { toast } from "sonner";
import z from "zod";
import { apodSummarySchema, querySchema, type APODRequest } from "@/schema/apod.schema";
import { getApod } from "@/services/apod.service";
import { useUIStore } from "@/store/useUIStore";

export const useAPOD = () => {
  const setLoading = useUIStore((state) => state.setLoading);
  const setDialogOpen = useUIStore((state) => state.setDialogOpen);

  async function verifyQueryParams(): Promise<APODRequest | null> {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const queryObject = {
      start_date: currentSearchParams.get("start_date"),
      end_date: currentSearchParams.get("end_date"),
      count: currentSearchParams.get("count"),
    };

    const cleanQueryObject = Object.fromEntries(
      Object.entries(queryObject).filter(([_, value]) => value !== null),
    );

    const validateQueryObject = await querySchema.safeParseAsync(cleanQueryObject);

    if (validateQueryObject.error) {
      const flattenError = z.flattenError(validateQueryObject.error);
      const { count, start_date, end_date } = flattenError.fieldErrors;

      count?.map((error) => toast.error(`Error count: ${error}`));
      start_date?.map((error) => toast.error(`Error start date: ${error}`));
      end_date?.map((error) => toast.error(`Error end date: ${error}`));

      return null;
    }

    return validateQueryObject.data;
  }

  async function handleFetchAPOD() {
    const paramsCheck = await verifyQueryParams();
    setLoading(true);

    if (!paramsCheck) {
      return Promise.reject(new Error("Sorry, wrong parameters"));
    }

    const apodResults = await getApod(paramsCheck);

    const validateResults = apodSummarySchema.safeParse(apodResults);

    if (!validateResults.success) {
      const flattenError = z.flattenError(validateResults.error);
      console.log("flattenError:", flattenError);
      return Promise.reject(new Error("Something went wrong"));
    }
    setLoading(false);
    setDialogOpen(false);

    return validateResults.data;
  }

  return {
    handleFetchAPOD,
  };
};
