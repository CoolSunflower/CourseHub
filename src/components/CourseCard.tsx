import { coursesData } from "@/data/Courses";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface CourseCardProps {
  courseCode: string;
  isBanner?: boolean;
}

export default function CourseCard({ courseCode, isBanner }: CourseCardProps) {
  const courseData = coursesData[courseCode];
  const onPress = () =>
    router.push({
      pathname: "/courseDetails",
      params: { courseCode },
    });

  if (!courseData) return null;

  return isBanner ? (
    <Pressable
      style={({ pressed }) => [styles.bannerCard, pressed && styles.pressed]}
      onPress={onPress}
    >
      {/* <View style={styles.bannerCard}> */}
      <Text style={styles.featuredLabel}>Featured</Text>

      <Text style={styles.code}>{courseData.courseCode}</Text>

      <Text style={styles.bannerTitle} numberOfLines={2}>
        {courseData.title}
      </Text>

      <View style={styles.bannerRow}>
        <View style={styles.bannerInfo}>
          <Ionicons name="star" size={14} />
          <Text>{courseData.rating}/5</Text>
        </View>

        <Text numberOfLines={1} style={styles.bannerInstructor}>
          {courseData.instructors}
        </Text>
      </View>

      <View style={styles.bannerRow}>
        <Text>{courseData.language}</Text>
        <Text>{courseData.duration}</Text>
      </View>

      <Text style={styles.price}>₹ {courseData.fee}</Text>
    </Pressable>
  ) : (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.code}>{courseData.courseCode}</Text>

      <Text style={styles.title} numberOfLines={2}>
        {courseData.title}
      </Text>

      <View style={styles.row}>
        <Ionicons name="star" size={14} />
        <Text>{courseData.rating}/5</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="person-outline" size={14} />
        <Text numberOfLines={1}>{courseData.instructors}</Text>
      </View>

      <Text>
        {courseData.language} - {courseData.duration}
      </Text>

      <Text style={styles.price}>₹ {courseData.fee}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    margin: 8,
    padding: 12,

    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,

    backgroundColor: "#fff",
  },

  pressed: {
    opacity: 0.8,
  },

  code: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    minHeight: 40,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },

  bannerCard: {
    width: "90%",
    padding: 16,

    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,

    backgroundColor: "#fff",
  },

  featuredLabel: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  bannerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
  },

  bannerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  bannerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  bannerInstructor: {
    flex: 1,
    textAlign: "right",
    marginLeft: 12,
  },

  price: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});
