import { Flex, Box, Button, useToast, HStack } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { SettingsContext } from "./SettingsContext";
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";
import SliderMod from "./Slider";
import ButtonColors from "./ButtonColors";

function Settings(props) {
  const toast = useToast();
  const settingsInfo = useContext(SettingsContext);

  const [valueSliderStudy, setValueSliderStudy] = useState(
    settingsInfo.studyMinutes
  );

  const [valueSliderBreak, setValueSliderBreak] = useState(
    settingsInfo.breakMinutes
  );

  return (
    <Flex
      direction={"column"}
      justifyContent="center"
      alignItems={"center"}
      as={"form"}
      h="100vh"
      gap={10}
    >
      <Flex
        as={"main"}
        direction={"column"}
        justifyContent="center"
        w={{ base: "80%", md: "50%" }}
        gap={5}
      >
        <Box as="label" textShadow={`2px 2px #000`} fontWeight={500}>
          Estudio: {valueSliderStudy}:00
        </Box>
        <SliderMod
          icon={BsFillBrightnessHighFill}
          bgColor={"red"}
          defaultValue={valueSliderStudy}
          submitValue={setValueSliderStudy}
        />
      </Flex>
      <Flex
        direction={"column"}
        justifyContent="center"
        w={{ base: "80%", md: "50%" }}
        gap={5}
      >
        <Box as="label" textShadow={`2px 2px #000`} fontWeight={500}>
          Descanso: {valueSliderBreak}:00
        </Box>
        <SliderMod
          icon={BsFillMoonFill}
          bgColor={"purple"}
          defaultValue={valueSliderBreak}
          submitValue={setValueSliderBreak}
        />
      </Flex>
      <Flex direction={"column"} gap={5} w={{ base: "80%", md: "50%" }}>
        <Box as="h3" textShadow={`2px 2px #000`} fontWeight={500}>
          Colores
        </Box>
        <HStack gap={2} w="100%">
          <ButtonColors e={settingsInfo} color={"purple"}></ButtonColors>
          <ButtonColors e={settingsInfo} color={"yellow"}></ButtonColors>
          <ButtonColors e={settingsInfo} color={"orange"}></ButtonColors>
          <ButtonColors e={settingsInfo} color={"teal"}></ButtonColors>
          <ButtonColors e={settingsInfo} color={"green"}></ButtonColors>
          <ButtonColors e={settingsInfo} color={"blue"}></ButtonColors>
          <ButtonColors e={settingsInfo} color={"cyan"}></ButtonColors>
          <ButtonColors e={settingsInfo} color={"pink"}></ButtonColors>
          <ButtonColors e={settingsInfo} color={"red"}></ButtonColors>
          <ButtonColors e={settingsInfo} color={"gray"}></ButtonColors>
        </HStack>
      </Flex>
      <Flex gap={5} textColor={"black"}>
        <Button
          colorScheme={"red"}
          textShadow={`2px 2px #000`}
          boxShadow={"dark-lg"}
          onClick={() => {
            props.showSetSettings((value) => !value);
          }}
        >
          Volver
        </Button>
        <Button
          colorScheme={"green"}
          textShadow={`2px 2px #000`}
          boxShadow={"dark-lg"}
          onClick={() => {
            toast({
              position: "top",
              title: "Cambios Realizados.",
              description: "Se ha completado el ultimo cambio.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            settingsInfo.setStudyMinutes(valueSliderStudy);
            settingsInfo.setBreakMinutes(valueSliderBreak);
            props.showSetSettings((value) => !value);
          }}
        >
          Guardar
        </Button>
      </Flex>
    </Flex>
  );
}
export default Settings;
