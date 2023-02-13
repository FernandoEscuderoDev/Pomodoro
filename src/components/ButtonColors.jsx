import { Button, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
export default function ButtonColors({ color, e }) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <Tooltip
      hasArrow
      bg={`${color}.600`}
      color="white"
      placement="top"
      isOpen={showTooltip}
      label={color}
      fontFamily="Roboto"
      textTransform={"capitalize"}
    >
      <Button
        boxShadow={"2xl"}
        colorScheme={color}
        onClick={() => {
          e.setColores(color);
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      ></Button>
    </Tooltip>
  );
}
