import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../../adapters/useCart";

export default function CartScreen() {
  const router = useRouter();
  const { items, totalPrice, changeQty, removeItem } = useCart();

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: "#6b7280" }}>Giỏ hàng đang trống</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>
                    ${item.price} x {item.quantity}
                  </Text>
                </View>
                <View style={styles.qtyControl}>
                  <TouchableOpacity
                    onPress={() => changeQty(item.id, -1)}
                    style={styles.btnSmall}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => changeQty(item.id, 1)}
                    style={styles.btnSmall}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={[styles.btnSmall, { marginLeft: 8 }]}
                  >
                    <Text style={{ color: "red" }}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Tổng: ${totalPrice}</Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() =>
                router.push({
                  pathname: "/checkout",
                  params: { amount: totalPrice },
                })
              }
            >
              <Text style={styles.checkoutText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  itemRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  itemTitle: { fontSize: 15, fontWeight: "500" },
  itemPrice: { color: "#059669", marginTop: 4 },
  qtyControl: { flexDirection: "row", alignItems: "center" },
  btnSmall: {
    padding: 6,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    minWidth: 28,
    alignItems: "center",
  },
  qtyText: { marginHorizontal: 8, fontWeight: "bold" },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: { fontSize: 18, fontWeight: "bold" },
  checkoutBtn: {
    backgroundColor: "#059669",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
