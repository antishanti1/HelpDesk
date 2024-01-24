import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/header";
import TicketSubmissionForm from "../../components/form";

export default function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <Header />
      <TicketSubmissionForm />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#5B8577",
    height: "100%",
  },
});
