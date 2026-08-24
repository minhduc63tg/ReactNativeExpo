import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function CourseEmpty() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Không tìm thấy khóa học</Text>
      <Text style={styles.emptyText}>
        Hãy thử tìm kiếm bằng một từ khóa khác.
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
