import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../types/api";

export default function UserProfileScreen() {
  // Giới hạn kiểu dữ liệu có thể null
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      setUser(data as User);
    } catch (error) {
      console.error("Lỗi tải user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Đang tải hồ sơ...</Text>
      </View>
    );
  }

  // Khi chưa có dữ liệu thì hiển thị màn hình trống
  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy thông tin người dùng.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh điều hướng quay lại */}
      <View style={styles.navBar}>
        <Link href="/" asChild>
          <Pressable style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Quay lại Trang chủ</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={styles.headerTitle}>Hồ sơ người dùng</Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>

        {/* Sử dụng Optional Chaining (user?.name) để tránh lỗi khi dữ liệu chưa về */}
        <Text style={styles.name}>{user?.name}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Thành phố:</Text>
          <Text style={styles.value}>{user?.address?.city}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
  navBar: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    marginBottom: 16,
  },
  backBtn: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0F172A",
  },
  infoRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  label: {
    fontSize: 14,
    color: "#64748B",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
});
