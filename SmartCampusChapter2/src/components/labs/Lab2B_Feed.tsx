import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";

// 1. Data Model
export interface Announcement {
  id: string;
  title: string;
  summary: string;
  category: "academic" | "event" | "service";
  publishedAt: string;
}

const MOCK_DATA: Announcement[] = [
  {
    id: "1",
    title: "Lịch thi học kỳ 2",
    summary: "Sinh viên kiểm tra lịch thi chính thức trên cổng thông tin.",
    category: "academic",
    publishedAt: "2026-08-10",
  },
  {
    id: "2",
    title: "Hội thảo Công nghệ AI",
    summary: "Diễn đàn chia sẻ về các mô hình ngôn ngữ lớn tại Hội trường A.",
    category: "event",
    publishedAt: "2026-08-12",
  },
  {
    id: "3",
    title: "Bảo trì hệ thống thư viện",
    summary: "Thư viện số tạm ngưng phục vụ từ 22:00 ngày 15/08.",
    category: "service",
    publishedAt: "2026-08-14",
  },
  {
    id: "4",
    title: "Đăng ký đề tài tốt nghiệp",
    summary: "Hạn chót nộp phiếu đăng ký đề tài về văn phòng khoa.",
    category: "academic",
    publishedAt: "2026-08-15",
  },
  {
    id: "5",
    title: "Giải bóng đá truyền thống",
    summary: "Lễ khai mạc diễn ra tại sân vận động trường.",
    category: "event",
    publishedAt: "2026-08-16",
  },
];

type FeedState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: Announcement[] };

export function Lab2B_Feed() {
  const [feedState, setFeedState] = useState<FeedState>({ status: "loading" });
  const [query, setQuery] = useState("");

  // Giả lập load dữ liệu từ API
  const loadData = (shouldFail = false) => {
    setFeedState({ status: "loading" });
    setTimeout(() => {
      if (shouldFail) {
        setFeedState({
          status: "error",
          message: "Không thể tải thông báo. Vui lòng thử lại.",
        });
      } else {
        setFeedState({ status: "ready", data: MOCK_DATA });
      }
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Lọc kết quả tìm kiếm
  const filteredData =
    feedState.status === "ready"
      ? feedState.data.filter((item) =>
          `${item.title} ${item.summary} ${item.category}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
      : [];

  const renderItem: ListRenderItem<Announcement> = ({ item }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, phân loại: ${item.category}`}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={() => alert(`Mở: ${item.title}`)}
    >
      <View style={styles.rowContent}>
        <Text style={styles.badge}>{item.category.toUpperCase()}</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.itemSummary}>
          {item.summary}
        </Text>
      </View>
      <Text style={styles.itemDate}>{item.publishedAt}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Header controls để giả lập kiểm thử trạng thái */}
      <View style={styles.testControls}>
        <Pressable style={styles.btnSmall} onPress={() => loadData(false)}>
          <Text style={styles.btnSmallText}>Load Success</Text>
        </Pressable>
        <Pressable
          style={[styles.btnSmall, styles.btnError]}
          onPress={() => loadData(true)}
        >
          <Text style={styles.btnSmallText}>Simulate Error</Text>
        </Pressable>
      </View>

      {/* Giao diện theo trạng thái */}
      {feedState.status === "loading" && (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.statusText}>Đang tải thông báo...</Text>
        </View>
      )}

      {feedState.status === "error" && (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>⚠️ {feedState.message}</Text>
          <Pressable style={styles.retryButton} onPress={() => loadData(false)}>
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </Pressable>
        </View>
      )}

      {feedState.status === "ready" && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text accessibilityRole="header" style={styles.screenTitle}>
                Bảng tin sinh viên
              </Text>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Tìm tiêu đề, tóm tắt..."
                accessibilityRole="search"
                style={styles.searchInput}
              />
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                {query.trim().length > 0
                  ? `Không tìm thấy thông báo nào khớp với "${query}".`
                  : "Hiện chưa có thông báo nào."}
              </Text>
              {query.trim().length > 0 && (
                <Pressable
                  onPress={() => setQuery("")}
                  style={styles.clearQueryBtn}
                >
                  <Text style={styles.clearQueryText}>Xóa bộ lọc</Text>
                </Pressable>
              )}
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  testControls: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: "#e3f2fd",
  },
  btnSmall: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
  },
  btnError: { backgroundColor: theme.colors.error },
  btnSmallText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  listContainer: { padding: theme.spacing.md, flexGrow: 1 },
  listHeader: { gap: theme.spacing.sm, marginBottom: theme.spacing.md },
  screenTitle: { fontSize: 24, fontWeight: "bold", color: theme.colors.text },
  searchInput: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  row: {
    flexDirection: "row",
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  rowPressed: { backgroundColor: theme.colors.pressed },
  rowContent: { flex: 1, gap: 4, minWidth: 0 },
  badge: { fontSize: 10, fontWeight: "bold", color: theme.colors.primary },
  itemTitle: { fontSize: 16, fontWeight: "bold", color: theme.colors.text },
  itemSummary: { fontSize: 14, color: theme.colors.textSecondary },
  itemDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  divider: { height: 8 },
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  statusText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    minHeight: 48,
    minWidth: 120,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.md,
  },
  retryButtonText: { color: "#fff", fontWeight: "bold" },
  emptyBox: {
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  clearQueryBtn: { padding: theme.spacing.sm },
  clearQueryText: { color: theme.colors.primary, fontWeight: "bold" },
});
