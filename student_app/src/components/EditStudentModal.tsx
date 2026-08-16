import { Student } from "@/types/student";
import { useEffect, useState } from "react";
import { Button, Modal, Text, TextInput, View, StyleSheet } from "react-native";

interface EditStudentModalProps {
  visible: boolean;
  student: Student | null;
  onClosed: () => void;
  onSave: (student: Student) => void;
}
export const EditStudentModal = ({
  visible,
  student,
  onClosed,
  onSave,
}: EditStudentModalProps) => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name);
      setMajor(student.major);
      setStudentId(student.studentId);
    }
  }, [student]);

  const handleSave = () => {
    if (!student) return;
    const updatedStudent: Student = {
      ...student,
      name,
      studentId,
      major,
    };

    onSave(updatedStudent);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Chỉnh sửa sinh viên</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhap ten"
          ></TextInput>

          <TextInput
            style={styles.input}
            value={studentId}
            onChangeText={setStudentId}
            placeholder="Nhập mssv"
          ></TextInput>

          <TextInput
            style={styles.input}
            value={major}
            onChangeText={setMajor}
            placeholder="Nhập ngành"
          ></TextInput>
        </View>

        <View style={styles.buttons}>
          <Button title="Lưu" onPress={handleSave} />
          <Button title="Đóng" onPress={onClosed}></Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },

  modal: {
    backgroundColor: "violet",
    padding: 20,
    borderRadius: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 12,
  },
});
