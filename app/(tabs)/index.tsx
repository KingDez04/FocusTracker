import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

type RootStackParamList = {
  Index: undefined;
  focusInput: undefined;
};

type IndexScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Index"
>;

const Index = () => {
  const navigation = useNavigation<IndexScreenNavigationProp>();

  return (
    <SafeAreaView>
      <View className="flex h-screen justify-center bg-white px-6">
        <Text className="text-[32px] font-extrabold text-[#007BFF] leading-[100%] text-center">
          Welcome to Focus Tracker
        </Text>
        <Text className="text-[15px] font-semibold text-[#6A9BCC] leading-[100%] text-center mt-8 mb-2">
          Master your time, one session at a time
        </Text>

        <View className="mt-2 items-center">
          <View className="h-[0.3px] bg-[#6A9BCC] w-full my-2" />

          <View className="mt-8 flex-row items-center justify-center space-x-3">
            <Text className="text-[15px] text-[#6A9BCC] text-center font-semibold">
              Break down your work into focused intervals, typically with short
              breaks in between. This simple tool helps you improve your
              productivity and stay on task.
            </Text>
          </View>

          <TouchableOpacity
            className="bg-[#007BFFEB] hover:bg-[#003cff] rounded-[12.8px] w-[180px] h-[55px] justify-center items-center my-10"
            onPress={() => navigation.navigate("focusInput")}
          >
            <Text className="text-white text-[20px] font-bold">
              Get Started
            </Text>
          </TouchableOpacity>

          <View className="h-[0.3px] bg-[#6A9BCC] w-full my-2" />

          <View className="mt-8 flex-row items-center justify-center space-x-3">
            <Text className="text-[15px] text-[#6A9BCC] text-center font-semibold">
              Created to help you achieve deep, distraction- free work
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
