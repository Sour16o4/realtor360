type DetailSectionProps = {
  /** Anchor id, so a link in the sidebar can jump to this section. */
  id?: string;
  title: string;
  subtitle: string;
  /** Moves the title block (px); the design does not place it exactly centered in every section. */
  titleShift?: { x?: number; y?: number };
  /** Width (px) of the title block where the design wraps the text earlier or later than usual. */
  titleWidth?: number;
  /** Top padding (px); the first section sits closer to the tabs. */
  paddingTop?: number;
  /** Bottom padding (px). */
  paddingBottom?: number;
  children: React.ReactNode;
};

/** One block of an overview: centered title and subtitle on the left, content on the right, divider below. */
export default function DetailSection({
  id,
  title,
  subtitle,
  titleShift = {},
  titleWidth = 261,
  paddingTop = 48,
  paddingBottom = 43,
  children,
}: DetailSectionProps) {
  return (
    <section id={id} className="mr-26 ml-37 flex scroll-mt-65 items-center border-b border-subtle/30" style={{ paddingTop, paddingBottom }}>
      <div className="w-308 shrink-0">
        <div className="mx-auto text-center" style={{ maxWidth: titleWidth, transform: `translate(${titleShift.x ?? 0}px, ${titleShift.y ?? 0}px)` }}>
          <h2 className="text-20 font-semibold">{title}</h2>
          <p className="mt-8 text-16 text-muted">{subtitle}</p>
        </div>
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}
