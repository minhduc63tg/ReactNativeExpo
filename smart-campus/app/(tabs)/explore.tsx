import { useState } from "react";
import { View, Text, FlatList } from "react-native";

import { TodoInput } from "@/components/TodoInput";
import { TodoItem } from "@/components/TodoItemtsx";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export default function Explore() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "TV1",
      completed: true,
    },
    { id: 2, title: "Math", completed: false },
  ]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTodos((pre) => [...pre, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos((curentTodo) =>
      curentTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <View>
      <Text>Todo app</Text>
      <TodoInput onAdd={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            title={item.title}
            completed={item.completed}
            onPress={() => toggleTodo(item.id)}
          />
        )}
      />
    </View>
  );
}
