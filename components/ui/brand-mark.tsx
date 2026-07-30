import Image from "next/image";

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Image
        src="/nocturne-mark.svg"
        alt=""
        width={32}
        height={32}
        draggable={false}
        unoptimized
      />
    </span>
  );
}
