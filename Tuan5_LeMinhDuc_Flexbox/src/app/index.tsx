import { BottomTabBar, TabKey } from "@/components/bookstore/BottomTabBar";
import { Book, CartItem, INITIAL_CART } from "@/data/bookstore";
import { AccountScreen } from "@/screens/AccountScreen";
import { BookDetailScreen } from "@/screens/BookDetailScreen";
import { CartScreen } from "@/screens/CartScreen";
import { CategoriesScreen } from "@/screens/CategoriesScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { LabExercisesViewer } from "@/screens/LabExercisesViewer";
import { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type AppViewMode = "app" | "lab";

export default function BookStoreApp() {
  const [viewMode, setViewMode] = useState<AppViewMode>("app");

  const [currentTab, setCurrentTab] = useState<TabKey>("home");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (book: Book, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: "cart_" + Date.now(),
          book,
          quantity,
        },
      ];
    });
  };

  // Cập nhật số lượng trong giỏ
  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  // Xoá sản phẩm khỏi giỏ
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Thanh toán
  const handleCheckout = () => {
    const msg = `Thanh toán thành công ${cartItems.length} sản phẩm!`;
    if (Platform.OS === "web") {
      alert(msg);
    } else {
      Alert.alert(
        "Thanh toán thành công",
        "Cảm ơn bạn đã mua hàng tại BookStore Online!",
      );
    }
    setCartItems([]);
  };

  // Điều hướng mở chi tiết sách
  const handleOpenBookDetail = (book: Book) => {
    setSelectedBook(book);
    setViewMode("app");
  };

  // Điều hướng sang giỏ hàng từ Header hoặc Floating Cart Button
  const handleOpenCart = () => {
    setSelectedBook(null);
    setCurrentTab("cart");
    setViewMode("app");
  };

  return (
    <SafeAreaProvider>
      <View style={styles.rootContainer}>
        {/* Thanh chuyển đổi chế độ xem ở trên cùng: Full App vs Chấm bài từng giờ */}
        <View style={styles.topModeBar}>
          <TouchableOpacity
            style={[styles.modeTab, viewMode === "app" && styles.modeTabActive]}
            onPress={() => setViewMode("app")}
          >
            <Text
              style={[
                styles.modeTabText,
                viewMode === "app" && styles.modeTabTextActive,
              ]}
            >
              📱 Ứng dụng Hoàn chỉnh (Part 01)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeTab, viewMode === "lab" && styles.modeTabActive]}
            onPress={() => setViewMode("lab")}
          >
            <Text
              style={[
                styles.modeTabText,
                viewMode === "lab" && styles.modeTabTextActive,
              ]}
            >
              📐 Xem Bài tập Giờ 1 - Giờ 5
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.screenContainer}>
          {viewMode === "lab" ? (
            <LabExercisesViewer
              onSelectBook={handleOpenBookDetail}
              onOpenAppHome={() => {
                setViewMode("app");
                setSelectedBook(null);
                setCurrentTab("home");
              }}
            />
          ) : selectedBook ? (
            <BookDetailScreen
              book={selectedBook}
              onBack={() => setSelectedBook(null)}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <>
              {currentTab === "home" && (
                <HomeScreen
                  onBookPress={handleOpenBookDetail}
                  onCartPress={handleOpenCart}
                  cartCount={totalCartCount}
                />
              )}

              {currentTab === "categories" && (
                <CategoriesScreen onBookPress={handleOpenBookDetail} />
              )}

              {currentTab === "cart" && (
                <CartScreen
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              )}

              {currentTab === "account" && (
                <AccountScreen onOpenLabGuide={() => setViewMode("lab")} />
              )}
            </>
          )}
        </View>

        {viewMode === "app" && !selectedBook && (
          <BottomTabBar
            activeTab={currentTab}
            onTabChange={(tab) => setCurrentTab(tab)}
            cartCount={totalCartCount}
            positionMode="relative"
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  topModeBar: {
    height: 44,
    backgroundColor: "#0F172A",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  modeTab: {
    flex: 1,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  modeTabActive: {
    backgroundColor: "#1E3A8A",
  },
  modeTabText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
  },
  modeTabTextActive: {
    color: "#FFFFFF",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
