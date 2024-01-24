import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import AdminDashboard from "./adminDashboard";
import Hedader from "../../components/header";

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <Hedader />
      <AdminDashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5B8577",
    height: "100%",
  },
});
