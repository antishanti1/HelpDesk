import React, { ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "$context";
import { View } from "react-native";

const Main: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <View></View>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default Main;
