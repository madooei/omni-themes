import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b bg-background/40 backdrop-blur px-4">
      <div className="flex items-center justify-between py-4">
        <p className="font-bold">Omni Theme Enabled</p>
        <ThemeToggle />
      </div>
    </header>
  );
}
