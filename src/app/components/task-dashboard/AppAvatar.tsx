import { cn } from "../ui/utils";

export function AppAvatar({ initials, size = "md", className }: { initials: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-12 w-12 text-sm" };
  return <span className={cn("inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-tertiary font-semibold text-brand-primary", sizes[size], className)}>{initials}</span>;
}
