import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 13.65, fontWeight: "semibold" },
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#6A9BCC" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={24}
              color={focused ? "#6A9BCC" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={focused ? "#6A9BCC" : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
