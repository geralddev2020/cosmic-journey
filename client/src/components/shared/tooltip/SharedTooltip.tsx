import { Tooltip, type TooltipProps } from "recharts";

export default function SharedTooltip({ ...props }: TooltipProps) {
  return (
    <Tooltip
      contentStyle={{
        backgroundColor: "var(--popover)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        color: "var(--popover-foreground)",
        fontSize: "12px",
      }}
      {...props}
    />
  );
}
