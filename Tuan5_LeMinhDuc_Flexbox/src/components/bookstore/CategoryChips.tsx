import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryChipsProps {
  categories: string[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  withAlignContent?: boolean;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  withAlignContent = true,
}) => {
  return (
    <View
      style={[
        styles.chipsContainer,
        withAlignContent && styles.alignContentFlexStart,
      ]}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <TouchableOpacity
            key={cat}
            activeOpacity={0.7}
            onPress={() => onSelectCategory && onSelectCategory(cat)}
            style={[styles.chip, isSelected && styles.selectedChip]}
          >
            <Text
              style={[styles.chipText, isSelected && styles.selectedChipText]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 12,
  },
  alignContentFlexStart: {
    alignContent: "flex-start",
  },
  chip: {
    width: "auto", // Tự co giãn theo nội dung chữ
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#3F51B5",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedChip: {
    backgroundColor: "#3F51B5",
    borderColor: "#3F51B5",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3F51B5",
  },
  selectedChipText: {
    color: "#FFFFFF",
  },
});
