import { Rectangle, type RectangleProps } from "recharts";

export default function CustomRectangle({
  isVideo,
  ...props
}: {
  isVideo?: boolean;
} & RectangleProps) {
  return <Rectangle {...props} fill={isVideo ? "var(--chart-2)" : "var(--chart-1)"} />;
}
