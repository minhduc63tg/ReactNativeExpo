import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axiosClient from "../../api/axiosClient";
import { useCart } from "../../adapters/useCart";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCart();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`/books/${id}`)
        .then((res) => setBook(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading || !book) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Tác giả: {book.author}</Text>
      <Text style={styles.price}>${book.price}</Text>
      <Text style={styles.desc}>
        {book.description || "Không có mô tả chi tiết."}
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          addItem({ id: book.id, title: book.title, price: Number(book.price) })
        }
      >
        <Text style={styles.btnText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  author: { fontSize: 15, color: "#4b5563", marginVertical: 6 },
  price: {
    fontSize: 20,
    color: "#059669",
    fontWeight: "bold",
    marginBottom: 16,
  },
  desc: { fontSize: 14, color: "#374151", lineHeight: 22, flex: 1 },
  btn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
