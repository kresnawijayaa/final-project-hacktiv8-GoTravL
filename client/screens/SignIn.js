import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useAuth } from "../navigator/AuthContext";
import { useNavigation } from "@react-navigation/native";
// import auth from '@react-native-firebase/auth';
import { images, FONTS, SIZES, COLORS } from "../constants/index1";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe, loginAccount } from "../store/actionCreator";

const SignIn = () => {
  const dispatch = useDispatch();
  const { setIsAuthenticated } = useAuth();
  const navigation = useNavigation();
  const [data, setData] = React.useState({
    password: "",
    checkTextInputChange: false,
    secureTextEntry: true,
  });
  const userId = useSelector((state) => state.dataReducer.userId)

  const access_token = useSelector((state) => state.dataReducer.access_token);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSignIn = async () => {
    try {
      await dispatch(loginAccount(email, password));
    } catch (error) {
      console.error("Error during sign in:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Server Response:", error.response.data.message);
      }
    }
  };
  useEffect(() => {
    const storeTokenAndNavigate = async () => {
      if (access_token) {
        console.log(access_token, userId)
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem('id', `${userId}`);
        console.log(access_token, '<<<<<<< sign in clear');
        console.log(userId, '<<<<<<< sign in clear');
        setIsAuthenticated(true);
        navigation.navigate("HomeScreen");
      }
    };

    storeTokenAndNavigate();
  }, [access_token]);

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
            minHeight: screenHeight,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                height: 250,
                width: 500,
              }}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingVertical: 30,
              marginBottom: -10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#202124",
                marginLeft: 8,
                marginVertical: 4,
              }}
            >
              Email or Phone Number
            </Text>
            <View style={styles.textBoxSign}>
              <Image
                source={images.person}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 40,
                  right: 2,
                  alignSelf: "flex-start",
                }}
              />
              <TextInput
                placeholder="Enter your email or phone number..."
                onChangeText={(value) => setEmail(value)}
                autoCapitalize={"none"}
                style={{
                  flex: 1,
                  height: 40.5,
                  fontSize: 15,
                  marginLeft: 2,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 14,
                color: "#202124",
                marginLeft: 8,
                marginVertical: 4,
                marginTop: 20,
              }}
            >
              Password
            </Text>
            <View style={styles.textBoxSign}>
              <Image
                source={images.lock}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 20,
                  top: 10,
                  alignSelf: "flex-start",
                }}
              />
              <TextInput
                placeholder="Enter your password..."
                secureTextEntry={data.secureTextEntry ? true : false}
                onChangeText={(value) => setPassword(value)}
                style={{
                  flex: 1,
                  height: 40.5,
                  fontSize: 15,
                  marginLeft: 5,
                }}
              />
              <TouchableOpacity
                onPress={updateSecureTextEntry}
                style={{ alignItems: "flex-end" }}
              >
                {data.secureTextEntry ? (
                  <Image
                    source={images.eyeclosed}
                    resizeMode="contain"
                    style={{ width: 25, height: 40 }}
                  />
                ) : (
                  <Image
                    source={images.eye}
                    resizeMode="contain"
                    style={{ width: 25, height: 40 }}
                  />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleSignIn}
              style={{
                backgroundColor: "#0064D2",
                paddingVertical: 12,
                paddingHorizontal: 2,
                borderRadius: 5,
                elevation: 3,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                marginHorizontal: 80,
                alignItems: "center",
                marginTop: 60,
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold" }}
              >
                Sign in
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.radius * 2.5,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                Don't have an account?{" "}
              </Text>

              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text
                  style={{
                    color: COLORS.signup,
                    fontSize: 16,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
    // </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000", // for iphone drop shadow (specifies the android equivalent, elevation: 1)
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  textBoxSign: {
    flexDirection: "row",
    height: 45,
    marginHorizontal: 5,
    marginTop: 5,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
    elevation: 2,
  },
  textAbove: { fontSize: 14, marginLeft: 12 },
});
