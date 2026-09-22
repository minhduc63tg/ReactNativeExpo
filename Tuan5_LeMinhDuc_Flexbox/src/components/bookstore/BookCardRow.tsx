import { Book, formatVND } from "@/data/bookstore";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BookCardRowProps {
  book: Book;
  onPress?: (book: Book) => void;
  alignMode?: "flex-start" | "center";
}

export const BookCardRow: React.FC<BookCardRowProps> = ({
  book,
  onPress,
  alignMode = "flex-start",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress(book)}
      style={[
        styles.cardContainer,
        alignMode === "center" ? styles.alignCenter : styles.alignFlexStart,
      ]}
    >
      <Image
        source={{ uri: book.coverUrl }}
        style={styles.coverImage}
        resizeMode="cover"
      />

      <View style={styles.infoColumn}>
        <View style={styles.topInfo}>
          <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">
            {book.title}
          </Text>
          <Text style={styles.authorText} numberOfLines={1}>
            {book.author}
          </Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{book.category}</Text>
          </View>
        </View>

        <View style={styles.bottomPriceRow}>
          <Text style={styles.priceText}>{formatVND(book.price)}</Text>
          {book.originalPrice > book.price && (
            <Text style={styles.originalPriceText}>
              {formatVND(book.originalPrice)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#E8EAF6",
  },
  alignFlexStart: {
    alignItems: "flex-start",
  },
  alignCenter: {
    alignItems: "center",
  },
  coverImage: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  infoColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between", // Đẩy phần giá tiền xuống dưới cùng
    marginLeft: 14,
    height: 110, // Đồng bộ chiều cao với ảnh để space-between hoạt động chuẩn xác
  },
  topInfo: {
    flexDirection: "column",
    gap: 4,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A237E",
    lineHeight: 20,
  },
  authorText: {
    fontSize: 13,
    color: "#5C6BC0",
    fontWeight: "500",
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  categoryBadgeText: {
    fontSize: 11,
    color: "#3949AB",
    fontWeight: "600",
  },
  bottomPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D32F2F",
  },
  originalPriceText: {
    fontSize: 12,
    color: "#9E9E9E",
    textDecorationLine: "line-through",
  },
});
