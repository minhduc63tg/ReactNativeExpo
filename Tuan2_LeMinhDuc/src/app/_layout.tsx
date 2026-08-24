import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Ẩn header mặc định bị tràn
        tabBarActiveTintColor: "#0066CC",
        tabBarInactiveTintColor: "#8A8F98",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* Tab 1: Khóa học (src/app/index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Khóa học",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 2: Sinh viên (src/app/explore.tsx) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Sinh viên",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
