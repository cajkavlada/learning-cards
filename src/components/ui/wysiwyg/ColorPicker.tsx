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
    "#f44336", // Red
    "#e91e63", // Pink
    "#ff00ff", // Magenta
    "#9c27b0", // Purple
    "#673ab7", // Deep Purple
    "#3f51b5", // Indigo
    "#2196f3", // Blue
    "#03a9f4", // Light Blue
    "#00bcd4", // Cyan
    "#00ffff", // Aqua
    "#009688", // Teal
    "#4caf50", // Green
    "#8bc34a", // Light Green
    "#cddc39", // Lime
    "#ffeb3b", // Yellow
    "#ffff00", // Bright Yellow
    "#ffc107", // Amber
    "#ff9800", // Orange
    "#ff5722", // Deep Orange
    "#795548", // Brown
    "#607d8b", // Blue Grey
    "#808080", // Grey
    "#000000", // Black
    "#ffffff", // White
  ];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          className="h-8 w-8 p-0"
          variant="outline"
          type="button"
          tabIndex={-1}
        >
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
