import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  Image,
  Switch,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";

type RootStackParamList = {
  Settings: undefined;
  login: undefined;
};

type SettingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Settings"
>;

const userData = {
  profile_picture: "",
  firstName: "Ademola",
  lastName: "Ademeso",
  email: "ademolaademeso@gmail.com",
};

export default function SettingsScreen() {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [profileImage, setProfileImage] = useState<Asset | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Notifications disabled",
          text2: "Enable in settings to receive alerts",
        });
      }
    })();
  }, []);

  const handleLogout = () => {
    Toast.show({
      type: "success",
      text1: "Logged out successfully",
    });
    navigation.replace("login");
  };

  const handlePickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", selectionLimit: 1, quality: 1 },
      (response) => {
        if (response.didCancel) {
          Toast.show({ type: "info", text1: "Cancelled" });
        } else if (response.errorCode) {
          Toast.show({
            type: "error",
            text1: response.errorMessage || "Error",
          });
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0]);
          Toast.show({ type: "success", text1: "Profile updated" });
        }
      }
    );
  };

  const handleTogglePush = async (enabled: boolean) => {
    setPushNotifications(enabled);
    if (enabled) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Notifications Enabled",
          body: "You will now receive alerts",
          sound: true,
        },
        trigger: null,
      });
      Toast.show({ type: "success", text1: "Push notifications ON" });
    } else {
      Toast.show({ type: "info", text1: "Push notifications OFF" });
    }
  };

  const handleToggleSound = (enabled: boolean) => {
    setSound(enabled);
    if (enabled) {
      Toast.show({ type: "success", text1: "Sound ON (system default)" });
    } else {
      Toast.show({ type: "info", text1: "Sound OFF" });
    }
  };

  const handleToggleVibration = (enabled: boolean) => {
    setVibration(enabled);
    if (enabled) {
      Vibration.vibrate(200);
      Toast.show({ type: "success", text1: "Vibration ON" });
    } else {
      Toast.show({ type: "info", text1: "Vibration OFF" });
    }
  };

  return (
    <View className="flex-1 h-screen justify-center bg-white">
      <View className="items-center mt-10">
        <TouchableOpacity onPress={handlePickImage}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage.uri }}
              className="rounded-full h-[90px] w-[90px] border-2 border-white"
            />
          ) : (
            <Image
              source={require("../../assets/images/dp.png")}
              className="rounded-full h-[90px] w-[90px] border-2 border-white"
            />
          )}
        </TouchableOpacity>

        <Text className="mt-2 font-medium text-[13.65px] text-[#6A9BCC]">
          {`${userData.firstName} ${userData.lastName}`}
        </Text>
        <Text className="font-medium text-[13.65px] text-[#6A9BCC]">
          {userData.email}
        </Text>

        <TouchableOpacity
          onPress={handlePickImage}
          className="mt-3 bg-[#007BFFEB] w-[150px] h-[55px] rounded-[12.8px] justify-center items-center"
        >
          <Text className="text-[20px] text-white font-bold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 px-5">
        <Text className="text-[17.07px] text-[#6A9BCC] font-medium mb-3">
          Preferences
        </Text>

        <View className="flex-row justify-between items-center border border-[#968F8F8C] rounded-xl p-4 mb-3">
          <View className="flex-row items-center space-x-2">
            <Ionicons name="notifications" size={20} color="#6A9BCC" />
            <Text className="text-[#6A9BCC] font-medium text-[17.07px]">
              Push notifications
            </Text>
          </View>
          <Switch value={pushNotifications} onValueChange={handleTogglePush} />
        </View>

        <View className="flex-row justify-between items-center border border-[#968F8F8C] rounded-xl p-4 mb-3">
          <View className="flex-row items-center space-x-2">
            <Ionicons name="volume-high-sharp" size={20} color="#6A9BCC" />
            <Text className="text-[#6A9BCC] font-medium text-[17.07px]">
              Sound
            </Text>
          </View>
          <Switch value={sound} onValueChange={handleToggleSound} />
        </View>

        <View className="flex-row justify-between items-center border border-[#968F8F8C] rounded-xl p-4 mb-3">
          <View className="flex-row items-center space-x-2">
            <Ionicons name="phone-portrait" size={20} color="#6A9BCC" />
            <Text className="text-[#6A9BCC] font-medium text-[17.07px]">
              Vibration
            </Text>
          </View>
          <Switch value={vibration} onValueChange={handleToggleVibration} />
        </View>
      </View>

      <View className="mt-6 px-5">
        <Text className="text-[17.07px] text-[#6A9BCC] font-medium mb-3">
          Account
        </Text>

        <TouchableOpacity
          className="flex-row items-center border border-[#968F8F8C] rounded-xl p-4"
          onPress={handleLogout}
        >
          <Ionicons name="arrow-forward-circle" size={20} color="#6A9BCC" />
          <Text className="ml-3 text-[#6A9BCC] font-medium text-[17.07px]">
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
