import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Header() {
  const navigation = useNavigation();

  const goToAdminPage = () => {
    navigation.navigate("Admin");
  };

  const goToHomePage = () => {
    navigation.navigate("Home");
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goToHomePage}>
        <Text style={styles.title}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Ticket System</Text>
      <TouchableOpacity onPress={goToAdminPage}>
        <Text style={styles.admin}>Admin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  img: {
    width: 50,
    height: 50,
  },
  admin: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
