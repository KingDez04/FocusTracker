import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: "History", headerShown: false }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings", headerShown: false }}
      />
    </Tabs>
  );
};
export default _layout;
