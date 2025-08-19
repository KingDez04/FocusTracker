import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const FocusHistory = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Week");

  const tabs = ["Days", "Week", "Months"];

  const historyData = [
    { id: "1", duration: "25 min", time: "10:00 AM - 10:25 AM" },
    { id: "2", duration: "15 min", time: "09:00 AM - 09:15 AM" },
    { id: "3", duration: "20 min", time: "09:00 AM - 09:15 AM" },
  ];

  interface HistoryItem {
    id: string;
    duration: string;
    time: string;
  }

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View className="flex-row items-center p-3 mb-3">
      <View className="w-[55px] h-[50px] rounded-[10px] bg-[#E3EBF4] flex items-center justify-center mr-3">
        <Ionicons name="time-outline" size={25} color="black" />
      </View>
      <View>
        <Text className="font-semibold text-[15px]">{item.duration}</Text>
        <Text className="text-[#6A9BCC] font-semibold text-[15px]">
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white px-5 py-6">
      <View className="flex-row items-center mb-6 space-x-16">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={45} color="#6A9BCC" />
        </TouchableOpacity>
        <Text className="text-[30px] font-semibold text-[#007BFF] leading-[100%]">
          Focus History
        </Text>
      </View>

      <View className="flex-row bg-[#E3EBF4] rounded-[12.8px] p-1 mb-5">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-2 rounded-[10px] ${
              selectedTab === tab ? "bg-white" : ""
            }`}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              className={`text-center font-semibold text-[15px] ${
                selectedTab === tab ? "text-black" : "text-[#6A9BCC]"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FocusHistory;
