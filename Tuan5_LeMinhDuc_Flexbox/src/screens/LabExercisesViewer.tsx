import { BookCardRow } from '@/components/bookstore/BookCardRow';
import { BookGrid } from '@/components/bookstore/BookGrid';
import { BottomTabBar, TabKey } from '@/components/bookstore/BottomTabBar';
import { CategoryChips } from '@/components/bookstore/CategoryChips';
import { FloatingCartButton } from '@/components/bookstore/FloatingCartButton';
import { Header } from '@/components/bookstore/Header';
import { Book, BOOKS, CATEGORIES } from '@/data/bookstore';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LabExercisesViewerProps {
  onSelectBook?: (book: Book) => void;
  onOpenAppHome?: () => void;
}

export const LabExercisesViewer: React.FC<LabExercisesViewerProps> = ({
  onSelectBook,
  onOpenAppHome,
}) => {
  const [selectedHour, setSelectedHour] = useState<number>(1);
  const [cardAlignMode, setCardAlignMode] = useState<'flex-start' | 'center'>('flex-start');
  const [gridColumns, setGridColumns] = useState<2 | 3>(2);
  const [activeTabDemo, setActiveTabDemo] = useState<TabKey>('home');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Thanh chọn giờ thực hành (Giờ 1 -> Giờ 5) */}
      <View style={styles.hourSelectorBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hourList}>
          {[1, 2, 3, 4, 5].map((hour) => {
            const isSelected = selectedHour === hour;
            return (
              <TouchableOpacity
                key={hour}
                onPress={() => setSelectedHour(hour)}
                style={[styles.hourPill, isSelected && styles.hourPillActive]}
              >
                <Text style={[styles.hourPillText, isSelected && styles.hourPillTextActive]}>
                  Giờ {hour}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.contentScroll} contentContainerStyle={styles.scrollContainer}>
        {/* ======================= GIỜ 1 ======================= */}
        {selectedHour === 1 && (
          <View style={styles.sectionWrapper}>
            <View style={styles.theoryBox}>
              <Text style={styles.theoryTitle}>Giờ 1: Nền tảng Flexbox & Layout đơn giản</Text>

            </View>

            {/* Bài tập 1 */}
            <View style={styles.cardBox}>
              <Text style={styles.exerciseBadge}>BÀI TẬP 1: HEADER CỐ ĐỊNH</Text>
              <Header title="BookStore" cartCount={3} />
            </View>

            {/* Bài tập 2 */}
            <View style={styles.cardBox}>
              <View style={styles.exerciseHeaderRow}>
                <Text style={styles.exerciseBadge}>BÀI TẬP 2: THẺ SÁCH (BOOK CARD) ĐƠN</Text>
                <TouchableOpacity
                  onPress={() =>
                    setCardAlignMode(cardAlignMode === 'flex-start' ? 'center' : 'flex-start')
                  }
                  style={styles.toggleBtn}
                >
                  <Text style={styles.toggleBtnText}>
                    alignItems: {cardAlignMode}
                  </Text>
                </TouchableOpacity>
              </View>
              <BookCardRow
                book={BOOKS[0]}
                alignMode={cardAlignMode}
                onPress={onSelectBook}
              />
            </View>

            {/* Thử thách Giờ 1 */}
            <View style={styles.cardBox}>
              <Text style={styles.exerciseBadge}>THỬ THÁCH GIỜ 1: DANH SÁCH SÁCH XẾP CHỒNG (FLEX: 1)</Text>
              {BOOKS.slice(0, 4).map((book) => (
                <BookCardRow
                  key={book.id}
                  book={book}
                  alignMode={cardAlignMode}
                  onPress={onSelectBook}
                />
              ))}
            </View>
          </View>
        )}

        {/* ======================= GIỜ 2 ======================= */}
        {selectedHour === 2 && (
          <View style={styles.sectionWrapper}>
            <View style={styles.theoryBox}>
              <Text style={styles.theoryTitle}>Giờ 2: Kích thước, Wrap và Lưới sản phẩm (Grid)</Text>

            </View>

            {/* Bài tập 1 */}
            <View style={styles.cardBox}>
              <Text style={styles.exerciseBadge}>BÀI TẬP 1: CATEGORY CHIPS (PILL, FLEXWRAP, GAP: 8)</Text>
              <CategoryChips categories={CATEGORIES} />
            </View>

            {/* Bài tập 2 & Thử thách */}
            <View style={styles.cardBox}>
              <View style={styles.exerciseHeaderRow}>
                <Text style={styles.exerciseBadge}>
                  {gridColumns === 2
                    ? 'BÀI TẬP 2: LƯỚI SẢN PHẨM 2 CỘT'
                    : 'THỬ THÁCH GIỜ 2: LƯỚI 3 CỘT VỚI GAP'}
                </Text>
                <TouchableOpacity
                  onPress={() => setGridColumns(gridColumns === 2 ? 3 : 2)}
                  style={styles.toggleBtn}
                >
                  <Text style={styles.toggleBtnText}>
                    Chuyển sang {gridColumns === 2 ? '3 cột' : '2 cột'}
                  </Text>
                </TouchableOpacity>
              </View>
              <BookGrid
                books={BOOKS}
                columns={gridColumns}
                onBookPress={onSelectBook}
                showBadge={false}
              />
            </View>
          </View>
        )}

        {/* ======================= GIỜ 3 ======================= */}
        {selectedHour === 3 && (
          <View style={styles.sectionWrapper}>
            <View style={styles.theoryBox}>
              <Text style={styles.theoryTitle}>Giờ 3: Position, AlignSelf & Lớp phủ (Overlay)</Text>

            </View>

            {/* Bài tập 1 */}
            <View style={styles.cardBox}>
              <Text style={styles.exerciseBadge}>BÀI TẬP 1: BADGE GIẢM GIÁ TRÊN BÌA SÁCH</Text>
              <BookGrid
                books={BOOKS.slice(0, 2)}
                columns={2}
                onBookPress={onSelectBook}
                showBadge={true}
              />
            </View>

            {/* Bài tập 2 */}
            <View style={[styles.cardBox, { minHeight: 180, position: 'relative' }]}>
              <Text style={styles.exerciseBadge}>BÀI TẬP 2: NÚT GIỎ HÀNG NỔI (FLOATING CART)</Text>
              <Text style={styles.miniNote}>
                Nút tròn nổi định vị absolute ở góc dưới phải của khung demo này:
              </Text>
              <FloatingCartButton
                itemCount={5}
                bottomOffset={16}
                rightOffset={16}
              />
            </View>

            {/* Thử thách Giờ 3 */}
            <View style={styles.cardBox}>
              <Text style={styles.exerciseBadge}>THỬ THÁCH GIỜ 3: LƯỚI SÁCH KÈM BADGE & NÚT NỔI</Text>
              <BookGrid
                books={BOOKS.slice(0, 4)}
                columns={2}
                onBookPress={onSelectBook}
                showBadge={true}
              />
            </View>
          </View>
        )}

        {/* ======================= GIỜ 4 ======================= */}
        {selectedHour === 4 && (
          <View style={styles.sectionWrapper}>
            <View style={styles.theoryBox}>
              <Text style={styles.theoryTitle}>Giờ 4: Layout Toàn màn hình (ScrollView & SafeAreaView)</Text>

            </View>

            <View style={styles.cardBox}>
              <Text style={styles.exerciseBadge}>BÀI TẬP 1 & 2: MÀN HÌNH HOÀN CHỈNH</Text>
              <Text style={styles.miniNote}>
                Màn hình Home và Chi tiết sách được ghép hoàn chỉnh trong ứng dụng chính.
              </Text>
              <TouchableOpacity
                onPress={onOpenAppHome}
                style={styles.openAppBtn}
              >
                <Text style={styles.openAppBtnText}>🚀 Mở Màn hình Trang Chủ (Giờ 4 BT1)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSelectBook && onSelectBook(BOOKS[0])}
                style={[styles.openAppBtn, { backgroundColor: '#4338CA', marginTop: 10 }]}
              >
                <Text style={styles.openAppBtnText}>📖 Xem Màn hình Chi tiết sách (Giờ 4 BT2)</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ======================= GIỜ 5 ======================= */}
        {selectedHour === 5 && (
          <View style={styles.sectionWrapper}>
            <View style={styles.theoryBox}>
              <Text style={styles.theoryTitle}>Giờ 5: Bottom Tab Layout & Hoàn thiện ứng dụng</Text>

            </View>

            {/* Bài tập 1 */}
            <View style={styles.cardBox}>
              <Text style={styles.exerciseBadge}>BÀI TẬP 1: THANH TAB BAR TĨNH (4 MỤC CHIA ĐỀU FLEX: 1)</Text>
              <View style={styles.tabBarDemoWrapper}>
                <BottomTabBar
                  activeTab={activeTabDemo}
                  onTabChange={(tab) => setActiveTabDemo(tab)}
                  cartCount={3}
                />
              </View>
            </View>

            {/* Bài tập 2 & Thử thách Part_01 */}
            <View style={styles.cardBox}>
              <Text style={styles.exerciseBadge}>BÀI TẬP 2 & THỬ THÁCH PART_01: TỔNG HỢP TOÀN BỘ</Text>
              <TouchableOpacity
                onPress={onOpenAppHome}
                style={styles.openAppBtn}
              >
                <Text style={styles.openAppBtnText}>🌟 Trải nghiệm Full App (Part_01 Challenge)</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  hourSelectorBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  hourList: {
    paddingHorizontal: 14,
    gap: 8,
  },
  hourPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  hourPillActive: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  hourPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  hourPillTextActive: {
    color: '#FFFFFF',
  },
  contentScroll: {
    flex: 1,
  },
  scrollContainer: {
    padding: 14,
    paddingBottom: 40,
  },
  sectionWrapper: {
    gap: 14,
  },
  theoryBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  theoryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 6,
  },
  theoryDesc: {
    fontSize: 12.5,
    color: '#334155',
    lineHeight: 18,
  },
  cardBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  exerciseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  toggleBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  toggleBtnText: {
    fontSize: 11,
    color: '#1E3A8A',
    fontWeight: '700',
  },
  miniNote: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 10,
  },
  tabBarDemoWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginTop: 6,
  },
  openAppBtn: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  openAppBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
