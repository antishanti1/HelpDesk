import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

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
      <View style={styles.top}>
        <TouchableOpacity onPress={goToHomePage}>
          <MaterialIcons name="arrow-back-ios" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={goToHomePage}>
          <AntDesign name="customerservice" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={goToAdminPage}>
          <MaterialCommunityIcons
            name="account-check-outline"
            size={40}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5B8577",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  top: {
    width: windowWidth * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: windowWidth * 0.02,
    paddingBottom: 15,
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
