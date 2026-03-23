import { useQuery } from "@tanstack/react-query";
import ErrorScreen from "@/components/shared/error/ErrorScreen";
import LoadingScreen from "@/components/shared/loader/LoadingScreen";
import SharedCard from "@/features/apod/components/APODCard";
import APODDialogDateRange from "@/features/apod/components/APODDialogDateRange";
import APODGallery from "@/features/apod/components/APODGallery";
import APODMediaTypeChart from "@/features/apod/components/APODMediaTypeChart";
import APODResetContentButton from "@/features/apod/components/APODResetContentButton";
import APODTimelineChart from "@/features/apod/components/APODTimelineChart";
import { useAPOD } from "@/features/apod/hooks/useAPOD";
import Header from "@/components/shared/header/Header";

export default function APODDashboard() {
  const { handleFetchAPOD } = useAPOD();

  const { data, isLoading, error } = useQuery({
    queryKey: ["apod"],
    queryFn: handleFetchAPOD,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen />;

  return (
    <div className="container mx-auto px-2">
      <Header />
      <div className="text-right py-4 flex justify-end">
        <APODDialogDateRange />
        <APODResetContentButton />
      </div>
      <SharedCard apodEntries={data} />

      <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
        <APODMediaTypeChart apodEntries={data} />
        <APODTimelineChart apodEntries={data} />
      </div>

      <APODGallery apodEntries={data} />
    </div>
  );
}
