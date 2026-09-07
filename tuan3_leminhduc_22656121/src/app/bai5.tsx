import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const INITIAL_PRODUCTS = [
  { id: "1", name: "Áo thun", price: 200000 },
  { id: "2", name: "Quần jean", price: 450000 },
  { id: "3", name: "Giày thể thao", price: 800000 },
  { id: "4", name: "Mũ lưỡi trai", price: 120000 },
];

export default function Bai5Screen() {
  const [keyword, setKeyword] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  // useMemo lọc theo tên và sắp xếp theo giá
  const filteredProducts = useMemo(() => {
    let result = INITIAL_PRODUCTS.filter((item) =>
      item.name.toLowerCase().includes(keyword.trim().toLowerCase()),
    );

    result.sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));
    return result;
  }, [keyword, sortAsc]);

  // useMemo tính tổng tiền các sản phẩm hiển thị
  const totalPrice = useMemo(() => {
    return filteredProducts.reduce((sum, item) => sum + item.price, 0);
  }, [filteredProducts]);

  // useCallback giữ nguyên tham chiếu hàm chọn sản phẩm
  const handleSelect = useCallback((item: { name: string; price: number }) => {
    alert(`Bạn đã chọn: ${item.name} (${item.price.toLocaleString("vi-VN")}đ)`);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Bài 3.1.5: useMemo & useCallback</Text>

      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm sản phẩm..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <View style={styles.sortRow}>
        <Button
          title={`Sắp xếp giá: ${sortAsc ? "Tăng dần ↑" : "Giảm dần ↓"}`}
          onPress={() => setSortAsc((prev) => !prev)}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              {item.price.toLocaleString("vi-VN")}đ
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Không tìm thấy sản phẩm</Text>
        }
      />

      {/* Hiển thị tổng tiền */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>
          Tổng giá: {totalPrice.toLocaleString("vi-VN")}đ
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    margin: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  sortRow: { marginBottom: 12 },
  item: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#f2f2f7",
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: { fontSize: 16, fontWeight: "500" },
  itemPrice: { fontSize: 16, color: "#007aff", fontWeight: "bold" },
  empty: { textAlign: "center", color: "#999", marginVertical: 16 },
  totalBox: {
    borderTopWidth: 1,
    borderTopColor: "#e5e5ea",
    paddingTop: 14,
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    color: "#ff3b30",
    padding: 20,
  },
});
