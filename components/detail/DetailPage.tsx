type RelatedItem = { label: string; count?: number };

type DetailPageProps = {
  related: RelatedItem[];
  children: React.ReactNode;
};

/** Shell of every detail page: white "Related List" sidebar on the left, page content on the right. */
export default function DetailPage({ related, children }: DetailPageProps) {
  return (
    <div className="flex flex-col lg:min-h-[calc(100vh-65px)] lg:flex-row">
      <aside className="shrink-0 bg-white pt-22 pb-40 pl-80 lg:w-296">
        <h2 className="w-137 text-center text-24 font-semibold">Related List</h2>
        <ul className="mt-39 flex flex-col gap-39">
          {related.map(({ label, count }) => (
            <li key={label} className="flex items-center gap-9 text-18 leading-22 font-medium">
              {label}
              {count !== undefined && (
                <span className="flex size-19 items-center justify-center rounded-5 bg-[#f3e3af] text-14 font-normal">
                  {count}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-54 -ml-80 text-center text-16 font-medium text-[#0077b5]">Add Related List</p>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
