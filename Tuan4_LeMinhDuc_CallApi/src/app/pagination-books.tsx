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
import { ApiResponse, Product } from "../types/api";

export default function PaginationBooksScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false); // Bài tập 15: Trạng thái refreshing

  const fetchProductsPaginated = async (isRefresh: boolean = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const response = await fetch(
        "https://dummyjson.com/products?limit=10&skip=0"
      );
      const json = await response.json();

      // Áp dụng Generic Interface ApiResponse<Product>
      const result: ApiResponse<Product> = {
        data: json.products,
        total: json.total,
        skip: json.skip,
        limit: json.limit,
      };

      setProducts(result.data);
    } catch (error) {
      console.error("Lỗi phân trang:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Tắt trạng thái refreshing khi hoàn tất
    }
  };

  useEffect(() => {
    fetchProductsPaginated();
  }, []);

  // Bài tập 15: Xử lý kéo để làm mới (Pull to Refresh)
  const handleRefresh = () => {
    setRefreshing(true);
    fetchProductsPaginated(true);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
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

      <View style={styles.titleRow}>
        <Text style={styles.headerTitle}>Sản phẩm phân trang (Bài 15)</Text>
        <Text style={styles.hintText}>Vuốt xuống để làm mới ↻</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>Giá: ${item.price}</Text>
          </View>
        )}
        // Tích hợp refreshing và onRefresh vào FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
  titleRow: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 2,
  },
  hintText: {
    fontSize: 12,
    color: "#16A34A",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    padding: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#16A34A",
    fontWeight: "600",
  },
});
