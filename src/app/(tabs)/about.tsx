import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.appName}>CourseHub</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>About Application</Text>
        <Text style={styles.content}>
          CourseHub helps students discover and learn new skills through online
          courses.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Developer</Text>
        <Text>Name: Adarsh Gupta</Text>
        <Text>Email: iamadarshgupta8@gmail.com</Text>
        <Text>GitHub: CoolSunflower</Text>
      </View>

      <Text style={styles.footer}>Thank You For Using CourseHub</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },

  appName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  version: {
    textAlign: "center",
    marginTop: 4,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  content: {
    lineHeight: 22,
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});
