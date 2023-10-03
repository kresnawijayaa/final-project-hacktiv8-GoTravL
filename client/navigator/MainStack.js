import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import SplashScreen from "../screens/SplashScreen";
import AiChatScreen from "../screens/AiChatScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "HomeScreen" }}
      />
      <Stack.Screen
        name="AiChatScreen"
        component={AiChatScreen}
        options={{
          title: "AiChatScreen",
          header: () => null, // Menyembunyikan header
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
}
