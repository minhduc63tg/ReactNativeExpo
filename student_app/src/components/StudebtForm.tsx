import { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";

interface StudentFormProps {
  onAdd: (name: string, studentId: string, major: string) => void;
}

export const StudentForm = ({ onAdd }: StudentFormProps) => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");

  const handleAdd = () => {
    if (!name || !studentId || !major) {
      return;
    }
    onAdd(name, studentId, major);

    setName("");
    setStudentId("");
    setMajor("");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Nhap ten"
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        value={studentId}
        placeholder="MSSV"
        onChangeText={setStudentId}
      />

      <TextInput
        style={styles.input}
        value={major}
        placeholder="Ngành học"
        onChangeText={setMajor}
      />

      <Button title="Thêm" onPress={handleAdd}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
