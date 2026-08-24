import { Course } from "@/data/courses";
import { Pressable, Text, View, StyleSheet } from "react-native";

export interface CourseRowProps {
  course: Course;
  onPress: (course: Course) => void;
}

export const CourseRow = ({ course, onPress }: CourseRowProps) => {
  return (
    <Pressable
      onPress={() => onPress(course)}
      style={({ pressed }) => [
        styles.courseCard,
        pressed && styles.courseCardPressed,
      ]}
    >
      <Text style={styles.courseTitle}>{course.title}</Text>

      <Text style={styles.instructor}>Giảng viên: {course.instructor}</Text>

      <View style={styles.courseFooter}>
        <Text style={styles.category}>{course.category}</Text>
        <Text style={styles.studentCount}>{course.students} sinh viên</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  courseCardPressed: {
    opacity: 0.7,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  instructor: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  category: {
    fontSize: 12,
    color: "#0066CC",
    fontWeight: "500",
  },
  studentCount: {
    fontSize: 12,
    color: "#888",
  },
});
