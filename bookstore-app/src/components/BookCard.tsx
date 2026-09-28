import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BookCardProps {
  id: string;
  title: string;
  price: number;
  author: string;
  onPress: () => void;
  onAddToCart: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  title,
  price,
  author,
  onPress,
  onAddToCart,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={onAddToCart}>
        <Text style={styles.addBtnText}>+ Thêm</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  info: { flex: 1, marginRight: 10 },
  title: { fontSize: 16, fontWeight: "600", color: "#111827" },
  author: { fontSize: 13, color: "#6b7280", marginVertical: 2 },
  price: { fontSize: 15, fontWeight: "700", color: "#059669" },
  addBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addBtnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
});
