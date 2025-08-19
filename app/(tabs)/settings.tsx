import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Switch, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  return (
    <View className="flex-1 bg-white">
      <View className="items-center mt-10">
        <View className="rounded-full items-center justify-center">
          <Image source={require("../../assets/images/dp.png")} />
        </View>
        <Text className="mt-2 font-medium text-[13.65px] text-[#6A9BCC]">
          KehindeAkande
        </Text>
        <Text className="font-medium text-[13.65px] text-[#6A9BCC]">
          kennygee267@gmail.com
        </Text>

        <TouchableOpacity className="mt-3 bg-[#007BFF] hover:bg-[#003cff] w-[150px] h-[55px] rounded-[12.8px] justify-center items-center outline-none">
          <Text className="text-[20px] text-white font-bold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 px-5">
        <Text className="text-[17.07px] text-[#6A9BCC] font-medium mb-3">
          Preferences
        </Text>

        <View className="flex-row justify-between items-center border border-[#968F8F8C] rounded-xl p-4 mb-3">
          <View className="flex-row items-center space-x-2">
            <Ionicons name={"notifications"} size={20} color="#6A9BCC" />
            <Text className="text-[#6A9BCC] font-medium text-[17.07px]">
              Push notifications
            </Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />
        </View>

        <View className="flex-row justify-between items-center border border-[#968F8F8C] rounded-xl p-4 mb-3">
          <View className="flex-row items-center space-x-2">
            <Ionicons name={"volume-high-sharp"} size={20} color="#6A9BCC" />
            <Text className="text-[#6A9BCC] font-medium text-[17.07px]">
              Sound
            </Text>
          </View>
          <Switch value={sound} onValueChange={setSound} />
        </View>

        <View className="flex-row justify-between items-center border border-[#968F8F8C] rounded-xl p-4 mb-3">
          <View className="flex-row items-center space-x-2">
            <Ionicons name={"phone-portrait"} size={20} color="#6A9BCC" />
            <Text className="text-[#6A9BCC] font-medium text-[17.07px]">
              Vibration
            </Text>
          </View>
          <Switch value={vibration} onValueChange={setVibration} />
        </View>
      </View>

      <View className="mt-6 px-5">
        <Text className="text-[17.07px] text-[#6A9BCC] font-medium mb-3">
          Account
        </Text>

        <TouchableOpacity className="flex-row items-center border border-[#968F8F8C] rounded-xl p-4">
          <Ionicons name={"arrow-forward-circle"} size={20} color="#6A9BCC" />
          <Text className="ml-3 text-[#6A9BCC] font-medium text-[17.07px]">
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
