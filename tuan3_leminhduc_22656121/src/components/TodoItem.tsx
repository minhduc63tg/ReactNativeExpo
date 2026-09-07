import { useThemeMode } from "@/context/ThemeContext";
import { memo } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = memo(function TodoItem({
  item,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const { isDarkMode } = useThemeMode();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#2c2c2e" : "#f2f2f7" },
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={() => onToggle(item.id)}
      >
        <Text
          style={[
            styles.checkbox,
            { color: item.completed ? "#34c759" : "#8e8e93" },
          ]}
        >
          {item.completed ? "☑" : "☐"}
        </Text>

        <Text
          style={[
            styles.title,
            { color: isDarkMode ? "#ffffff" : "#000000" },
            item.completed && styles.completedTitle,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    fontSize: 18,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#8e8e93",
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
