import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, SafeAreaView } from "react-native";

export default function Bai2Screen() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("Chưa kết nối");
  const [lastConnectedTime, setLastConnectedTime] = useState<string | null>(
    null
  );

  // useEffect theo dõi biến isConnected
  useEffect(() => {
    if (isConnected) {
      setMessage("Thiết bị đã kết nối");
      setLastConnectedTime(new Date().toLocaleTimeString("vi-VN"));
    } else {
      setMessage("Thiết bị đã ngắt kết nối");
    }
  }, [isConnected]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Bài 3.1.2: useEffect</Text>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Trạng thái kết nối:</Text>
        <Switch value={isConnected} onValueChange={setIsConnected} />
      </View>

      {/* Đổi màu chữ: Xanh lá khi kết nối, Đỏ khi ngắt */}
      <Text
        style={[
          styles.statusText,
          { color: isConnected ? "#34c759" : "#ff3b30" },
        ]}
      >
        {message}
      </Text>

      {/* Hiển thị thời điểm kết nối gần nhất */}
      {lastConnectedTime && (
        <Text style={styles.timeText}>
          Thời điểm kết nối gần nhất: {lastConnectedTime}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 24 },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  label: { fontSize: 18 },
  statusText: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  timeText: { fontSize: 14, color: "#666" },
});
