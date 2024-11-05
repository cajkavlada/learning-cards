import { Palette } from "lucide-react";
import { Button } from "../button";
import Circle from "@uiw/react-color-circle";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export function ColorPicker({
  onChange,
}: {
  onChange: (color: string) => void;
}) {
  const colors = [
    "inherit", // Default
    "#000000", // Black
    "#ffffff", // White
    "#808080", // Grey
    "#f44336", // Red
    "#ff1744", // Neon Red
    "#e91e63", // Pink
    "#ff00ff", // Magenta
    "#d500f9", // Neon Purple
    "#9c27b0", // Purple
    "#673ab7", // Deep Purple
    "#3f51b5", // Indigo
    "#2196f3", // Blue
    "#03a9f4", // Light Blue
    "#00e5ff", // Sky Blue
    "#00bcd4", // Cyan
    "#00ffff", // Aqua
    "#1de9b6", // Turquoise
    "#009688", // Teal
    "#4caf50", // Green
    "#76ff03", // Neon Green
    "#8bc34a", // Light Green
    "#cddc39", // Lime
    "#ffff00", // Bright Yellow
    "#ffeb3b", // Yellow
    "#ffc107", // Amber
    "#ff9800", // Orange
    "#ff5722", // Deep Orange
    "#795548", // Brown
    "#607d8b", // Blue Grey
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="outline" type="button">
          <Palette size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[134px] rounded bg-white p-1.5">
        <Circle
          colors={colors}
          color=""
          onChange={(color) => onChange(color.hex)}
        />
      </PopoverContent>
    </Popover>
  );
}
