import { Box, chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { useState } from "react";
import Pomodoro from "@/components/Pomodoro.jsx";
import Settings from "@/components/Settings.jsx";
import { SettingsContext } from "../components/SettingsContext.js";
export default function PomodoroPage() {
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  const [showSettings, setShowSettings] = useState(false);
  const [studyMinutes, setStudyMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [colores, setColores] = useState("purple");

  return (
    <SettingsContext.Provider
      value={{
        colores,
        studyMinutes,
        breakMinutes,
        setStudyMinutes,
        setBreakMinutes,
        setColores,
      }}
    >
      <ChakraBox
        bgGradient={`linear-gradient(to-t, ${colores}.500, ${colores}.700, ${colores}.900)`}
        h="100vh"
        w="100%"
      >
        {showSettings ? (
          <ChakraBox
            zIndex={"50"}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 1] }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Settings showSetSettings={setShowSettings} />
          </ChakraBox>
        ) : (
          <ChakraBox
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 1] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Pomodoro showSetSettings={setShowSettings} />
          </ChakraBox>
        )}
      </ChakraBox>
    </SettingsContext.Provider>
  );
}
