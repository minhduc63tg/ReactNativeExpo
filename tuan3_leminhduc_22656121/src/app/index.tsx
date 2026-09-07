import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function MenuScreen() {
  const router = useRouter();

  const lessons = [
    { title: "Bài 3.1.1: useState (Form họ tên)", route: "/bai1" },
    { title: "Bài 3.1.2: useEffect (Kết nối mạng)", route: "/bai2" },
    { title: "Bài 3.1.3: useContext (User Info)", route: "/bai3" },
    { title: "Bài 3.1.4: useReducer (Đăng nhập)", route: "/bai4" },
    { title: "Bài 3.1.5: useMemo & useCallback", route: "/bai5" },
    { title: "Bài tập tổng hợp: Quản lý Todo", route: "/todo" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Phiếu Bài Tập Tuần 3</Text>
        <Text style={styles.subTitle}>Chương 3: Hook trong React Native</Text>

        <View style={styles.menuList}>
          {lessons.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
              activeOpacity={0.7}
              onPress={() => router.push(item.route as any)}
            >
              <Text style={styles.menuButtonText}>{item.title}</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  container: {
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  subTitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginTop: 6,
    marginBottom: 30,
  },
  menuList: {
    gap: 12,
  },
  menuButton: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5ea",
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c1c1e",
  },
  arrowIcon: {
    fontSize: 22,
    color: "#c7c7cc",
    fontWeight: "bold",
  },
});
