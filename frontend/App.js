import React, { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import registerNNPushToken from "native-notify";
import messaging from "@react-native-firebase/messaging";

export default function App() {


  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
