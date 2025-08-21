import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatTimeRange = (timestamp: number, duration: number) => {
  const start = new Date(timestamp);
  const end = new Date(timestamp + duration * 60 * 1000);

  const format = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return `${format(start)} - ${format(end)}`;
};

const daysBetween = (d1: Date, d2: Date) => {
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const FocusHistory = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Week");

  const tabs = ["Days", "Week", "Months"];

  const rawHistory = [
    { id: "1", duration: 25, timestamp: Date.now() - 2 * 60 * 60 * 1000 },
    { id: "2", duration: 15, timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 },
    { id: "3", duration: 45, timestamp: Date.now() - 20 * 24 * 60 * 60 * 1000 },
  ];

  const today = new Date();
  let filteredHistory = rawHistory.filter((item) => {
    const itemDate = new Date(item.timestamp);
    const diffDays = daysBetween(today, itemDate);

    if (selectedTab === "Days") return diffDays <= 1;
    if (selectedTab === "Week") return diffDays <= 7;
    if (selectedTab === "Months") return diffDays <= 30;
    return true;
  });

  const renderItem = ({ item }: { item: (typeof rawHistory)[0] }) => (
    <View className="flex-row items-center p-3 mb-3">
      <View className="w-[55px] h-[50px] rounded-[10px] bg-[#E3EBF4] flex items-center justify-center mr-3">
        <Ionicons name="time-outline" size={25} color="black" />
      </View>
      <View>
        <Text className="font-semibold text-[15px]">{item.duration} min</Text>
        <Text className="text-[#6A9BCC] font-semibold text-[15px]">
          {formatTimeRange(item.timestamp, item.duration)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <View>
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
          data={filteredHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-center text-[#6A9BCC] mt-5">
              No focus sessions found
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default FocusHistory;
