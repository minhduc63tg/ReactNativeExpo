import { Pressable, View, Text } from "react-native";

interface TodoItemProps {
  title: string;
  completed: boolean;
  onPress: () => void;
}

export const TodoItem = ({ title, completed, onPress }: TodoItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Text>{title}</Text>
        <Text>{completed ? "Hòa thành" : "Chưa xong"}</Text>
      </View>
    </Pressable>
  );
};
