import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Lab2A_Wireframe } from "./src/components/labs/Lab2A_Wireframe";
import { Lab2B_Feed } from "./src/components/labs/Lab2B_Feed";
import { Lab2C_RegistrationForm } from "./src/components/labs/Lab2C_RegistrationForm";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"2A" | "2B" | "2C">("2A");

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Navigation Switcher */}
        <View style={styles.tabBar}>
          <Pressable
            onPress={() => setCurrentTab("2A")}
            style={[styles.tabItem, currentTab === "2A" && styles.tabActive]}
          >
            <Text
              style={[
                styles.tabText,
                currentTab === "2A" && styles.tabTextActive,
              ]}
            >
              Lab 2A
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentTab("2B")}
            style={[styles.tabItem, currentTab === "2B" && styles.tabActive]}
          >
            <Text
              style={[
                styles.tabText,
                currentTab === "2B" && styles.tabTextActive,
              ]}
            >
              Lab 2B
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentTab("2C")}
            style={[styles.tabItem, currentTab === "2C" && styles.tabActive]}
          >
            <Text
              style={[
                styles.tabText,
                currentTab === "2C" && styles.tabTextActive,
              ]}
            >
              Lab 2C
            </Text>
          </Pressable>
        </View>

        {/* Lab Content */}
        <View style={styles.content}>
          {currentTab === "2A" && <Lab2A_Wireframe />}
          {currentTab === "2B" && <Lab2B_Feed />}
          {currentTab === "2C" && <Lab2C_RegistrationForm />}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tabBar: {
    flexDirection: "row",
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: "#0056b3",
  },
  tabText: { fontSize: 14, color: "#6c757d", fontWeight: "500" },
  tabTextActive: { color: "#0056b3", fontWeight: "bold" },
  content: { flex: 1 },
});
