import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/bookstore/Header';
import { CategoryChips } from '@/components/bookstore/CategoryChips';
import { BookGrid } from '@/components/bookstore/BookGrid';
import { FloatingCartButton } from '@/components/bookstore/FloatingCartButton';
import { BOOKS, CATEGORIES, Book } from '@/data/bookstore';

interface HomeScreenProps {
  onBookPress?: (book: Book) => void;
  onCartPress?: () => void;
  cartCount?: number;
}

/**
 * Giờ 4 — Bài tập 1: Màn hình Trang chủ BookStore hoàn chỉnh
 * - Cấu trúc:
 *   SafeAreaView (flex: 1)
 *     > Header (cố định, không nằm trong ScrollView)
 *     > ScrollView (flex: 1, chứa Category Chips + Book Grid)
 *     > Floating Cart Button (absolute, cùng cấp ngoài ScrollView)
 * - contentContainerStyle có paddingBottom lớn để không bị nút nổi che
 */
export const HomeScreen: React.FC<HomeScreenProps> = ({
  onBookPress,
  onCartPress,
  cartCount = 4,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [columns, setColumns] = useState<2 | 3>(2);

  const allCategories = ['Tất cả', ...CATEGORIES];

  const filteredBooks =
    selectedCategory === 'Tất cả'
      ? BOOKS
      : BOOKS.filter((b) => b.category === selectedCategory);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* 1. Header cố định ngoài ScrollView */}
      <Header
        title="BookStore Online"
        cartCount={cartCount}
        onCartPress={onCartPress}
      />

      {/* 2. Vùng cuộn ScrollView (flex: 1) */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner giới thiệu ngắn */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoTag}>ƯU ĐÃI THÁNG 9</Text>
          <Text style={styles.promoTitle}>Sách Hay Giảm Tới 20%</Text>
          <Text style={styles.promoSub}>Miễn phí vận chuyển toàn quốc cho đơn từ 200.000đ</Text>
        </View>

        {/* Thanh chọn số cột (chuyển đổi 2 cột / 3 cột của Giờ 2 Thử thách) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Danh mục sách</Text>
          <View style={styles.gridModeToggle}>
            <Text
              style={[
                styles.gridToggleText,
                columns === 2 && styles.gridToggleActive,
              ]}
              onPress={() => setColumns(2)}
            >
              2 Cột
            </Text>
            <Text style={styles.gridToggleSep}>|</Text>
            <Text
              style={[
                styles.gridToggleText,
                columns === 3 && styles.gridToggleActive,
              ]}
              onPress={() => setColumns(3)}
            >
              3 Cột
            </Text>
          </View>
        </View>

        {/* Giờ 2 — BT1: Category Chips dạng pill tự xuống dòng */}
        <CategoryChips
          categories={allCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Tiêu đề danh sách sách */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Sách nổi bật ({filteredBooks.length})
          </Text>
          <Text style={styles.sectionSubLink}>Xem thêm ›</Text>
        </View>

        {/* Giờ 2 BT2 & Giờ 3 BT1: Book Grid 2 hoặc 3 cột kèm Discount Badge */}
        <BookGrid
          books={filteredBooks}
          columns={columns}
          onBookPress={onBookPress}
          showBadge={true}
        />
      </ScrollView>

      {/* 3. Giờ 3 — BT2: Nút giỏ hàng nổi absolute cùng cấp với ScrollView */}
      <FloatingCartButton
        itemCount={cartCount}
        onPress={onCartPress}
        bottomOffset={20}
        rightOffset={18}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Chiếm toàn bộ màn hình
    backgroundColor: '#F5F5FA',
    position: 'relative', // Làm containing block cho FloatingCartButton
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90, // Chừa khoảng trống rộng ở đáy để nút giỏ hàng nổi không che nội dung
  },
  promoBanner: {
    backgroundColor: '#1E3A8A',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  promoTag: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  promoSub: {
    color: '#CBD5E1',
    fontSize: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionSubLink: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '600',
  },
  gridModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gridToggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  gridToggleActive: {
    color: '#1E3A8A',
    fontWeight: '800',
  },
  gridToggleSep: {
    color: '#94A3B8',
    fontSize: 11,
  },
});
