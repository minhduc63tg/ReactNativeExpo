import { Student } from "@/types/student";
import { Pressable, Text, View, StyleSheet } from "react-native";

interface StudentCardProps {
  student: Student;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const StudentCard = ({
  student,
  onEdit,
  onDelete,
}: StudentCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Name: {student.name}</Text>
      <Text>MSSV: {student.studentId}</Text>
      <Text>Ngành: {student.major}</Text>

      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={() => onEdit(student.id)}>
          <Text>Edit</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => onDelete(student.id)}>
          <Text>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  button: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});
