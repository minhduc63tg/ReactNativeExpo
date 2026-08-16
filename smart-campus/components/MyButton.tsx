import { View, Text } from "react-native";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <View>
      <Text>{title}</Text>
      {children}
    </View>
  );
};
