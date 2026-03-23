import { useSearchParams } from "react-router";
import { queryClient } from "@/providers/AppQueryClientProvider";
import { useUIStore } from "@/store/useUIStore";

export const useResetContent = () => {
  const [, setSearchParams] = useSearchParams();
  const isLoading = useUIStore((state) => state.isLoading);

  async function handleResetFilter() {
    setSearchParams({});
    await queryClient.invalidateQueries({ queryKey: ["apod"] });
  }

  return { isLoading, handleResetFilter };
};
