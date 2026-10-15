import { cn } from "@/lib/cn";

type CardProps = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

/** White dashboard card. Padding and size come from the caller, because they differ per card in the design. */
export default function Card({ title, className, children }: CardProps) {
  return (
    <section className={cn("rounded-20 bg-white shadow-card", className)}>
      {title && <h2 className="text-18 font-medium">{title}</h2>}
      {children}
    </section>
  );
}
