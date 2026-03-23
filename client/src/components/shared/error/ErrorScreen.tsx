import { AlertCircle } from "lucide-react";
import {
  TypographyH2,
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography/Typography";

export default function ErrorScreen() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="p-4 rounded-full bg-destructive/10">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <div className="text-center">
        <TypographyH2>Failed to load data</TypographyH2>

        <div className="py-4">
          <TypographyMuted>We're sorry, but we encountered an unexpected error.</TypographyMuted>
        </div>
        <TypographySmall>
          <a href="/">Go Home</a>
        </TypographySmall>
      </div>
    </div>
  );
}
