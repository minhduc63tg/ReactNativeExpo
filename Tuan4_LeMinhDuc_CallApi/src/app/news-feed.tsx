import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Post } from "../types/api";

export default function NewsFeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      // Gán kiểu an toàn cho kết quả fetch
      setPosts(data as Post[]);
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Đang tải bài viết...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh điều hướng quay lại */}
      <View style={styles.navBar}>
        <Link href="/" asChild>
          <Pressable style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Quay lại Trang chủ</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={styles.header}>Danh sách tin tức ({posts.length})</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              #{item.id}. {item.title}
            </Text>
            <Text numberOfLines={2} style={styles.body}>
              {item.body}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
  navBar: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    marginBottom: 12,
  },
  backBtn: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#0F172A",
    textTransform: "capitalize",
  },
  body: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
});
