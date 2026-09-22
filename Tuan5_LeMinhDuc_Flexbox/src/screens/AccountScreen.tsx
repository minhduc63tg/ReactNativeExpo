import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AccountScreenProps {
  onOpenLabGuide?: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ onOpenLabGuide }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản người dùng</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>LĐ</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Lê Minh Đức</Text>
            <Text style={styles.userRole}>Học viên React Native - Tuần 5</Text>
            <Text style={styles.userEmail}>minhduc@bookstore.vn</Text>
          </View>
        </View>

        {/* Khối quản lý bài tập Flexbox */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>BÀI TẬP & ĐÁNH GIÁ</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={onOpenLabGuide}
          >
            <Text style={styles.menuIcon}>📋</Text>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuItemTitle}>Xem chi tiết Bài tập Giờ 1 - Giờ 5</Text>
              <Text style={styles.menuItemSub}>Kiểm tra tiêu chí Flexbox từng giờ học</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <Text style={styles.menuIcon}>📐</Text>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuItemTitle}>Flexbox Checklist</Text>
              <Text style={styles.menuItemSub}>flexDirection, wrap, absolute, ScrollView</Text>
            </View>
            <Text style={styles.checkDone}>100% Đạt</Text>
          </View>
        </View>

        {/* Cài đặt chung */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>CÀI ĐẶT</Text>
          <View style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔔</Text>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuItemTitle}>Thông báo ưu đãi</Text>
            </View>
            <Text style={styles.statusActive}>Bật</Text>
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuIcon}>🛡️</Text>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuItemTitle}>Chính sách & Bảo mật</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </View>
        </View>
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
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A237E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#64748B',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuTextCol: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  menuItemSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#CBD5E1',
  },
  checkDone: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusActive: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B82F6',
  },
});
