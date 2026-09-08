type PlaceholderImageProps = {
  label: string;
  className?: string;
  aspect?: string; // например "aspect-[3/4]" или "aspect-square"
};

// Пока реальных фотографий нет, на их месте показывается такой
// подписанный блок — чтобы не выдавать пустоту или сток за
// реальные материалы АЙА. Как только появится файл,
// этот компонент нужно заменить на <Image src=... />.
export default function PlaceholderImage({
  label,
  className = "",
  aspect = "aspect-[3/4]",
}: PlaceholderImageProps) {
  return (
    <div
      className={`${aspect} ${className} flex items-center justify-center border border-line bg-sand`}
      role="img"
      aria-label={label}
    >
      <span className="px-4 text-center font-sans text-xs uppercase tracking-wide text-graphite/50">
        [{label}]
      </span>
    </div>
  );
}
