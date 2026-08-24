import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface CourseHeaderProps {
  query: string;
  onQueryChange: (text: string) => void;
  resultCount: number;
}

export function CourseHeader({
  query,
  onQueryChange,
  resultCount,
}: CourseHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.screenTitle}>Course Catalog</Text>
      <Text style={styles.subtitle}>Khám phá các khóa học đang mở</Text>
      <TextInput
        value={query}
        onChangeText={onQueryChange}
        placeholder="Tìm theo tên, giảng viên hoặc danh mục"
        placeholderTextColor="#8A8F98"
        returnKeyType="search"
        autoCorrect={false}
        style={styles.searchInput}
      />
      <Text style={styles.resultText}>Tìm thấy {resultCount} khóa học</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
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
