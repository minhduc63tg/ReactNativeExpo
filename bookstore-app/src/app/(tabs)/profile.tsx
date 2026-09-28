import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../adapters/useAuth";

export default function ProfileScreen() {
  const { isLoggedIn, user, login, logoutUser } = useAuth();

  return (
    <View style={styles.container}>
      {isLoggedIn && user ? (
        <View style={styles.card}>
          <Text style={styles.welcome}>Xin chào, {user.name}!</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          <TouchableOpacity
            style={[styles.btn, styles.logoutBtn]}
            onPress={logoutUser}
          >
            <Text style={styles.btnText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.notice}>Bạn chưa đăng nhập</Text>
          <TouchableOpacity style={styles.btn} onPress={login}>
            <Text style={styles.btnText}>Đăng nhập (Giả lập)</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  welcome: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  email: { color: "#4b5563", marginBottom: 16 },
  notice: { fontSize: 16, color: "#6b7280", marginBottom: 16 },
  btn: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  logoutBtn: { backgroundColor: "#dc2626" },
  btnText: { color: "#fff", fontWeight: "bold" },
});
