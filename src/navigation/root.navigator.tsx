import React from "react";
import { FC } from "react";

export const ROOT_STACK_SCREENS = {
  AUTH: "auth",
  MAIN: "main",
  ADMIN: "admin",
} as const;

export type RootStackParamList = {
  [ROOT_STACK_SCREENS.AUTH]: undefined;
  [ROOT_STACK_SCREENS.MAIN]: undefined;
  [ROOT_STACK_SCREENS.ADMIN]: undefined;
};

const RootStackNavigator: FC = () => {
  return <></>;
};

export default RootStackNavigator;
