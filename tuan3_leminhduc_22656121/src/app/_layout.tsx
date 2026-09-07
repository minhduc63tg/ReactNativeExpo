import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerShown: true, // Bật header để có nút quay lại mặc định
          headerBackTitle: "Quay lại",
          headerTintColor: "#007aff",
          headerTitleAlign: "center",
        }}
      >
        {/* <Stack.Screen name="index" /> */}

        <Stack.Screen
          name="index"
          options={{ title: "Danh sách bài tập", headerShown: false }}
        />
        <Stack.Screen name="bai1" options={{ title: "Bài 1: useState" }} />
        <Stack.Screen name="bai2" options={{ title: "Bài 2: useEffect" }} />
        <Stack.Screen name="bai3" options={{ title: "Bài 3: useContext" }} />
        <Stack.Screen name="bai4" options={{ title: "Bài 4: useReducer" }} />
        <Stack.Screen
          name="bai5"
          options={{ title: "Bài 5: useMemo & useCallback" }}
        />
        <Stack.Screen
          name="todo"
          options={{ title: "Bài tổng hợp: Quản lý Todo" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
