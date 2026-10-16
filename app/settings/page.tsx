import Image from "next/image";
import { settingsCards } from "@/data/settings";

// The design's cards have no links, so they are plain cards.
export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-1440 px-16 pt-28 pb-30 lg:pr-25 lg:pl-26">
      <h1 className="text-28 font-medium">Settings</h1>
      <div className="mt-27 grid grid-cols-1 gap-30 sm:grid-cols-2 lg:grid-cols-3">
        {settingsCards.map((card) => (
          <section
            key={card.title}
            className="flex flex-col gap-25 rounded-20 bg-white px-32 py-30 shadow-[4px_4px_4px_0_rgb(0_0_0/0.15)]"
            style={card.padding ? { paddingInline: card.padding } : undefined}
          >
            <div
              className="flex items-center justify-center rounded-10"
              style={{ backgroundColor: card.iconBg, width: card.boxSize ?? 52, height: card.boxSize ?? 52 }}
            >
              <Image src={`/icons/${card.icon}.svg`} alt="" width={card.iconSize} height={card.iconSize} />
            </div>
            <div className="flex max-w-full flex-col gap-5" style={{ width: card.textWidth }}>
              <h2 className="text-24 font-medium">{card.title}</h2>
              <p className="text-16 leading-19 text-muted">{card.description}</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
