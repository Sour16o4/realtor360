function TabMessage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="pt-24 text-center">
      <h2 className="text-20 font-semibold">{title}</h2>
      <p className="mt-8 text-16 text-muted">{subtitle}</p>
    </div>
  );
}

/** Notes tab: title, subtitle and an "Add a Note..." box. */
export function NotesTab() {
  return (
    <>
      <TabMessage title="Notes" subtitle="Additional remarks and observations" />
      <input
        type="text"
        placeholder="Add a Note..."
        aria-label="Add a note"
        className="mt-34 mr-26 ml-37 h-68 w-[calc(100%-63px)] rounded-10 border border-subtle bg-white pl-43 font-nav text-18 font-medium outline-none placeholder:text-subtle"
      />
    </>
  );
}

/** Timeline, Activities and Attachments tabs have no content in the design. */
export function EmptyTab({ title }: { title: string }) {
  return <TabMessage title={title} subtitle="No items yet" />;
}
