import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";

type CategoryImageProps = {
  src: string | null;
  alt: string;
  placeholderLabel: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
};

// Показывает реальную фотографию категории, если она есть в lib/categories.ts,
// иначе — подписанный плейсхолдер. Как только для категории появится
// фото, просто укажите путь в поле image — компонент подключать не нужно.
export default function CategoryImage({
  src,
  alt,
  placeholderLabel,
  aspect = "aspect-[3/4]",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: CategoryImageProps) {
  if (!src) {
    return <PlaceholderImage label={placeholderLabel} aspect={aspect} />;
  }

  return (
    <div className={`relative ${aspect} overflow-hidden bg-sand`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
