import React from "react";
import auth from "@react-native-firebase/auth";
import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import { Alert } from "react-native";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  fullName: string;
  email: string;
  password: string;
}

interface State {
  isAuthorized?: boolean;
  isLoggingIn?: boolean;
  isSigningUp?: boolean;
}

type Actions =
  | { type: "LOGGING_IN" }
  | { type: "SIGNING_UP" }
  | { type: "SIGNED_UP_SUCCESS" };

const reducer = (state: State, action: Actions): State => {
  if (action.type === "LOGGING_IN") {
    return {
      ...state,
      isLoggingIn: true,
    };
  }

  if (action.type === "SIGNING_UP") {
    return {
      ...state,
      isSigningUp: true,
    };
  }

  if (action.type === "SIGNED_UP_SUCCESS") {
    return {
      ...state,
      isSigningUp: false,
    };
  }

  return state;
};

const ctx = createContext(
  {} as {
    state: State;
    signUp: (v: SignUpPayload) => void;
    signIn: (v: SignInPayload) => void;
  }
);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <></>;
};
