import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StudentCard } from "@/components/StudentCard";
import { Card } from "@/components/MyButton";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <StudentCard
          studentId="22656121"
          major="Kỹ thuật Phần mềm"
          academicYear="2026 - 2027"
        /> */}

        <Card title="Thông tin sinh viên">
          <Text>Mã SV: 123456</Text>
          <Text>Ngành: CNTT</Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
