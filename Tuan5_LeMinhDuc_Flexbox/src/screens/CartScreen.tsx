import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartItem, formatVND } from '@/data/bookstore';

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout?: () => void;
}

/**
 * Giờ 5 — Bài tập 2: Màn hình Giỏ hàng (Cart Screen)
 * - Toàn màn hình xử lý đủ 3 vùng không chồng lấp:
 *   1. Vùng 1 (Ở giữa): Danh sách sản phẩm cuộn được (ScrollView, flex: 1)
 *   2. Vùng 2 (Dưới danh sách): Thanh tổng tiền + nút 'Thanh toán' cố định KHÔNG cuộn
 *   3. Vùng 3 (Đáy cùng): Tab Bar cố định (được render ở root app layout)
 * - Mỗi dòng sản phẩm: flexDirection: 'row', alignItems: 'center'
 *   (ảnh cố định, tên flex: 1, số lượng + giá width cố định)
 */
export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header Giỏ hàng */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
        <Text style={styles.headerCount}>({items.length} món)</Text>
      </View>

      {/* VÙNG 1: Danh sách sản phẩm cuộn được (ScrollView / flex: 1) */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛍️</Text>
            <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
            <Text style={styles.emptySub}>
              Hãy chọn thêm sách yêu thích từ trang chủ!
            </Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.cartRow}>
              {/* Ảnh bìa kích thước cố định */}
              <Image
                source={{ uri: item.book.coverUrl }}
                style={styles.bookThumb}
                resizeMode="cover"
              />

              {/* Tên sách: flex: 1 để tự co giãn */}
              <View style={styles.titleColumn}>
                <Text
                  style={styles.bookTitle}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.book.title}
                </Text>
                <Text style={styles.unitPrice}>
                  Đơn giá: {formatVND(item.book.price)}
                </Text>
                <TouchableOpacity
                  onPress={() => onRemoveItem(item.id)}
                  style={styles.removeBtn}
                >
                  <Text style={styles.removeText}>Xoá</Text>
                </TouchableOpacity>
              </View>

              {/* Cột Số lượng + Thành tiền: width cố định */}
              <View style={styles.actionColumn}>
                <Text style={styles.itemTotal}>
                  {formatVND(item.book.price * item.quantity)}
                </Text>

                <View style={styles.qtyBox}>
                  <TouchableOpacity
                    style={styles.qtyStepBtn}
                    onPress={() =>
                      onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    <Text style={styles.qtyStepText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNumber}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyStepBtn}
                    onPress={() =>
                      onUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Text style={styles.qtyStepText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* VÙNG 2: Thanh tổng tiền + Nút 'Thanh toán' cố định KHÔNG cuộn (ngay trên Tab Bar) */}
      <View style={styles.checkoutBar}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
          <Text style={styles.totalAmount}>{formatVND(totalPrice)}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={items.length === 0}
          style={[
            styles.checkoutBtn,
            items.length === 0 && styles.checkoutBtnDisabled,
          ]}
          onPress={onCheckout}
        >
          <Text style={styles.checkoutBtnText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 56,
    backgroundColor: '#1A237E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  headerCount: {
    color: '#9FA8DA',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1, // Vùng cuộn ở giữa chiếm trọn không gian còn lại
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  cartRow: {
    flexDirection: 'row', // Hàng ngang: ảnh - tên - số lượng & giá
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  bookThumb: {
    width: 60,
    height: 85,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  titleColumn: {
    flex: 1, // Chiếm phần không gian còn lại giữa ảnh và cụm giá
    marginHorizontal: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 4,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 19,
  },
  unitPrice: {
    fontSize: 12,
    color: '#64748B',
  },
  removeBtn: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  removeText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
  },
  actionColumn: {
    width: 95, // Chiều rộng cố định cho cụm số lượng và tổng dòng
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#DC2626',
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    padding: 2,
  },
  qtyStepBtn: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  qtyStepText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  qtyNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: '#94A3B8',
  },
  // Vùng 2: Thanh tổng tiền cố định, nằm ngay trên tab bar
  checkoutBar: {
    height: 72,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  totalInfo: {
    flexDirection: 'column',
  },
  totalLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#DC2626',
  },
  checkoutBtn: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
