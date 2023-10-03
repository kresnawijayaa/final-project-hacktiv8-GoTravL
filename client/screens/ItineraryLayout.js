import React from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacityComponent,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Itineraries from "../components/itinerary";
import ButtonHomeAdd from "../components/ButtonHomeAdd";
import HeaderItinerary from "../components/HeaderItinerary";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";

export default function ItineraryLayout() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <HeaderItinerary />
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateItinerary")}
        >
          <View
            style={{
              marginHorizontal: 24,
              marginTop: 24,
              borderWidth: 2,
              borderRadius: 12,
              borderStyle: "dashed",
              borderColor: "#000",
              height: 140,
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              opacity: 0.4,
            }}
          >
            <SvgXml
              xml={`<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>`}
              width={16}
              height={16}
            />
            <Text> </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 18,
                // opacity: 0.6,
              }}
            >
              {" "}
              Create new itinerary
            </Text>
          </View>
        </TouchableOpacity>
        <Itineraries />
        <View style={{ paddingVertical: 60 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
