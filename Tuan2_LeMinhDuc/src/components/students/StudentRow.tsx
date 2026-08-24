import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Student } from "@/data/students";

interface StudentRowProps {
  student: Student;
  onPress: (student: Student) => void;
}

function getInitials(fullName: string) {
  const words = fullName.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function StudentRow({ student, onPress }: StudentRowProps) {
  const isActive = student.status === "Đang học";

  return (
    <Pressable
      onPress={() => onPress(student)}
      style={({ pressed }) => [
        styles.studentCard,
        pressed && styles.studentCardPressed,
      ]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(student.fullName)}</Text>
      </View>
      <View style={styles.studentContent}>
        <Text style={styles.studentName}>{student.fullName}</Text>
        <Text style={styles.studentMeta}>
          {student.studentId} · {student.className}
        </Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          isActive ? styles.activeBadge : styles.pausedBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            isActive ? styles.activeText : styles.pausedText,
          ]}
        >
          {student.status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  studentCardPressed: {
    opacity: 0.7,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#3730A3",
    fontWeight: "bold",
  },
  studentContent: {
    flex: 1,
  },
  studentName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  studentMeta: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: "#DEF7EC",
  },
  pausedBadge: {
    backgroundColor: "#FDE8E8",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "500",
  },
  activeText: {
    color: "#03543F",
  },
  pausedText: {
    color: "#9B1C1C",
  },
});
