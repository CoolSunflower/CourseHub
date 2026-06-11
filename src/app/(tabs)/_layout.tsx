import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="courses" />
      <Tabs.Screen name="about" />
    </Tabs>
  );
}
