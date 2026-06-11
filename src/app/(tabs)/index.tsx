import CourseCard from "@/components/CourseCard";
import { FeaturedCourses, PopularCourses } from "@/data/Courses";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % FeaturedCourses.length;

      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Featured Courses</Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {FeaturedCourses.map((courseCode) => (
          <View key={courseCode} style={styles.slide}>
            <CourseCard courseCode={courseCode} isBanner />
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {FeaturedCourses.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>

      <Text style={styles.heading}>Popular Courses</Text>

      <FlatList
        data={PopularCourses}
        keyExtractor={(item) => item}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.popularContainer}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <CourseCard courseCode={item} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    paddingBottom: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 12,
    marginTop: 15,
    marginBottom: 10,
  },

  slide: {
    width,
    alignItems: "center",
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
    gap: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },

  activeDot: {
    backgroundColor: "#007AFF",
  },

  popularContainer: {
    paddingHorizontal: 8,
  },

  row: {
    justifyContent: "space-evenly",
  },
});
