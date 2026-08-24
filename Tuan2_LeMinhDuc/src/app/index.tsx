import React, { useMemo, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Course, courses } from "@/data/courses";
import { CourseRow } from "@/components/CourseRow";
import { CourseHeader } from "@/components/CourseHeader";
import { CourseEmpty } from "@/components/CourseEmpty";

export default function CourseListScreen() {
  const [query, setQuery] = useState("");

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    if (!normalizedQuery) return courses;
    return courses.filter((course) =>
      `${course.title} ${course.instructor} ${course.category}`
        .toLocaleLowerCase("vi")
        .includes(normalizedQuery)
    );
  }, [query]);

  const openCourse = (course: Course) => {
    Alert.alert(
      course.title,
      `Giảng viên: ${course.instructor}\nSố sinh viên: ${course.students}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseRow course={item} onPress={openCourse} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <CourseHeader
            query={query}
            onQueryChange={setQuery}
            resultCount={filteredCourses.length}
          />
        }
        ListEmptyComponent={<CourseEmpty />}
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
    height: 12,
  },
});
