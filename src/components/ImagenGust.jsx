import Image from "next/image";
import { Box } from "@chakra-ui/react";
const ImageFade = ({ src }) => {

  return (
      <Box
        as={Image}
        h={"100%"}
        w={"100%"}
        rounded={"100%"}
        src={src}
        objectFit="cover"
        alt="Imagenes de sapitos durmiendo"
        priority={true}
        quality={50}
      />
  );
};

export default ImageFade;
