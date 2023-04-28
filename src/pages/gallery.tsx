import { useAppStore } from "@/store";
import Image from "next/image";
import PhotoCard from "@/components/photo-card";
import PhotoEditModal from "@/components/modal-edit";
import { Toaster } from "react-hot-toast";
import PhotoMsgModal from "@/components/modal-msg";

export default function Gallery() {
  const { photos } = useAppStore();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-5xl text-gradient1 font-extrabold">
          TryitOn Gallery
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
      <PhotoEditModal />
      <PhotoMsgModal />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
