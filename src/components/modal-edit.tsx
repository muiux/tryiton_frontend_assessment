import { useAppStore } from "@/store";
import Konva from "konva";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import KonvaImage from "./konva-image";
import { toast } from "react-hot-toast";

export default function PhotoEditModal() {
  const {
    isEditModalOpen,
    openEditModal,
    updatePhotoById,
    currentPhotoId,
    getPhotoById,
  } = useAppStore();

  const stageRef = useRef<Konva.Stage>(null);

  const [size, setSize] = useState(10);
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (event: any) => {
    isDrawing.current = true;
    const pos = event.target.getStage().getPointerPosition();
    setLines([...lines, { size, points: [pos.x, pos.y, pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleResetLines = () => {
    setLines([]);
  };

  const handleSave = () => {
    if (stageRef.current) {
      const dataUrl = stageRef.current.toDataURL();
      updatePhotoById(currentPhotoId, dataUrl);
      toast.success(`Photo #${currentPhotoId} has been updated.`);
    }
    openEditModal(false);
  };

  const handleChangeSize = (event: ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value));
  };

  useEffect(() => {
    if (isEditModalOpen) setLines([]);
  }, [isEditModalOpen]);

  return (
    <Transition.Root show={isEditModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => openEditModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => openEditModal(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-center justify-center">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center space-x-2 text-base font-semibold leading-6 text-gray-900"
                    >
                      <span>Photo Edit Tool</span>
                    </Dialog.Title>
                    <div className="mt-2 flex justify-center">
                      <Stage
                        width={800}
                        height={600}
                        ref={stageRef}
                        onMouseDown={handleMouseDown}
                        onMousemove={handleMouseMove}
                        onMouseup={handleMouseUp}
                      >
                        <Layer>
                          <KonvaImage src={getPhotoById(currentPhotoId)} />
                          {lines.map((line, i) => {
                            return (
                              <Line
                                key={i}
                                points={line.points}
                                stroke={"#AAAAAA"}
                                strokeWidth={line.size}
                                tension={0.5}
                                lineCap="round"
                                lineJoin="round"
                                globalCompositeOperation="destination-out"
                              />
                            );
                          })}
                        </Layer>
                      </Stage>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex justify-center">
                  <input
                    type="number"
                    name="size"
                    id="size"
                    className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChangeSize}
                    defaultValue={size}
                  />
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-20"
                    onClick={handleResetLines}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-20"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-20"
                    onClick={() => openEditModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
