import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import SharedSector from "@/components/shared/chart/SharedSector";
import SharedTooltip from "@/components/shared/tooltip/SharedTooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import type { APODSummaryResponse } from "@/schema/apod.schema";

export default function APODMediaTypeChart({ apodEntries }: { apodEntries: APODSummaryResponse }) {
  const imageCount = apodEntries.image_count;
  const videoCount = apodEntries.video_count;

  const chartData = [
    { name: "Images", value: imageCount, fill: "var(--chart-1)" },
    { name: "Videos", value: videoCount, fill: "var(--chart-2)" },
  ].filter((item) => item.value > 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Media Types</CardTitle>
        <CardDescription>Distribution of content types</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-50">
          <ResponsiveContainer
            initialDimension={{ width: 1, height: 1 }}
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                shape={<SharedSector />}
              />
              <SharedTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="text-center">
            <p className="text-2xl font-bold">{imageCount}</p>
            <p className="text-xs text-muted-foreground">Images</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{videoCount}</p>
            <p className="text-xs text-muted-foreground">Videos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
