import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";

export function Lab2A_Wireframe() {
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState("");
  const isWide = width >= 720;

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* 1. Header Bar */}
        <View style={styles.header}>
          <Text accessibilityRole="header" style={styles.headerTitle}>
            SmartCampus Dashboard
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Mở thông báo"
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.iconText}>🔔</Text>
          </Pressable>
        </View>

        {/* 2. Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Tìm kiếm khoá học, tin tức..."
            placeholderTextColor={theme.colors.textSecondary}
            accessibilityRole="search"
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Xóa tìm kiếm"
              hitSlop={8}
              onPress={() => setSearch("")}
              style={styles.clearBtn}
            >
              <Text style={styles.clearBtnText}>×</Text>
            </Pressable>
          )}
        </View>

        {/* Responsive Grid/Column Layout */}
        <View style={[styles.mainLayout, isWide && styles.mainLayoutWide]}>
          {/* 3. Featured Course Card */}
          <View style={[styles.card, isWide && styles.wideColumn]}>
            <Image
              source={{ uri: "https://picsum.photos/400/200" }}
              style={styles.cardImage}
              resizeMode="cover"
              accessibilityLabel="Hình ảnh minh họa khóa học Lập trình di động"
            />
            <View style={styles.cardBody}>
              <Text style={styles.cardTag}>NỔI BẬT</Text>
              <Text style={styles.cardTitle}>
                Lập trình ứng dụng di động React Native
              </Text>
              <Text numberOfLines={2} style={styles.cardDesc}>
                Khóa học cung cấp kiến thức nền tảng về UI components, Layout,
                Form và FlatList.
              </Text>
            </View>
          </View>

          {/* 4. Action Area */}
          <View style={[styles.actionSection, isWide && styles.wideColumn]}>
            <Text accessibilityRole="header" style={styles.sectionHeader}>
              Tác vụ nhanh
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Đăng ký môn học mới"
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Đăng ký môn học</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.md, gap: theme.spacing.md },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: theme.colors.text },
  iconButton: {
    minWidth: 48,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.full,
  },
  iconText: { fontSize: 20 },
  pressed: { opacity: 0.7, backgroundColor: theme.colors.pressed },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    minHeight: 48,
    color: theme.colors.text,
    fontSize: 16,
  },
  clearBtn: {
    minWidth: 32,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtnText: { fontSize: 20, color: theme.colors.textSecondary },
  mainLayout: { gap: theme.spacing.md },
  mainLayoutWide: { flexDirection: "row", alignItems: "flex-start" },
  wideColumn: { flex: 1 },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardImage: { width: "100%", height: 160 },
  cardBody: { padding: theme.spacing.md, gap: theme.spacing.xs },
  cardTag: { fontSize: 12, fontWeight: "bold", color: theme.colors.primary },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: theme.colors.text },
  cardDesc: { fontSize: 14, color: theme.colors.textSecondary },
  actionSection: { gap: theme.spacing.sm },
  sectionHeader: { fontSize: 16, fontWeight: "bold", color: theme.colors.text },
  primaryButton: {
    minHeight: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
  },
  buttonPressed: { opacity: 0.85 },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
