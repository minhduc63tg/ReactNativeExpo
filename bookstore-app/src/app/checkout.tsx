import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "../adapters/useCart";

export default function CheckoutScreen() {
  const router = useRouter();
  const { amount } = useLocalSearchParams<{ amount: string }>();
  const { emptyCart } = useCart();

  const handleFinishOrder = () => {
    emptyCart();
    alert("Đặt hàng thành công!");
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Xác nhận đơn hàng</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Tổng thanh toán:</Text>
        <Text style={styles.amount}>${amount || 0}</Text>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleFinishOrder}>
        <Text style={styles.btnText}>Hoàn tất đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  label: { fontSize: 14, color: "#6b7280" },
  amount: { fontSize: 32, fontWeight: "bold", color: "#059669", marginTop: 8 },
  confirmBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
