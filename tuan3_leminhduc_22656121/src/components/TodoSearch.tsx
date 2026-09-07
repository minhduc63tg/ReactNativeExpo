import { useThemeMode } from "@/context/ThemeContext";
import { StyleSheet, TextInput } from "react-native";

interface TodoSearchProps {
  keyword: string;
  onSearch: (value: string) => void;
}

export function TodoSearch({ keyword, onSearch }: TodoSearchProps) {
  const { isDarkMode } = useThemeMode();

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: isDarkMode ? "#2c2c2e" : "#e5e5ea",
          color: isDarkMode ? "#ffffff" : "#000000",
        },
      ]}
      placeholder="🔍 Tìm kiếm công việc..."
      placeholderTextColor={isDarkMode ? "#888" : "#999"}
      value={keyword}
      onChangeText={onSearch}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    marginBottom: 12,
  },
});
