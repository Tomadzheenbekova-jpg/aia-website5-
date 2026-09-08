import Image from "next/image";

type DetailGalleryProps = {
  images: string[];
  altPrefix: string;
};

// Ряд дополнительных фото (детали, ракурсы) под основным изображением
// категории на странице "Коллекции".
export default function DetailGallery({ images, altPrefix }: DetailGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      {images.map((src, i) => (
        <div key={src} className="relative aspect-square overflow-hidden bg-sand">
          <Image
            src={src}
            alt={`${altPrefix} — деталь ${i + 1}`}
            fill
            sizes="(min-width: 768px) 16vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
