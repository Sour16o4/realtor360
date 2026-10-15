import Image from "next/image";
import { cn } from "@/lib/cn";

type RecordNameProps = {
  name: string;
  /** Lines under the name, e.g. [["Email", "a@b.com"]]. */
  details?: Array<[label: string, value: React.ReactNode]>;
  image?: string;
  imageSize?: number;
  imageClassName?: string;
  className?: string;
};

/** First column of a list row: optional photo, bold name and "Label: value" lines. */
export default function RecordName({
  name,
  details = [],
  image,
  imageSize = 100,
  imageClassName = "rounded-10",
  className,
}: RecordNameProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {image && (
        <Image
          src={image}
          alt=""
          width={imageSize}
          height={imageSize}
          className={cn("shrink-0 object-cover", imageClassName)}
          style={{ width: imageSize, height: imageSize }}
        />
      )}
      <div className="min-w-0">
        <p className="text-16 font-semibold text-black">{name}</p>
        {details.map(([label, value]) => (
          <p key={label} className="mt-5 text-14 text-subtle">
            <span className="font-medium">{label}:</span> {value}
          </p>
        ))}
      </div>
    </div>
  );
}
