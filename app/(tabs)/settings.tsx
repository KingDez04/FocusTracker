import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Switch, Text, TouchableOpacity, View } from "react-native";
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
  firstName: "Kehinde",
  lastName: "Akande",
  email: "kennygee267@gmail.com",
};

export default function SettingsScreen() {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [profileImage, setProfileImage] = useState<Asset | null>(null);

  const handleLogout = () => {
    // SecureStore/AsyncStorage
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
          Toast.show({
            type: "success",
            text1: "User cancelled image picker",
          });
        } else if (response.errorCode) {
          Toast.show({
            type: "success",
            text1: `ImagePicker Error: ${response.errorMessage}`,
          });
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0]);
        }
      }
    );
  };

  return (
    <View className="flex-1 h-screen justify-center bg-white">
      <View className="items-center mt-10">
        <TouchableOpacity>
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
          className="mt-3 bg-[#007BFFEB] hover:bg-[#003cff] w-[150px] h-[55px] rounded-[12.8px] justify-center items-center"
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

        <TouchableOpacity
          className="flex-row items-center border border-[#968F8F8C] rounded-xl p-4"
          onPress={handleLogout}
        >
          <Ionicons name={"arrow-forward-circle"} size={20} color="#6A9BCC" />
          <Text className="ml-3 text-[#6A9BCC] font-medium text-[17.07px]">
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
