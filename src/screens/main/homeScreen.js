import React from "react";
import { View } from "react-native";
import Header from "../../components/header";
import TicketSubmissionForm from "../../components/form";

export default function HomeScreen() {
  return (
    <View>
      <Header />
      <TicketSubmissionForm />
    </View>
  );
}
