import { cn } from "@/lib/cn";

type AxisTitleProps = {
  children: string;
  vertical?: boolean;
  className?: string;
};

export default function AxisTitle({ children, vertical = false, className }: AxisTitleProps) {
  return (
    <span
      className={cn(
        "text-14 font-medium whitespace-nowrap text-muted",
        // Vertical titles read bottom-to-top, like a y-axis label.
        vertical && "rotate-180 [writing-mode:vertical-rl]",
        className,
      )}
    >
      {children}
    </span>
  );
}
