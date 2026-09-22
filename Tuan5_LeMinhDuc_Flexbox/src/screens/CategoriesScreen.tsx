import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryChips } from '@/components/bookstore/CategoryChips';
import { BookGrid } from '@/components/bookstore/BookGrid';
import { CATEGORIES, BOOKS, Book } from '@/data/bookstore';

interface CategoriesScreenProps {
  onBookPress?: (book: Book) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  onBookPress,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('Văn học');

  const filteredBooks = BOOKS.filter((b) => b.category === selectedCat);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Khám phá theo danh mục</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Tất cả thể loại</Text>
        <CategoryChips
          categories={CATEGORIES}
          selectedCategory={selectedCat}
          onSelectCategory={(c) => setSelectedCat(c)}
        />

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            Sách thuộc nhóm: <Text style={styles.highlightText}>{selectedCat}</Text>
          </Text>
          <Text style={styles.resultsCount}>({filteredBooks.length} cuốn)</Text>
        </View>

        {filteredBooks.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Chưa có sách trong danh mục này</Text>
          </View>
        ) : (
          <BookGrid
            books={filteredBooks}
            columns={2}
            onBookPress={onBookPress}
            showBadge={true}
          />
        )}
      </ScrollView>
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
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 16,
    marginBottom: 12,
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  highlightText: {
    color: '#1A237E',
    fontWeight: '800',
  },
  resultsCount: {
    fontSize: 13,
    color: '#64748B',
  },
  emptyBox: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
  },
});
