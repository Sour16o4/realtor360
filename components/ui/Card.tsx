import Image from "next/image";
import { cn } from "@/lib/cn";

type CardProps = {
  title?: string;
  /** Shows the ⋮ button at the top right (the Dashboards cards have it). */
  menu?: boolean;
  /** Distance (px) of the ⋮ button from the top. */
  menuTop?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/** White dashboard card. Padding and size come from the caller, because they differ per card in the design. */
export default function Card({ title, menu = false, menuTop = 13, className, style, children }: CardProps) {
  return (
    <section className={cn("rounded-20 bg-white shadow-card", menu && "relative", className)} style={style}>
      {title && <h2 className="text-18 font-medium">{title}</h2>}
      {menu && <Image src="/icons/more-vertical.svg" alt="" width={30} height={30} className="absolute right-16" style={{ top: menuTop }} />}
      {children}
    </section>
  );
}
