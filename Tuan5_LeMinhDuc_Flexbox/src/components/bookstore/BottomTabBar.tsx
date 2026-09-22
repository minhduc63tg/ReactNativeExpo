import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type TabKey = "home" | "categories" | "cart" | "account";

interface TabItemConfig {
  key: TabKey;
  label: string;
  icon: string;
  badge?: number;
}

interface BottomTabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  cartCount?: number;
  positionMode?: "relative" | "absolute";
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  cartCount = 4,
  positionMode = "relative",
}) => {
  const tabs: TabItemConfig[] = [
    { key: "home", label: "Trang chủ", icon: "🏠" },
    { key: "categories", label: "Danh mục", icon: "📑" },
    { key: "cart", label: "Giỏ hàng", icon: "🛒", badge: cartCount },
    { key: "account", label: "Tài khoản", icon: "👤" },
  ];

  return (
    <View
      style={[
        styles.tabBarContainer,
        positionMode === "absolute" && styles.tabBarAbsolute,
      ]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => onTabChange(tab.key)}
            style={styles.tabItem}
          >
            {/* Cụm Icon (có thể kèm badge) */}
            <View style={styles.iconContainer}>
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              {tab.badge && tab.badge > 0 ? (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                </View>
              ) : null}
            </View>

            {/* Chữ phía dưới */}
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.label}
            </Text>

            {/* Chỉ báo active nhỏ phía dưới */}
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 64,
    backgroundColor: "#FFFFFF",
    flexDirection: "row", // Chia đều các tab theo hàng ngang
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tabBarAbsolute: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  tabItem: {
    flex: 1, // Chia đều 4 phần bằng nhau trên hàng
    flexDirection: "column", // Icon trên, chữ dưới
    alignItems: "center", // Căn giữa trục ngang
    justifyContent: "center", // Căn giữa trục dọc
    paddingVertical: 6,
    position: "relative",
  },
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    color: "#757575",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#1A237E", // Màu nổi bật cho tab đang chọn
    fontWeight: "700",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 1,
    width: 20,
    height: 3,
    backgroundColor: "#1A237E",
    borderRadius: 2,
  },
  tabBadge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#D32F2F",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  tabBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
});
