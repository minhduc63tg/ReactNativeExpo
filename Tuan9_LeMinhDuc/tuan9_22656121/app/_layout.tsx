import { Stack } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1565c0" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "BookStore" }} />
        <Stack.Screen name="book/[id]" options={{ title: "Chi tiết sách" }} />
        <Stack.Screen
          name="login"
          options={{ title: "Đăng nhập", presentation: "modal" }}
        />
      </Stack>
    </AuthProvider>
  );
}
