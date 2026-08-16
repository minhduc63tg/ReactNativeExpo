import { useState } from "react";
import { View, TextInput, Button } from "react-native";

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [title, setTitle] = useState("");
  const handleAdd = () => {
    if (title.trim() === "") {
      return;
    }
    onAdd(title);
    setTitle("");
  };

  return (
    <View>
      <TextInput
        value={title}
        placeholder="Nhập task..."
        onChangeText={setTitle}
      ></TextInput>
      <Button title="Thêm" onPress={handleAdd}></Button>
    </View>
  );
};
