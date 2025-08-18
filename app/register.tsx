import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  login: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post("api/auth/register/", data, {
        headers: { "Content-Type": "application/json" },
      });

      const { access, message } = response.data;
      if (response.status === 200) {
        // await AsyncStorage.setItem("authToken", access);

        Toast.show({ type: "success", text1: message });
        navigation.replace("Home");
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
      <View className="flex-1 items-center justify-center p-5">
        <View className="flex justify-center mb-5">
          <Image source={require("../assets/images/register.png")} />
        </View>
        <Text className="text-[27.31px] font-bold mb-3 text-[#007BFF] leading-[100%]">
          Sign Up
        </Text>
        <Text className="text-[13.65px] font-medium mb-3 text-[#6A9BCC] leading-[100%]">
          Begin your focus journey
        </Text>

        <View>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: "First name is required",
            }}
            render={({ field: { onChange, value } }) => (
              <View className="w-[311.5px] h-[58.03px] bg-[#FEFBFB33] border-[1.71px] border-[#968F8F8C] rounded-[12.8px] px-4 flex flex-row justify-between items-center mb-3">
                <View className="flex flex-row items-center">
                  <Ionicons
                    name={"person"}
                    size={22}
                    color="#6A9BCC"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    className="flex-1 font-medium text-[17.07px] h-[58.03px] outline-none"
                    placeholder="First Name"
                    placeholderTextColor="#6A9BCC"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />
          {errors.firstName && (
            <Text className="text-red-600 mb-2">
              {errors.firstName.message}
            </Text>
          )}

          <Controller
            control={control}
            name="lastName"
            rules={{
              required: "Last name is required",
            }}
            render={({ field: { onChange, value } }) => (
              <View className="w-[311.5px] h-[58.03px] bg-[#FEFBFB33] border-[1.71px] border-[#968F8F8C] rounded-[12.8px] px-4 flex flex-row justify-between items-center mb-3">
                <View className="flex flex-row items-center">
                  <Ionicons
                    name={"person"}
                    size={22}
                    color="#6A9BCC"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    className="flex-1 font-medium text-[17.07px] h-[58.03px] outline-none"
                    placeholder="Last Name"
                    placeholderTextColor="#6A9BCC"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />
          {errors.lastName && (
            <Text className="text-red-600 mb-2">{errors.lastName.message}</Text>
          )}

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View className="w-[311.5px] h-[58.03px] bg-[#FEFBFB33] border-[1.71px] border-[#968F8F8C] rounded-[12.8px] px-4 flex flex-row justify-between items-center mb-3">
                <View className="flex flex-row items-center">
                  <Ionicons
                    name={"mail"}
                    size={22}
                    color="#6A9BCC"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    className="flex-1 font-medium text-[17.07px] h-[58.03px] outline-none"
                    placeholder="Email"
                    placeholderTextColor="#6A9BCC"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />
          {errors.email && (
            <Text className="text-red-600 mb-2">{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, value } }) => (
              <View className="w-[311.5px] h-[58.03px] bg-[#FEFBFB33] border-[1.71px] border-[#968F8F8C] rounded-[12.8px] px-4 flex flex-row justify-between items-center">
                <View className="flex flex-row items-center">
                  <Ionicons
                    name={"lock-closed"}
                    size={22}
                    color="#6A9BCC"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    className="flex-1 font-medium text-[17.07px] h-[58.03px] outline-none"
                    placeholder="Password"
                    placeholderTextColor="#6A9BCC"
                    secureTextEntry={!isPasswordVisible}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={22}
                    color="#6A9BCC"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && (
            <Text className="text-red-600 mb-2">{errors.password.message}</Text>
          )}

          <View className="flex justify-center items-center">
            <TouchableOpacity
              className="bg-[#007BFFEB] hover:bg-[#003cff] rounded-[12.8px] w-[253.47px] h-[59.74px] justify-center items-center mt-4"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white font-bold text-[20px] leading-[100%]">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-[#6A9BCC] mt-2">
          Already have an account?{" "}
          <Text
            className="text-[#007BFFEB] hover:text-[#003cff]"
            onPress={() => navigation.navigate("login")}
          >
            Sign In
          </Text>
        </Text>

        <Toast />
      </View>
    </ScrollView>
  );
};

export default Register;
