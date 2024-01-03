import { InitialScreen, SignInScreen, SignUpScreen } from "$screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";

export const AUTH_STACK_SCREENS = {
  INITIAL: "initial",
  SIGN_IN: "signIn",
  SIGN_UP: "signUp",
} as const;

export type AuthStackParamList = {
  [AUTH_STACK_SCREENS.INITIAL]: undefined;
  [AUTH_STACK_SCREENS.SIGN_IN]: undefined;
  [AUTH_STACK_SCREENS.SIGN_UP]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackNavigator: FC = () => {
  return <></>;
};
