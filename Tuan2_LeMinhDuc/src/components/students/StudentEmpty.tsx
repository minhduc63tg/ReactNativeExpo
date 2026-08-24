import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StudentEmptyProps {
  query: string;
}

export function StudentEmpty({ query }: StudentEmptyProps) {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Không tìm thấy sinh viên</Text>
      <Text style={styles.emptyText}>
        Không có sinh viên phù hợp với “{query.trim()}”.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  emptyText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});
