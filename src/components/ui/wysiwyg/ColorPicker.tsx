import { Palette } from "lucide-react";
import { Button } from "../button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";
import Circle from "@uiw/react-color-circle";

export function ColorPicker({
  onChange,
}: {
  onChange: (color: string) => void;
}) {
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="outline">
          <Palette size={16} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="z-50 w-[134px] rounded bg-white p-1.5">
        <Circle
          colors={colors}
          color=""
          onChange={(color) => onChange(color.hex)}
        />
      </HoverCardContent>
    </HoverCard>
  );
}
