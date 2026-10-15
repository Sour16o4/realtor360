import Avatar from "./Avatar";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: string[];
  /** Number shown in the grey "+N" bubble after the photos. */
  extra?: number;
  size: number;
  /** Small stacks (20px) use a 1px ring, larger ones a 2px ring. */
  small?: boolean;
};

export default function AvatarStack({ avatars, extra, size, small = false }: AvatarStackProps) {
  const ring = small ? "border border-white" : "border-2 border-white";

  return (
    <div className="flex items-center">
      {avatars.map((src, index) => (
        <Avatar key={index} src={src} alt="" size={size} className={cn(ring, index > 0 && "-ml-10")} />
      ))}
      {extra !== undefined && (
        <span
          className={cn(
            "-ml-10 flex shrink-0 items-center justify-center rounded-full bg-placeholder font-medium",
            ring,
            small ? "text-8" : "text-10",
          )}
          style={{ width: size, height: size }}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
