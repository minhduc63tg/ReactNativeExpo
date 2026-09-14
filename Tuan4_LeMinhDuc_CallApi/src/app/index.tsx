// app/index.tsx
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ứng dụng BookStore</Text>
        <Text style={styles.subtitle}>Tuần 4 • Thực hành Gọi API</Text>
      </View>

      <View style={styles.menu}>
        {/* Điều hướng đến file app/news-feed.tsx */}
        <Link href="/news-feed" asChild>
          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          >
            <Text style={styles.btnIcon}>📰</Text>
            <View style={styles.btnTextWrap}>
              <Text style={styles.btnTitle}>Xem Tin tức (News Feed)</Text>
              <Text style={styles.btnSub}>Danh sách bài viết JSONPlaceholder</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        {/* Điều hướng đến file app/user-profile.tsx */}
        <Link href="/user-profile" asChild>
          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          >
            <Text style={styles.btnIcon}>👤</Text>
            <View style={styles.btnTextWrap}>
              <Text style={styles.btnTitle}>Xem Hồ sơ người dùng</Text>
              <Text style={styles.btnSub}>Thông tin User với Optional Chaining</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        {/* Điều hướng đến file app/products.tsx */}
        <Link href="/products" asChild>
          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          >
            <Text style={styles.btnIcon}>🔍</Text>
            <View style={styles.btnTextWrap}>
              <Text style={styles.btnTitle}>Xem Danh sách sản phẩm</Text>
              <Text style={styles.btnSub}>Tìm kiếm & Kiểm thử CustomError</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        {/* Điều hướng đến file app/pagination-books.tsx */}
        <Link href="/pagination-books" asChild>
          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          >
            <Text style={styles.btnIcon}>📚</Text>
            <View style={styles.btnTextWrap}>
              <Text style={styles.btnTitle}>Xem Danh sách sản phẩm phân trang</Text>
              <Text style={styles.btnSub}>Phân trang Generic & Pull to Refresh</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    marginBottom: 28,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  menu: {
    gap: 14,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  btnPressed: {
    backgroundColor: "#F1F5F9",
    transform: [{ scale: 0.99 }],
  },
  btnIcon: {
    fontSize: 26,
    marginRight: 14,
  },
  btnTextWrap: {
    flex: 1,
  },
  btnTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 3,
  },
  btnSub: {
    fontSize: 12,
    color: "#64748B",
  },
  arrow: {
    fontSize: 24,
    color: "#94A3B8",
    fontWeight: "300",
    marginLeft: 8,
  },
});
