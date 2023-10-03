import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import ItineraryStack from "../navigator/ItineraryStack"

const Stack = createNativeStackNavigator()

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ItineraryStack" component={ItineraryStack} />


        </Stack.Navigator>
    );
}