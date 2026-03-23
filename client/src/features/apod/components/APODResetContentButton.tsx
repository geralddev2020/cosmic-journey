import { Button } from "@/components/ui/button";
import { RefreshCCWIcon } from "@/components/ui/refresh-ccw";
import { useResetContent } from "@/features/apod/hooks/useResetContent";

export default function APODResetContentButton() {
  const { handleResetFilter, isLoading } = useResetContent();

  return (
    <Button
      onClick={handleResetFilter}
      disabled={isLoading}
      variant="ghost"
      className="cursor-pointer"
    >
      <RefreshCCWIcon /> Random
    </Button>
  );
}
