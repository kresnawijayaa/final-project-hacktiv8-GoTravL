import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import MainStack from "./MainStack";
import ItineraryStack from "./ItineraryStack";
import ExploreStack from "./ExploreStack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import OnBoarding from "../screens/OnBoarding";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuth } from "./AuthContext";
import AuthStack from "./AuthStack";
import { Alert } from "react-native";
import SplashScreen from "../screens/SplashScreen";
import ButtonHomeAdd from "../components/ButtonHomeAdd";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // If user is not authenticated, show SignIn or SignUp screen.
    return <AuthStack />;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, activeTintColor: '#0064D2',
        inactiveTintColor: 'black'
      }}
    // tabBarOptions={{

    // }}
    >
      <Tab.Screen
        name="MainStack"
        component={MainStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ItineraryStack"
        component={ItineraryStack}
        options={{
          tabBarLabel: "Plan",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker-radius-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreStack"
        component={ExploreStack}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-o" size={24} color={color} />
          ),
        }}
      />
      {/* Additional screens go here... */}
    </Tab.Navigator>
  );

}
