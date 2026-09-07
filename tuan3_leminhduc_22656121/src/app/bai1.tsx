import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function Bai1Screen() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");

  // Nút xóa toàn bộ form
  const handleReset = () => {
    setFullName("");
    setAge("");
  };

  const parsedAge = parseInt(age, 10);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Bài 3.1.1: useState</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập họ tên"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập tuổi"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      {/* Hiển thị lời chào */}
      <Text style={styles.greeting}>
        {fullName.trim()
          ? `Xin chào, ${fullName.trim()}!`
          : "Vui lòng nhập họ tên"}
      </Text>

      {/* Kiểm tra tuổi < 18 */}
      {!isNaN(parsedAge) && parsedAge < 18 && (
        <Text style={styles.warningText}>Cảnh báo: Bạn chưa đủ 18 tuổi!</Text>
      )}

      <View style={{ marginTop: 16 }}>
        <Button title="Xóa dữ liệu" color="#ff3b30" onPress={handleReset} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  greeting: { fontSize: 18, marginVertical: 8, textAlign: "center" },
  warningText: {
    color: "#ff3b30",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
