import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomError, Product } from "../types/api";

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  // Bài tập 11: Hàm bất đồng bộ có type annotations cho tham số
  const fetchProducts = async (searchKeyword: string, limit: number) => {
    try {
      const url = `https://dummyjson.com/products/search?q=${searchKeyword}&limit=${limit}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw {
          message: "Không thể tải dữ liệu sản phẩm",
          statusCode: response.status,
        } as CustomError;
      }

      const data = await response.json();
      setProducts(data.products as Product[]);
    } catch (error: unknown) {
      // Bài tập 12: Ép kiểu lỗi về CustomError hoặc xử lý type guarding an toàn
      const err = error as CustomError;
      Alert.alert("Lỗi API", err.message || "Đã có lỗi xảy ra");
    }
  };

  // Bài tập 12 mở rộng: Hàm cố tình làm lỗi để test catch block
  const triggerErrorApi = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products/invalid-url-test"
      );
      if (!response.ok) {
        throw {
          message: "Đường dẫn API không tồn tại!",
          statusCode: 404,
        } as CustomError;
      }
    } catch (error: unknown) {
      const err = error as CustomError;
      Alert.alert(
        "Custom Error Bắt Được",
        `Mã lỗi: ${err.statusCode} - ${err.message}`
      );
    }
  };

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

      <Text style={styles.headerTitle}>Tìm kiếm sản phẩm (Bài 11 & 12)</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tên sản phẩm..."
        placeholderTextColor="#94A3B8"
        value={keyword}
        onChangeText={setKeyword}
      />
      <Button
        title="Tìm kiếm sản phẩm"
        onPress={() => fetchProducts(keyword, 5)}
      />
      <View style={{ height: 10 }} />
      <Button
        title="Test Lỗi API (Bài 12)"
        color="#DC2626"
        onPress={triggerErrorApi}
      />

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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  card: {
    padding: 14,
    backgroundColor: "#FFFFFF",
    marginTop: 8,
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
