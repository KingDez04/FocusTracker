import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type RootStackParamList = {
  Timer: {
    focusDuration: string;
    shortBreak: string;
    longBreak: string;
    longBreakInterval: string;
  };
  FocusInput: undefined;
  login: undefined;
};

type FocusInputScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FocusInput"
>;

interface FocusInputFormInputs {
  focusDuration: string;
  shortBreak: string;
  longBreak: string;
  longBreakInterval: string;
}

const FocusInput: React.FC = () => {
  const navigation = useNavigation<FocusInputScreenNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FocusInputFormInputs>();

  const onSubmit = async (data: FocusInputFormInputs) => {
    try {
      const response = await axios.post(
        "https://focustracker.onrender.com/api/focus/start/",
        { focusDuration: data.focusDuration },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { access, message } = response.data;
      if (response.status === 200) {
        Toast.show({ type: "success", text1: message });
        navigation.replace("Timer", {
          focusDuration: data.focusDuration,
          shortBreak: data.shortBreak,
          longBreak: data.longBreak,
          longBreakInterval: data.longBreakInterval,
        });
      }
    } catch (error: any) {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message;

      switch (status) {
        case 400:
          Toast.show({ type: "error", text1: errorMessage || "Invalid data." });
          break;
        case 500:
          Toast.show({
            type: "error",
            text1: "Internal server error. Please try again later.",
          });
          break;
        default:
          Toast.show({
            type: "error",
            text1: "An unexpected error occurred. Please try again.",
          });
      }
    }
  };

  return (
    <ScrollView>
      <View className="flex h-screen items-center justify-center bg-white px-6">
        <Text className="text-[32px] font-extrabold mb-3 text-[#007BFF] leading-[100%]">
          Set your focus session
        </Text>

        <View>
          <Text className="my-3 font-bold text-[17px] text-[#6A9BCC]">
            Focus Duration (minutes)
          </Text>
          <Controller
            control={control}
            name="focusDuration"
            rules={{
              required: "Focus duration is required",
            }}
            render={({ field: { onChange, value } }) => (
              <View className="w-[359px] h-[58.03px] bg-[#FEFBFB33] border-[1.71px] border-[#968F8F8C] rounded-[12.8px] px-4 flex flex-row justify-between items-center mb-3">
                <View className="flex flex-row items-center">
                  <TextInput
                    className="flex-1 font-medium text-[17.07px] h-[58.03px] outline-none"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />
          {errors.focusDuration && (
            <Text className="text-red-600 mb-2">
              {errors.focusDuration.message}
            </Text>
          )}

          <Text className="my-3 font-bold text-[17px] text-[#6A9BCC]">
            Short break (minutes)
          </Text>
          <Controller
            control={control}
            name="shortBreak"
            render={({ field: { onChange, value } }) => (
              <View className="w-[359px] h-[58.03px] bg-[#FEFBFB33] border-[1.71px] border-[#968F8F8C] rounded-[12.8px] px-4 flex flex-row justify-between items-center mb-3">
                <View className="flex flex-row items-center">
                  <TextInput
                    className="flex-1 font-medium text-[17.07px] h-[58.03px] outline-none"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />

          <Text className="my-3 font-bold text-[17px] text-[#6A9BCC]">
            Long break (minutes)
          </Text>
          <Controller
            control={control}
            name="longBreak"
            render={({ field: { onChange, value } }) => (
              <View className="w-[359px] h-[58.03px] bg-[#FEFBFB33] border-[1.71px] border-[#968F8F8C] rounded-[12.8px] px-4 flex flex-row justify-between items-center mb-3">
                <View className="flex flex-row items-center">
                  <TextInput
                    className="flex-1 font-medium text-[17.07px] h-[58.03px] outline-none"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />

          <Text className="my-3 font-bold text-[17px] text-[#6A9BCC]">
            Long break interval
          </Text>
          <Controller
            control={control}
            name="longBreakInterval"
            // disabled={longBreak ? "false" : "true"}
            render={({ field: { onChange, value } }) => (
              <View className="w-[359px] h-[58.03px] bg-[#FEFBFB33] border-[1.71px] border-[#968F8F8C] rounded-[12.8px] px-4 flex flex-row justify-between items-center mb-3">
                <View className="flex flex-row items-center">
                  <TextInput
                    className="flex-1 font-medium text-[17.07px] h-[58.03px] outline-none"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />

          <View className="flex justify-center items-center">
            <TouchableOpacity
              className="bg-[#007BFFEB] hover:bg-[#003cff] rounded-[12.8px] w-[253.47px] h-[59.74px] justify-center items-center mt-4"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white font-bold text-[20px] leading-[100%]">
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Toast />
      </View>
    </ScrollView>
  );
};

export default FocusInput;
