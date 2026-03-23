import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import CustomRectangle from "@/components/shared/chart/CustomRectangle";
import SharedTooltip from "@/components/shared/tooltip/SharedTooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dayjs } from "@/lib/dayjs";

import type { APODSummaryResponse } from "@/schema/apod.schema";

const TIMELINE_CHART_TEXT = {
  TITLE: `Content Depth`,
  DESCRIPTION: `Words in explanation per entry`,
};

export default function APODTimelineChart({
  apodEntries,
}: {
  apodEntries: Pick<APODSummaryResponse, "entries">;
}) {
  const chartData = [...apodEntries.entries]
    .sort((a, b) => dayjs(a.date).get("ms") - dayjs(b.date).get("ms"))
    .map((entry) => ({
      date: dayjs(entry.date).format("MMM, D"),
      titleLength: entry.title.length,
      explanationWords: entry.explanation.split(" ").length,
      title: entry.title,
      isVideo: entry.media_type === "video",
    }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{TIMELINE_CHART_TEXT.TITLE}</CardTitle>
        <CardDescription>{TIMELINE_CHART_TEXT.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-50 min-w-0.5">
          <ResponsiveContainer
            initialDimension={{ width: 1, height: 1 }}
            width="100%"
            height="100%"
          >
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={50} />
              <SharedTooltip
                formatter={(value) => [`${value} words`, "Explanation"]}
                labelFormatter={(label) => {
                  const item = chartData.find((d) => d.date === label);
                  return item?.title || label;
                }}
              />
              <Bar dataKey="explanationWords" radius={[4, 4, 0, 0]} shape={<CustomRectangle />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
