import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Book, formatVND } from '@/data/bookstore';

interface BookDetailScreenProps {
  book: Book;
  onBack: () => void;
  onAddToCart?: (book: Book, quantity: number) => void;
}

/**
 * Giờ 4 — Bài tập 2: Màn hình Chi tiết sách (Book Detail)
 * - Ảnh bìa lớn: alignSelf: 'center', width cố định hoặc theo %, aspectRatio giữ tỉ lệ
 * - Phần mô tả dài đặt trong ScrollView riêng (flex: 1) để không đẩy tràn thanh dưới
 * - Thanh dưới cùng 'Thêm vào giỏ': flexDirection: 'row', justifyContent: 'space-between',
 *   cố định ngoài ScrollView
 */
export const BookDetailScreen: React.FC<BookDetailScreenProps> = ({
  book,
  onBack,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAlert, setAddedAlert] = useState(false);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(book, quantity);
    }
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* 1. Header cố định phía trên (Back button + Tựa đề) */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹ Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Chi tiết sách
        </Text>
        <View style={styles.placeholderRight} />
      </View>

      {/* 2. ScrollView ở giữa (flex: 1): chứa ảnh bìa lớn alignSelf center + thông tin + mô tả dài */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Ảnh bìa lớn: alignSelf: 'center', width 55%, aspectRatio 3/4 */}
        <View style={styles.coverWrapper}>
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.largeCoverImage}
            resizeMode="cover"
          />
          {book.discountBadge && (
            <View style={styles.detailBadge}>
              <Text style={styles.detailBadgeText}>{book.discountBadge}</Text>
            </View>
          )}
        </View>

        {/* Thông tin cơ bản: Tên sách, Tác giả, Thể loại, Đánh giá */}
        <View style={styles.infoSection}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.authorName}>Tác giả: {book.author}</Text>

          <View style={styles.metaRow}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>⭐ {book.rating}</Text>
              <Text style={styles.reviewCount}>({book.reviewsCount} đánh giá)</Text>
            </View>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{book.category}</Text>
            </View>
          </View>

          {/* Hàng giá tiền */}
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>{formatVND(book.price)}</Text>
            {book.originalPrice > book.price && (
              <Text style={styles.originalPrice}>
                {formatVND(book.originalPrice)}
              </Text>
            )}
            {book.originalPrice > book.price && (
              <View style={styles.saveTag}>
                <Text style={styles.saveTagText}>
                  Tiết kiệm {formatVND(book.originalPrice - book.price)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Bộ chọn số lượng */}
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Số lượng mua:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mô tả dài cuộn được bên trong ScrollView */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionHeader}>Giới thiệu nội dung</Text>
          <Text style={styles.descriptionText}>{book.description}</Text>
        </View>
      </ScrollView>

      {/* Thông báo thêm thành công */}
      {addedAlert && (
        <View style={styles.toastAlert}>
          <Text style={styles.toastText}>✓ Đã thêm vào giỏ hàng!</Text>
        </View>
      )}

      {/* 3. Thanh dưới cùng cố định ngoài ScrollView: flexDirection: 'row', justifyContent: 'space-between' */}
      <View style={styles.bottomBar}>
        <View style={styles.totalPreview}>
          <Text style={styles.totalLabel}>Tạm tính:</Text>
          <Text style={styles.totalValue}>{formatVND(book.price * quantity)}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addToCartButton}
          onPress={handleAdd}
        >
          <Text style={styles.addToCartText}>🛒 Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    height: 52,
    backgroundColor: '#1A237E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  placeholderRight: {
    width: 60,
  },
  scrollView: {
    flex: 1, // Chiếm trọn không gian giữa header và bottomBar
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  coverWrapper: {
    position: 'relative',
    alignSelf: 'center', // Căn giữa ảnh bìa theo yêu cầu Giờ 4 BT2
    width: '56%',
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  largeCoverImage: {
    width: '100%',
    aspectRatio: 3 / 4, // Giữ chuẩn tỉ lệ ảnh
    borderRadius: 14,
  },
  detailBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#D32F2F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  detailBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  infoSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 16,
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A237E',
    lineHeight: 26,
    marginBottom: 6,
  },
  authorName: {
    fontSize: 14,
    color: '#5C6BC0',
    fontWeight: '600',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F59E0B',
  },
  reviewCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  categoryPill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  categoryPillText: {
    fontSize: 12,
    color: '#3F51B5',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#D32F2F',
  },
  originalPrice: {
    fontSize: 14,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
  },
  saveTag: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  saveTagText: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '600',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 3,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 16,
    color: '#111827',
  },
  descriptionSection: {
    marginTop: 8,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  toastAlert: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 6,
    zIndex: 99,
  },
  toastText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  bottomBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row', // Hàng ngang
    justifyContent: 'space-between', // space-between theo yêu cầu
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  totalPreview: {
    flexDirection: 'column',
  },
  totalLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D32F2F',
  },
  addToCartButton: {
    backgroundColor: '#1A237E',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
