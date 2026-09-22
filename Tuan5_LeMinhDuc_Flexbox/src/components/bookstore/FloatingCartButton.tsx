import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FloatingCartButtonProps {
  itemCount?: number;
  onPress?: () => void;
  bottomOffset?: number;
  rightOffset?: number;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  itemCount = 4,
  onPress,
  bottomOffset = 24,
  rightOffset = 20,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.floatingButton,
        { bottom: bottomOffset, right: rightOffset },
      ]}
    >
      <Text style={styles.buttonIcon}>🛒</Text>
      <Text style={styles.buttonLabel}>Giỏ</Text>

      {/* Badge số lượng: absolute đặt tại góc trên-phải của nút tròn */}
      {itemCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const BUTTON_SIZE = 60;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute", // Thoát khỏi luồng ScrollView, định vị theo màn hình
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2, // Tạo hình tròn hoàn hảo
    backgroundColor: "#304FFE", // Xanh indigo nổi bật
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Hiệu ứng đổ bóng mạnh trên Android
    shadowColor: "#000", // Đổ bóng trên iOS/Web
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 999, // Đảm bảo luôn nằm trên cùng nội dung cuộn
  },
  buttonIcon: {
    fontSize: 22,
    marginBottom: -2,
  },
  buttonLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#D32F2F",
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    elevation: 9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
});
