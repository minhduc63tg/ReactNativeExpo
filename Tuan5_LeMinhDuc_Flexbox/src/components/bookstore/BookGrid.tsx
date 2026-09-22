import { Book, formatVND } from "@/data/bookstore";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BookGridProps {
  books: Book[];
  columns?: 2 | 3;
  onBookPress?: (book: Book) => void;
  showBadge?: boolean;
}

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  columns = 2,
  onBookPress,
  showBadge = true,
}) => {
  const isThreeCols = columns === 3;

  return (
    <View
      style={[
        styles.gridContainer,
        isThreeCols ? styles.threeColsContainer : styles.twoColsContainer,
      ]}
    >
      {books.map((book) => {
        return (
          <TouchableOpacity
            key={book.id}
            activeOpacity={0.85}
            onPress={() => onBookPress && onBookPress(book)}
            style={[
              styles.gridItem,
              isThreeCols ? styles.itemThreeCols : styles.itemTwoCols,
            ]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: book.coverUrl }}
                style={styles.coverImage}
                resizeMode="cover"
              />

              {showBadge && book.discountBadge && (
                <View
                  style={[
                    styles.discountBadge,
                    book.discountBadge === "Mới"
                      ? styles.badgeNew
                      : styles.badgeDiscount,
                  ]}
                >
                  <Text style={styles.badgeText}>{book.discountBadge}</Text>
                </View>
              )}
            </View>

            <View style={styles.itemInfo}>
              <Text
                style={[styles.bookTitle, isThreeCols && styles.bookTitleSmall]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {book.title}
              </Text>

              <Text
                style={[
                  styles.authorText,
                  isThreeCols && styles.authorTextSmall,
                ]}
                numberOfLines={1}
              >
                {book.author}
              </Text>

              <View style={styles.priceRow}>
                <Text
                  style={[
                    styles.priceText,
                    isThreeCols && styles.priceTextSmall,
                  ]}
                >
                  {formatVND(book.price)}
                </Text>
                {book.originalPrice > book.price && !isThreeCols && (
                  <Text style={styles.originalPriceText}>
                    {formatVND(book.originalPrice)}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  twoColsContainer: {
    justifyContent: "space-between",
  },

  threeColsContainer: {
    justifyContent: "flex-start",
    gap: 10,
  },
  gridItem: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8EAF6",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  itemTwoCols: {
    width: "48%",
  },
  itemThreeCols: {
    width: "31%", // Chia 3 cột (100% - gap*2) / 3
  },
  imageContainer: {
    position: "relative", // Quan trọng: làm containing block cho Badge absolute
    width: "100%",
    backgroundColor: "#EEEEEE",
  },
  coverImage: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  discountBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 10,
    elevation: 3,
  },
  badgeDiscount: {
    backgroundColor: "#D32F2F",
  },
  badgeNew: {
    backgroundColor: "#F57C00",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  itemInfo: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 80,
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1A237E",
    lineHeight: 18,
    marginBottom: 2,
  },
  bookTitleSmall: {
    fontSize: 11,
    lineHeight: 15,
  },
  authorText: {
    fontSize: 11,
    color: "#7986CB",
    marginBottom: 6,
  },
  authorTextSmall: {
    fontSize: 10,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C2185B",
  },
  priceTextSmall: {
    fontSize: 12,
  },
  originalPriceText: {
    fontSize: 11,
    color: "#9E9E9E",
    textDecorationLine: "line-through",
  },
});
