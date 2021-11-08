import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>ActivityLog</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#b02020",
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
  },
});
