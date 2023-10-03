import {
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

import BackgroundAnimation from "../animated";
import { COLORS, images, SIZES } from "../constants/index1";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  const moveToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <SafeAreaView>
        <View style={{ paddingVertical: SIZES.padding }}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              height: 250,
              width: 500,
              opacity: 1,
              marginTop: 80,
            }}
          />
          {/* <ActivityIndicator style={{marginTop: 20}} size="large" color={COLORS.signup}/> */}
        </View>
      </SafeAreaView>
      <BackgroundAnimation />
      <TouchableOpacity
        onPress={moveToSignIn}
        style={{
          backgroundColor: "#0064D2",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 5,
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          marginTop: 140,
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold" }}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
