import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import axiosClient from "../../api/axiosClient";
import { BookCard } from "../../components/BookCard";
import { useCart } from "../../adapters/useCart";

export default function HomeScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log("Fetch books error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 8 }}>Đang tải danh sách sách...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookCard
            id={item.id}
            title={item.title}
            price={item.price}
            author={item.author}
            onPress={() => router.push(`/book/${item.id}`)}
            onAddToCart={() =>
              addItem({
                id: item.id,
                title: item.title,
                price: Number(item.price),
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
