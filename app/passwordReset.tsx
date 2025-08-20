import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

type RootStackParamList = {
  Home: undefined;
  login: undefined;
  register: undefined;
  PasswordReset: undefined;
};

type PasswordResetNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PasswordReset"
>;

interface ResetFormInputs {
  email: string;
}

const PasswordReset: React.FC = () => {
  const navigation = useNavigation<PasswordResetNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormInputs>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ResetFormInputs) => {
    try {
      setLoading(true);
      const response = await axios.post("api/auth/forgot-password/", data, {
        headers: { "Content-Type": "application/json" },
      });

      const { message } = response.data;
      if (response.status === 200) {
        Toast.show({ type: "success", text1: message });
        navigation.navigate("login");
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-5">
      <View className="flex justify-center mb-5">
        <Image source={require("../assets/images/login.png")} />
      </View>
      <Text className="text-[27.31px] font-bold mb-3 text-[#007BFF] leading-[100%]">
        Forgot Password
      </Text>
      <Text className="text-[13.65px] font-medium mb-3 text-[#6A9BCC] leading-[100%]">
        Enter your email to reset your password
      </Text>

      <View>
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

        <View className="flex justify-center items-center">
          <TouchableOpacity
            disabled={loading}
            className={`rounded-[12.8px] w-[253.47px] h-[59.74px] justify-center items-center mt-4 ${
              loading ? "bg-gray-400" : "bg-[#007BFFEB] hover:bg-[#003cff]"
            }`}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white font-bold text-[20px] leading-[100%]">
              {loading ? "Sending..." : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="mt-4"
        onPress={() => navigation.navigate("login")}
      >
        <Text className="text-[#007BFFEB] hover:text-[#003cff] font-semibold text-[13.65px]">
          Back to Login
        </Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

export default PasswordReset;
