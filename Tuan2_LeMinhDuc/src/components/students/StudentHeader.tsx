import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface StudentHeaderProps {
  query: string;
  onQueryChange: (text: string) => void;
  totalStudents: number;
}

export function StudentHeader({
  query,
  onQueryChange,
  totalStudents,
}: StudentHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.screenTitle}>Student Directory</Text>
      <Text style={styles.subtitle}>Danh bạ sinh viên theo khoa</Text>
      <TextInput
        value={query}
        onChangeText={onQueryChange}
        placeholder="Tìm tên, mã sinh viên hoặc lớp"
        placeholderTextColor="#8A8F98"
        returnKeyType="search"
        autoCorrect={false}
        style={styles.searchInput}
      />
      <Text style={styles.resultText}>Tìm thấy {totalStudents} sinh viên</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  resultText: {
    fontSize: 13,
    color: "#666",
    marginTop: 8,
  },
});
