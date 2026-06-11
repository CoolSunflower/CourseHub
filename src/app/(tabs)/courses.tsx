import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/Courses";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CoursesScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  // Get list of subjects
  const subjects = [
    "All",
    ...new Set(Object.values(coursesData).map((course) => course.subject)),
  ];

  const filteredCourseCodes = Object.keys(coursesData).filter((courseCode) => {
    const course = coursesData[courseCode];
    const searchableText = [
      course.courseCode,
      course.title,
      course.instructors,
      course.language,
      course.duration,
      course.rating,
      String(course.fee),
      course.description,
      course.subject,
      course.category,
      course.enrollURL,
      ...course.skills,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(
      searchText.trim().toLowerCase(),
    );
    const matchesSubject =
      selectedSubject === "All" || course.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search courses..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subjectContainer}
      >
        {subjects.map((subject) => (
          <Pressable
            key={subject}
            style={[
              styles.subjectButton,
              selectedSubject === subject && styles.selectedSubjectButton,
            ]}
            onPress={() => setSelectedSubject(subject)}
          >
            <Text
              style={[
                styles.subjectButtonText,
                selectedSubject === subject && styles.selectedSubjectButtonText,
              ]}
            >
              {subject}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {filteredCourseCodes.length > 0 ? (
        <FlatList
          data={filteredCourseCodes}
          keyExtractor={(item) => item}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          renderItem={({ item }) => <CourseCard courseCode={item} />}
        />
      ) : (
        <Text style={{ margin: 15 }}>No Courses Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 15,
  },

  subjectContainer: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    gap: 8,
    height: 50,
  },

  subjectButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },

  selectedSubjectButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },

  subjectButtonText: {
    color: "#000",
  },

  selectedSubjectButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
