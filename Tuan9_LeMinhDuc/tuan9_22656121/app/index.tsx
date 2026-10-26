import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import bookService from "../src/services/bookService";
import { Book } from "../src/types";
import { useAuth } from "../src/context/AuthContext";

export default function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    bookService
      .getAll()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={styles.center} size="large" color="#1565c0" />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.authHeader}>
        {user ? (
          <View style={styles.rowBetween}>
            <Text style={styles.welcome}>Chào, {user.name}!</Text>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.authLink}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.authLink}>Đăng nhập</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookCard}
            onPress={() => router.push(`/book/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <View style={styles.meta}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.price}>
                {item.price.toLocaleString("vi-VN")} đ
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  authHeader: {
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcome: { fontSize: 14, fontWeight: "600", color: "#333" },
  authLink: { color: "#1565c0", fontWeight: "bold" },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 12,
    borderRadius: 8,
    elevation: 1,
  },
  thumbnail: {
    width: 70,
    height: 100,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  meta: { marginLeft: 12, flex: 1, justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "bold", color: "#222" },
  author: { color: "#666", marginVertical: 4 },
  price: { color: "#c62828", fontWeight: "bold", fontSize: 15 },
});
