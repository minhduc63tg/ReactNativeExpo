import React, { useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  SectionList,
  StyleSheet,
  View,
} from "react-native";
import { Student, studentSections } from "@/data/students";
import { StudentRow } from "@/components/students/StudentRow";
import { StudentHeader } from "@/components/students/StudentHeader";
import { SectionHeader } from "@/components/students/SectionHeader";
import { StudentEmpty } from "@/components/students/StudentEmpty";

export default function StudentDirectoryScreen() {
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    if (!normalizedQuery) return studentSections;

    return studentSections
      .map((section) => ({
        ...section,
        data: section.data.filter((student) =>
          `${student.fullName} ${student.studentId} ${student.className}`
            .toLocaleLowerCase("vi")
            .includes(normalizedQuery)
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [query]);

  const totalStudents = useMemo(
    () =>
      filteredSections.reduce(
        (total, section) => total + section.data.length,
        0
      ),
    [filteredSections]
  );

  const openStudent = (student: Student) => {
    Alert.alert(
      student.fullName,
      `Mã sinh viên: ${student.studentId}\nLớp: ${student.className}\nTrạng thái: ${student.status}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        renderItem={({ item }) => (
          <StudentRow student={item} onPress={openStudent} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <StudentHeader
            query={query}
            onQueryChange={setQuery}
            totalStudents={totalStudents}
          />
        }
        ListEmptyComponent={<StudentEmpty query={query} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 8,
  },
});
