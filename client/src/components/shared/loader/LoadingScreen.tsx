import { TypographyMuted } from "@/components/shared/typography/Typography";
import { Spinner } from "@/components/ui/spinner";

export default function LoadingScreen() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Spinner className="h-8 w-8" />
      <TypographyMuted>Fetching cosmic data...</TypographyMuted>
    </div>
  );
}
