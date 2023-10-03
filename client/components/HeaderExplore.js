import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const profile = useSelector((state) => state.dataReducer.profile);

  const profileData = {
    name: "David Jhonson",
    bio: "Aku adalah anak gembala selalu riang serta gembira",
    imageUrl: "https://tintermeet.com/wp-content/uploads/2014/10/speaker-3.jpg",
    description: `Let's go explore everything !!`,
    languange: "English",
  };

  return (
    <View
      style={{
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 2,
        borderRadius: 5,
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          marginVertical: 4,
          paddingHorizontal: 24,
          fontWeight: "bold",
          color: "#0064D2",
        }}
      >
        Explore
      </Text>
      <Text
        style={{
          marginLeft: 24,
          color: "gray",
          marginVertical: 4,
          marginBottom: 20,
        }}
      >
        Explore new places and adventures
      </Text>
    </View>
  );
};

export default Header;
