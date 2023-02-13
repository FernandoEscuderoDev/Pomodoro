import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { useState} from "react";

function SliderMod({defaultValue, icon, bgColor, submitValue}) {

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Slider
      id="slider"
      defaultValue={defaultValue}
      min={1}
      max={100}
      onChange={(v)=>{submitValue(v)}}
      colorScheme={bgColor}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      size="lg"
    >
      <SliderTrack
        boxSize={4}
        borderRadius="10"
        bg={`${bgColor}.900`}
        boxShadow={"2xl"}
      >
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg={`${bgColor}.600`}
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${defaultValue} Minutos`}
        fontFamily='Roboto'
      >
        <SliderThumb bgColor={'white'} boxSize={7}>
          <Box color={`${bgColor}.400`} as={icon}></Box>
        </SliderThumb>
      </Tooltip>
    </Slider>
  );
}
export default SliderMod;
