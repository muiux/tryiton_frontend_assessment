import { KonvaImageType } from "@/types/components";
import { Image } from "react-konva";
import useImage from "use-image";

const KonvaImage = ({ src }: KonvaImageType) => {
  const [image] = useImage(src, "anonymous");
  return <Image image={image} alt="image" />;
};

export default KonvaImage;
