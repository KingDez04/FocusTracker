import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

type TimerMode = "focus" | "shortBreak" | "longBreak";

interface RouteParams {
  focusDuration?: number;
  shortBreak?: number;
  longBreak?: number;
  longBreakInterval?: number;
}

type RootStackParamList = {
  Timer: undefined;
  focusInput: undefined;
};

type TimerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Timer"
>;

export default function Timer() {
  const route = useRoute();
  const {
    focusDuration = 25,
    shortBreak = 5,
    longBreak = 15,
    longBreakInterval = 2,
  } = (route.params as RouteParams) || {};
  const navigation = useNavigation<TimerScreenNavigationProp>();

  const [currentMode, setCurrentMode] = useState<TimerMode>("focus");
  const [totalSeconds, setTotalSeconds] = useState<number>(focusDuration * 60);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    focusDuration * 60
  );
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  const intervalRef = useRef<number | null>(null);

  const getCurrentModeDuration = (mode: TimerMode): number => {
    switch (mode) {
      case "focus":
        return focusDuration * 60;
      case "shortBreak":
        return shortBreak * 60;
      case "longBreak":
        return longBreak * 60;
      default:
        return focusDuration * 60;
    }
  };

  const getCurrentModeText = (mode: TimerMode): string => {
    switch (mode) {
      case "focus":
        return "Focus session";
      case "shortBreak":
        return "Short break";
      case "longBreak":
        return "Long break";
      default:
        return "Focus session";
    }
  };

  const getCurrentModeDescription = (mode: TimerMode): string => {
    switch (mode) {
      case "focus":
        return "Stay focused on what matters most";
      case "shortBreak":
        return "Time for a quick refresh";
      case "longBreak":
        return "Time for a longer break";
      default:
        return "Stay focused on what matters most";
    }
  };

  const getCurrentModeTitle = (mode: TimerMode): string => {
    switch (mode) {
      case "focus":
        return "Focus Tracker";
      case "shortBreak":
        return "Short Break";
      case "longBreak":
        return "Long Break";
      default:
        return "Focus Tracker";
    }
  };

  const switchToNextMode = () => {
    if (currentMode === "focus") {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);

      if (newCompletedSessions % longBreakInterval === 0) {
        setCurrentMode("longBreak");
        const newDuration = getCurrentModeDuration("longBreak");
        setTotalSeconds(newDuration);
        setRemainingSeconds(newDuration);
      } else {
        setCurrentMode("shortBreak");
        const newDuration = getCurrentModeDuration("shortBreak");
        setTotalSeconds(newDuration);
        setRemainingSeconds(newDuration);
      }
    } else {
      setCurrentMode("focus");
      const newDuration = getCurrentModeDuration("focus");
      setTotalSeconds(newDuration);
      setRemainingSeconds(newDuration);
    }

    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
          intervalRef.current = null;

          setTimeout(() => {
            switchToNextMode();
          }, 1000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, currentMode, completedSessions]);

  const progressPercent = useMemo(() => {
    const elapsed = totalSeconds - remainingSeconds;
    if (totalSeconds === 0) {
      return 0;
    }
    return Math.min(100, Math.max(0, (elapsed / totalSeconds) * 100));
  }, [totalSeconds, remainingSeconds]);

  const minutes = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(remainingSeconds % 60)
    .toString()
    .padStart(2, "0");

  const sessionDisplay =
    currentMode === "focus"
      ? `Session ${completedSessions + 1}`
      : `Break after session ${completedSessions}`;

  const handlePause = () => setIsRunning(false);
  const handleResume = () => setIsRunning(true);

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  const handleCancel = () => {
    setIsRunning(false);
    setCurrentMode("focus");
    setCompletedSessions(0);
    const newDuration = getCurrentModeDuration("focus");
    setTotalSeconds(newDuration);
    setRemainingSeconds(newDuration);
    navigation.navigate("focusInput");
  };

  const handleSkip = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    switchToNextMode();
  };

  return (
    <SafeAreaView>
      <View className="flex h-screen justify-center bg-white px-6">
        <Text className="text-[32px] font-extrabold text-[#007BFF] leading-[100%] text-center">
          {getCurrentModeTitle(currentMode)}
        </Text>

        <Text className="text-[15px] font-semibold text-[#6A9BCC] leading-[100%] text-center mt-8">
          {getCurrentModeDescription(currentMode)}
        </Text>

        <View className="mt-2 items-center">
          <Text className="text-[19px] text-[#6A9BCC] font-bold mb-2">
            {getCurrentModeText(currentMode)}
          </Text>

          {currentMode === "focus" && (
            <Text className="text-[15px] text-[#6A9BCC] font-semibold mb-4">
              {sessionDisplay}
            </Text>
          )}

          <View className="flex items-start w-full max-w-[320px]">
            <Text className="text-[#6A9BCC] text-[15px] font-semibold mb-2">
              {currentMode === "focus" ? "Focusing" : "Break time"}
            </Text>
          </View>

          <View className="w-full max-w-[320px] h-[10px] bg-[#E3EBF4] rounded-full overflow-hidden">
            <View
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-[#007BFF]"
            />
          </View>

          <View className="mt-8 flex-row items-center justify-center">
            <View className="px-4 py-3 rounded-[10px] bg-[#E3EBF4] mr-3 min-w-[90px] items-center">
              <Text className="text-[22px] font-bold">{minutes}</Text>
              <Text className="text-[#6A9BCC] font-semibold">Minutes</Text>
            </View>
            <Text className="text-[22px] font-bold mx-1">:</Text>
            <View className="px-4 py-3 rounded-[10px] bg-[#E3EBF4] ml-3 min-w-[90px] items-center">
              <Text className="text-[22px] font-bold">{seconds}</Text>
              <Text className="text-[#6A9BCC] font-semibold">Seconds</Text>
            </View>
          </View>

          <View className="mt-8 flex-row items-center justify-center space-x-3">
            {isRunning ? (
              <TouchableOpacity
                className="bg-[#007BFF] rounded-[12.8px] w-[95px] h-[46px] justify-center items-center"
                onPress={handlePause}
              >
                <View className="flex-row items-center">
                  <Ionicons name="pause-circle" size={18} color="#ffffff" />
                  <Text className="ml-2 text-white font-bold">Pause</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-[#007BFF] rounded-[12.8px] w-[95px] h-[46px] justify-center items-center"
                onPress={handleResume}
              >
                <View className="flex-row items-center">
                  <Ionicons name="play" size={18} color="#ffffff" />
                  <Text className="ml-2 text-white font-bold">Resume</Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className="bg-[#E3EBF4] rounded-[12.8px] w-[95px] h-[46px] justify-center items-center"
              onPress={handleReset}
            >
              <View className="flex-row items-center">
                <Ionicons name="stop" size={18} color="#6A9BCC" />
                <Text className="ml-2 text-[#6A9BCC] font-semibold">Reset</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-6 flex-row items-center justify-center space-x-3">
            <TouchableOpacity
              className="bg-[#E3EBF4] rounded-[12.8px] w-full h-[46px] justify-center items-center"
              onPress={handleSkip}
            >
              <View className="flex-row items-center">
                <Ionicons name="play-forward" size={18} color="#6A9BCC" />
                <Text className="ml-2 text-[#6A9BCC] font-semibold">Skip</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#007BFFEB] hover:bg-[#003cff] rounded-[12.8px] w-full h-[46px] justify-center items-center"
              onPress={handleCancel}
            >
              <Text className="text-white text-[16px] font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-6 bg-[#E3EBF4] rounded-[12.8px] px-4 py-3">
            <Text className="text-[#6A9BCC] font-semibold text-center">
              Completed: {completedSessions} sessions
            </Text>
            <Text className="text-[#6A9BCC] font-semibold text-center mt-1">
              Next long break after:{" "}
              {longBreakInterval - (completedSessions % longBreakInterval)}{" "}
              sessions
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
