import { coursesData } from "@/data/Courses";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function CourseDetailsScreen() {
  const { courseCode } = useLocalSearchParams();

  const course =
    typeof courseCode === "string" ? coursesData[courseCode] : undefined;

  if (!course) {
    return (
      <View style={styles.center}>
        <Text>Course not found.</Text>
      </View>
    );
  }

  const openEnrollLink = async () => {
    if (course.enrollURL) {
      await Linking.openURL(course.enrollURL);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.code}>Code: {course.courseCode}</Text>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.rating}>Rating: {course.rating}/5</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Instructor(s)</Text>
        <Text>{course.instructors}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Language</Text>
        <Text>{course.language}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Duration</Text>
        <Text>{course.duration}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Fee</Text>
        <Text>₹ {course.fee}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.heading}>Description</Text>
      <Text style={styles.description}>{course.description}</Text>

      <Text style={styles.heading}>Skills</Text>
      {course.skills
        .filter((skill) => skill.trim() !== "")
        .map((skill) => (
          <Text key={skill} style={styles.skill}>
            - {skill}
          </Text>
        ))}

      <Pressable style={styles.enrollButton} onPress={openEnrollLink}>
        <Text style={styles.enrollText}>Enroll Now</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  code: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  rating: {
    marginTop: 4,
    marginBottom: 16,
  },

  section: {
    marginBottom: 12,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 2,
  },

  divider: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginVertical: 16,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
  },

  description: {
    lineHeight: 22,
  },

  skill: {
    marginBottom: 4,
  },

  enrollButton: {
    marginTop: 12,
    marginBottom: 36,
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  enrollText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
