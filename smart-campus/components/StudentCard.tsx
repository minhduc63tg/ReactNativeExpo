import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { InfoRow } from "./InfoRow";

export interface StudentCardProps {
  studentId: string;
  major: string;
  academicYear: string;
}

export const StudentCard = ({
  studentId,
  major,
  academicYear,
}: StudentCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.headerTitle}>THÔNG TIN SINH VIÊN</Text>

      <InfoRow label="Mã SV" value={studentId} />
      <InfoRow label="Ngành học" value={major} />
      <InfoRow label="Niên khóa" value={academicYear} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    // Đổ bóng hiển thị đẹp trên Android & iOS
    elevation: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 12,
    textAlign: "center",
  },
});
