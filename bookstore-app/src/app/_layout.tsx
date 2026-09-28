import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="book/[id]" options={{ title: "Chi tiết sách" }} />
        <Stack.Screen name="checkout" options={{ title: "Thanh toán" }} />
      </Stack>
    </Provider>
  );
}
