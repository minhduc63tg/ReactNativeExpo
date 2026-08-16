import { EditStudentModal } from "@/components/EditStudentModal";
import { StudentForm } from "@/components/StudebtForm";
import { StudentCard } from "@/components/StudentCard";
import { Student } from "@/types/student";
import { useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

function Explore() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      studentId: "20240001",
      major: "Công nghệ thông tin",
    },
    {
      id: 2,
      name: "Trần Văn B",
      studentId: "20240002",
      major: "Kỹ thuật phần mềm",
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addStudent = (name: string, studentId: string, major: string) => {
    const newStudent: Student = {
      id: Date.now(),
      name: name,
      studentId: studentId,
      major: major,
    };

    setStudents((currentStudents) => [...currentStudents, newStudent]);
  };

  const deleteStudent = (id: number) => {
    setStudents((currentStudent) =>
      currentStudent.filter((student) => student.id !== id),
    );
  };

  // const editStudent = (id: number) => {
  //   console.log("edit student ", id);
  // };

  const editStudent = (id: number) => {
    const student = students.find((student) => student.id === id);
    if (!student) return;
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStudent(null);
  };

  const updateStudent = (updateStudent: Student) => {
    setStudents((currentStudent) =>
      currentStudent.map((student) =>
        student.id === updateStudent.id ? updateStudent : student,
      ),
    );

    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Manager</Text>

      <StudentForm onAdd={addStudent} />

      <FlatList
        style={styles.list}
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onEdit={editStudent}
            onDelete={deleteStudent}
          />
        )}
      />

      {selectedStudent && (
        <EditStudentModal
          visible={modalVisible}
          student={selectedStudent}
          onClosed={closeModal}
          onSave={updateStudent}
        />
      )}
    </View>
  );
}
export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  list: {
    marginTop: 20,
  },
});
