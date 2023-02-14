import {
  Box,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  shouldForwardProp,
  chakra,
  IconButton,
  Text
} from "@chakra-ui/react";
import profilePic from "../assets/pomodoro3.jpg";
import profilePic2 from "../assets/pomodoro2.jpg";
import ButtonPlay from "./ButtonPlay";
import ButtonPause from "./ButtonPause";
import ButtonSettings from "./ButtonSettings";
import { useState, useEffect, useContext, useRef } from "react";
import { motion, isValidMotionProp } from "framer-motion";
import ImageFade from "./ImagenesSapitos";
import { SettingsContext } from "./SettingsContext.js";
import ReactHowler from "react-howler";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill, BsFillHeartFill } from "react-icons/bs";

function Pomodoro(props) {
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [tac, setTac] = useState(false);
  const [sonido, setSonido] = useState(true);
  const [isPlayed, setIsPlayed] = useState(false);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  let coloresBtn = settingsInfo.colores;

  function tick() {
    secondsLeftRef.current;
    setSecondsLeft(secondsLeftRef.current--);
    setTac(!tac);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === true ? false : true;
      const nextSeconds =
        (nextMode === true
          ? settingsInfo.studyMinutes
          : settingsInfo.breakMinutes) * 60;
      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.studyMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        window.navigator.vibrate([500, 100, 500, 100]);
        setIsPlayed(!isPlayed);
        return switchMode();
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === true
      ? settingsInfo.studyMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <Flex
      as="article"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      h="100vh"
      gap={2}
      fontWeight={500}
    >
      <CircularProgress
        boxShadow={"dark-lg"}
        rounded={"100%"}
        value={percentage}
        color={mode ? "red.600" : "green.600"}
        thickness="8px"
        size={{ base: "300px", lg: "350px" }}
        zIndex={20}
      >
        <CircularProgressLabel height="80%" width={"80%"}>
          <ReactHowler
            src="/sonidoSegundos.mp3"
            playing={tac}
            preload={true}
            volume={0.4}
          />
          <ReactHowler
            src="/grito.mp3"
            playing={isPlayed ? true : false}
            preload={true}
            onEnd={() => {
              setIsPlayed(false);
            }}
            loop={false}
            volume={0.8}
          />
          <ImageFade src={mode ? profilePic : profilePic2} />
        </CircularProgressLabel>
      </CircularProgress>
      <Box textShadow={`2px 2px #000`} fontSize={"25"}>
        {minutes + ":" + seconds}
      </Box>
      <Flex gap={"20px"}>
        <ChakraBox zIndex={10} whileTap={{ scale: 0.95 }}>
          {isPaused ? (
            <ButtonPlay
              boxShadow={"2xl"}
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          ) : (
            <ButtonPause
              boxShadow={"2xl"}
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
        </ChakraBox>
      </Flex>
      <Flex gap={"2"}>
        <ButtonSettings
          colorScheme={coloresBtn === "gray" ? "purple" : coloresBtn}
          boxShadow={"dark-lg"}
          onClick={() => {
            props.showSetSettings((value) => !value);
          }}
        />
        <IconButton
          fontSize={"25"}
          colorScheme={coloresBtn === "gray" ? "purple" : coloresBtn}
          boxShadow={"dark-lg"}
          icon={sonido ? <BsFillVolumeUpFill /> : <BsFillVolumeMuteFill />}
          onClick={() => {
            setSonido(!sonido);
            window.Howler.mute(sonido);
          }}
        ></IconButton>
      </Flex>
      <Text mt={6} gap='1' fontFamily="Roboto" fontSize='xl' display={'flex'} alignItems='center' opacity={0.6}>Desarrollado con <Box as={BsFillHeartFill} display="inline" color="red.700"/> por FernDev</Text>
    </Flex>
  );
}

export default Pomodoro;
