import Image from "next/image";
import { Hotel } from "@/types/product";

interface HotelGalleryProps {
  hotel: Hotel;
  activePhoto: string;
  onSelectPhoto: (photo: string) => void;
}

export function HotelGallery({
  hotel,
  activePhoto,
  onSelectPhoto,
}: HotelGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-6">
      <div className="relative md:col-span-8 h-80 md:h-[420px] rounded-2xl overflow-hidden ">
        <Image
          src={activePhoto}
          alt={hotel.name}
          fill
          priority
          unoptimized={activePhoto?.startsWith("data:")}
          className="object-cover"
        />
      </div>
      <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3">
        {hotel.gallery.slice(0, 3).map((img, idx) => (
          <div
            key={idx}
            onClick={() => onSelectPhoto(img)}
            className={`relative h-24 md:h-[132px] rounded-xl overflow-hidden cursor-pointer transition border-2 ${
              activePhoto === img
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`Foto ${idx + 1}`}
              fill
              unoptimized={img?.startsWith("data:")}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
