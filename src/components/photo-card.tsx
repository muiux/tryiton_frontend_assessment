import { useAppStore } from "@/store";
import { PhotoCardType } from "@/types/components";
import Image from "next/image";

export default function PhotoCard({ photo }: PhotoCardType) {
  const { openEditModal, openMsgModal, setCurrentPhotoId, getMsgById } = useAppStore();

  const handleEditModalOpen = () => {
    setCurrentPhotoId(photo.id);
    openEditModal(true);
  };

  const handleMsgModalOpen = () => {
    setCurrentPhotoId(photo.id);
    openMsgModal(true);
  };

  return (
    <div className="border-[1px] rounded-lg border-pink-700">
      <div className="relative">
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <Image
            fill
            src={photo.url}
            alt={photo.url}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-x-0 top-0 flex h-96 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-pink-600 opacity-60"
          />
          <div className="flex space-x-2 w-full space-between z-10">
            <button
              type="button"
              className="btn-action"
              onClick={handleEditModalOpen}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn-action"
              onClick={handleMsgModalOpen}
            >
              {getMsgById(photo.id).length > 0 ? 'Requested' : 'Request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
