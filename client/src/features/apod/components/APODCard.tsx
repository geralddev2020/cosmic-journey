import { ImageIcon, Calendar, FileText, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import type { APODSummaryResponse } from "@/schema/apod.schema";

export default function SharedCard({ apodEntries }: { apodEntries: APODSummaryResponse }) {
  const totalEntries = apodEntries.total_entries;
  const totalImages = apodEntries.total_images;
  const withCopyright = apodEntries.with_copyright;
  const avgWords = apodEntries.average_words;

  const stats = [
    {
      label: "Total Entries",
      value: totalEntries,
      icon: Calendar,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "Images",
      value: totalImages,
      icon: ImageIcon,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: "With Copyright",
      value: withCopyright,
      icon: Camera,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Avg. Words",
      value: avgWords,
      icon: FileText,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card className="gap-6 rounded-xl py-6" key={stat.label}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
