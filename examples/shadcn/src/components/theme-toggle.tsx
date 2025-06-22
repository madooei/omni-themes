import { Computer, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { TooltipButton } from "@/components/tooltip-button";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // Determine which theme is active
  const isLightTheme = theme === "light";
  const isDarkTheme = theme === "dark";
  const isSystemTheme = theme === "system";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TooltipButton
          variant="ghost"
          size="icon"
          className="relative w-7 h-7 flex-shrink-0"
          tooltipContent="Toggle theme"
        >
          <Sun
            className={cn("transition-all duration-150 ease-in-out absolute", {
              "rotate-0 scale-100": isLightTheme,
              "rotate-90 scale-0": !isLightTheme,
            })}
          />
          <Moon
            className={cn("transition-all duration-150 ease-in-out absolute", {
              "rotate-0 scale-100": isDarkTheme,
              "rotate-90 scale-0": !isDarkTheme,
            })}
          />
          <Computer
            className={cn("transition-all duration-150 ease-in-out absolute", {
              "rotate-0 scale-100": isSystemTheme,
              "rotate-90 scale-0": !isSystemTheme,
            })}
          />
          <span className="sr-only">Toggle theme</span>
        </TooltipButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
