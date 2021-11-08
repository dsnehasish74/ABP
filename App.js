import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ActivityLog from "./pages/ActivityLog/ActivityLog";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityLog />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b02020",
    paddingTop: 40,
  },
});
