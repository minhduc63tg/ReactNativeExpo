import React from "react";
import { View, Text, StyleSheet } from "react-native";

// export interface InfoRowProps {
//   label: string;
//   value: string;
// }

// export const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>{label}:</Text>
//       <Text style={styles.value}>{value}</Text>
//     </View>
//   );
// };

export interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333333",
    marginRight: 8,
  },
  value: {
    flex: 1,
    fontSize: 15,
    color: "#555555",
  },
});
