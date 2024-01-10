import React from "react";
import { View } from "react-native";
import AdminDashboard from "./adminDashboard";
import Hedader from "../../components/header";

export default function AdminScreen() {
  return (
    <View>
      <Hedader />
      <AdminDashboard />
    </View>
  );
}
