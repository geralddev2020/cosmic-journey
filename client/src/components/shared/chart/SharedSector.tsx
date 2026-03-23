import { Sector, type PieSectorShapeProps } from "recharts";

export default function SharedSector({ ...props }: Partial<PieSectorShapeProps>) {
  return <Sector {...props} />;
}
