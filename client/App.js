import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Switch,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { images, FONTS, SIZES, COLORS } from "./constants/index1";
import MainTab from "./navigator/MainTab";
import MainStack from "./navigator/MainStack";
import { AuthProvider, useAuth } from "./navigator/AuthContext";
import AuthStack from "./navigator/AuthStack";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTab /> : <AuthStack />}
      {/* <MainTab/> */}
    </NavigationContainer>
  );
}
