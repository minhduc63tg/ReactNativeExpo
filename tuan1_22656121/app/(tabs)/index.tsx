import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  Pressable,
} from 'react-native';
import { ActionButton } from '@/components/ActionButton';
import { InfoCard } from '@/components/InfoCard';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    Alert.alert('Thành công', 'Hồ sơ đã được lưu trữ!');
    setIsSaved(true);
  };

  const handleAvatarPress = () => {
    Alert.alert('Avatar', 'Chạm vào ảnh đại diện');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header SmartCampus */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SmartCampus</Text>
        </View>

        <View style={styles.body}>
          {/* Avatar & Thông tin cơ bản (Pressable thứ 1) */}
          <View style={styles.profileRow}>
            <Pressable
              onPress={handleAvatarPress}
              accessibilityRole="imagebutton"
              accessibilityLabel="Ảnh đại diện sinh viên"
              hitSlop={8}
              style={({ pressed }) => [
                styles.avatarWrapper,
                pressed && styles.avatarPressed,
              ]}
            >
              {/* Dùng Text giả lập Avatar hoặc thay bằng Image nếu có ảnh */}
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>SV</Text>
              </View>
            </Pressable>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Le Minh Duc</Text>
              <Text style={styles.profileId}>Mã SV: 22656121</Text>
            </View>
          </View>

          {/* Ô tìm kiếm */}
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Tìm kiếm thông tin..."
            placeholderTextColor="#94A3B8"
            accessibilityLabel="Ô nhập tìm kiếm thông tin"
          />

          {/* Khối thông tin chi tiết */}
          <InfoCard
            title="Thông tin sinh viên"
            email="minhanh@sv.edu.vn"
            className="CNTT-K24"
          />

          {/* Nút hành động Lưu hồ sơ (Pressable thứ 2) */}
          <ActionButton
            title={isSaved ? "ĐÃ LƯU HỒ SƠ" : "LƯU HỒ SƠ"}
            onPress={handleSave}
            disabled={isSaved}
            style={styles.actionBtn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    backgroundColor: '#0072CE',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  body: {
    padding: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  avatarWrapper: {
    borderRadius: 36,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: '#0072CE',
    backgroundColor: '#E8F1FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0072CE',
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  profileId: {
    fontSize: 14,
    color: '#64748B',
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#F8FAFC',
    marginBottom: 12,
  },
  actionBtn: {
    marginTop: 12,
  },
});