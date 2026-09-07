import React, {
  useReducer,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ThemeProvider, useThemeMode } from "../context/ThemeContext";
import { Todo, TodoItem } from "../components/TodoItem";
import { TodoInput } from "../components/TodoInput";
import { TodoSearch } from "../components/TodoSearch";

// 1. Reducer quản lý trạng thái mảng Todo
type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [
        { id: Date.now().toString(), title: action.payload, completed: false },
        ...state,
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

// 2. Màn hình Todo chính
function TodoScreen() {
  const { isDarkMode, toggleTheme } = useThemeMode();

  // useReducer
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: "1", title: "Học React Native Hooks", completed: false },
    { id: "2", title: "Tách Component bài thực hành", completed: true },
  ]);

  // useState
  const [keyword, setKeyword] = useState("");

  // useEffect: Giám sát số lượng công việc
  useEffect(() => {
    console.log(`Danh sách hiện có ${todos.length} công việc`);
  }, [todos.length]);

  // useCallback: Giữ nguyên tham chiếu hàm truyền cho TodoItem
  const handleToggle = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }, []);

  const handleDelete = useCallback((id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  }, []);

  const handleAdd = (title: string) => {
    dispatch({ type: "ADD_TODO", payload: title });
  };

  // useMemo: Lọc danh sách theo từ khóa tìm kiếm
  const filteredTodos = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    return todos.filter((item) => item.title.toLowerCase().includes(term));
  }, [todos, keyword]);

  // useMemo: Đếm số việc chưa hoàn thành
  const pendingCount = useMemo(() => {
    return todos.filter((item) => !item.completed).length;
  }, [todos]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDarkMode ? "#1c1c1e" : "#ffffff" },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles.container}>
        {/* Tiêu đề & Đổi Theme */}
        <View style={styles.header}>
          <Text
            style={[
              styles.headerTitle,
              { color: isDarkMode ? "#fff" : "#000" },
            ]}
          >
            Quản Lý Công Việc
          </Text>
          <TouchableOpacity style={styles.themeBtn} onPress={toggleTheme}>
            <Text style={styles.themeBtnText}>
              {isDarkMode ? "☀ Sáng" : "🌙 Tối"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Số việc chưa hoàn thành */}
        <Text
          style={[styles.subTitle, { color: isDarkMode ? "#aaa" : "#666" }]}
        >
          Chưa hoàn thành: {pendingCount} việc
        </Text>

        {/* Tìm kiếm */}
        <TodoSearch keyword={keyword} onSearch={setKeyword} />

        {/* Thêm mới */}
        <TodoInput onAdd={handleAdd} />

        {/* Danh sách */}
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không tìm thấy công việc nào</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

// 3. Export Root bọc ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <TodoScreen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  themeBtn: {
    backgroundColor: "#007aff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  themeBtnText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#8e8e93",
    marginTop: 24,
  },
});
