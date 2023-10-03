import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Switch,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";

import Carousel3 from "../components/Carousel3";
import CarouselTiktok from "../components/CarouselTiktok";

import Ai from "../components/Ai";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../store/actionCreator";
import Guides from "../components/Guides";
import Header from "../components/Header";
import GuideCard from "../components/GuideCard";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../navigator/AuthContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const me = useSelector((state) => state.dataReducer.profile);
  const publicPost = useSelector((state) => state.dataReducer.publicPost);
  const data = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      text: "Thailand trip for beginner for 7 day, Lets Go!!!",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      text: "Bali pulau dewata for 1 Weeks, Come on!",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      text: "Raja Ampat for Holiday, Yuk kawann!!!",
    },
    // tambahkan data lainnya sesuai kebutuhan Anda
  ];

  const { setIsAuthenticated } = useAuth();
  // const navigation = useNavigation();
  const test = async () => {
    const accId = await AsyncStorage.getItem("id")
    console.log(accId)
  }
  test()

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token"); // Replace 'userToken' with your storage key
      setIsAuthenticated(false);
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };


  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={{ marginTop: 12, marginLeft: 24 }}>
          <View style={{ alignItems: "left" }}>
            <Text
              style={{
                fontSize: 28,
                marginVertical: 4,
                fontWeight: "bold",
                color: "#0064D2",
              }}
            >
              Hi, {me.fullName}!
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: "#202124",
              }}
            >
              Ready for a new adventure?
            </Text>
          </View>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 16 }}
            >
              {data.map((item, index) => (
                <GuideCard
                  key={index}
                  imageUrl={item.imageUrl}
                  text={item.text}
                />
              ))}
            </ScrollView>
          </View>
          <View style={{ alignItems: "left", marginTop: 28 }}>
            <Text
              style={{
                fontSize: 24,
                marginVertical: 4,
                fontWeight: "600",
                color: "#202124",
              }}
            >
              Need suggestions?
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginVertical: 4,
                fontWeight: "500",
                color: "#202124",
              }}
            >
              Plan your holiday with AI Assistant
            </Text>
          </View>
          <View style={{ marginRight: 24 }}>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 0.7,
                borderColor: "#ccc",
                borderRadius: 12,
                padding: 10,
                marginTop: 10,
                backgroundColor: "white",
              }}
            >
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/cloud-robotics-abstract-concept-illustration_335657-3801.jpg?w=740&t=st=1695795423~exp=1695796023~hmac=74ecea5e3929bae649c726e79a7d24fd7b9e764091ca22cc6d8e0e2e0a8fe6c6",
                }}
                style={{
                  width: 140,
                  height: 140,
                  marginHorizontal: 8,
                }}
              />
              <View>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 20,
                    marginLeft: 16,
                    marginTop: 26,
                    fontWeight: "bold",
                  }}
                >
                  Ask Manesty AI
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#0064D2",
                    paddingVertical: 12,
                    borderRadius: 5,
                    elevation: 3,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    alignItems: "center",
                    marginLeft: 16,
                    marginRight: 32,
                    marginBottom: 26,
                  }}
                  onPress={() => navigation.navigate("AiChatScreen")}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                    }}
                  >
                    Start chat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "left", marginTop: 28 }}>
            <Text
              style={{
                fontSize: 24,
                marginVertical: 4,
                fontWeight: "600",
                color: "#202124",
              }}
            >
              Catch the latest vibes!
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginVertical: 4,
                fontWeight: "500",
                color: "#202124",
              }}
            >
              Trending travel Youtube Short just for you
            </Text>
          </View>
          <View>
            <CarouselTiktok />
          </View>
          <View style={{ marginVertical: 20 }}></View>
        </ScrollView>
        {/* <ButtonHomeAdd /> */}
        {/* </ImageBackground> */}
      </SafeAreaView>
    </>
    // <SignIn />
    // <SignUp />
    // <OnBoarding />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  greetingText: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitleText: {
    fontSize: 24,
    marginBottom: -35,
    fontWeight: "bold",
  },
  descriptionTextSuggestion: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: -68,
  },
  descriptionText: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: -68,
  },
  videoText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  videoTextSmall: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: -30,
  },
  itinerariesContainer: {},
});
