import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { itineraryData } from "../constants/itinerary";
import { useDispatch, useSelector } from "react-redux";
import { getUserItinerary } from "../store/actionCreator";
import distanceInDays from "../helper/date";
import LoadingComponent from "../screens/Loading";
const { width } = Dimensions.get("window");

// const dispatch()

export default function Itineraries({ data }) {
  const navigation = useNavigation();
  const access_token = useSelector((state) => state.dataReducer.access_token);
  const itinerary_list = useSelector(
    (state) => state.dataReducer.itineraryList
  );
  const loading = useSelector((state) => state.dataReducer.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserItinerary());
  }, []);
  if (loading) {
    return <LoadingComponent />;
  }
  const renderItem = ({ item }) => {
    return <ItineraryCard navigation={navigation} item={item} />;
  };

  console.log(itinerary_list, "PQPQPQPQPQPQPP")
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={itinerary_list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const ItineraryCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Itinerary", { ...item })}
      style={styles.card}
    >
      <View style={styles.cardContent}>
        <Image
          source={{ uri: item.image ? item.image : itineraryData[0].image }}
          style={styles.cardImage}
        />

        <View style={styles.textContainer}>
          <View>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
          <View style>
            <Text style={styles.dateText}>{item.startDate}</Text>
            <Text style={styles.totalDaysText}>
              Total Days: {distanceInDays(item.startDate, item.endDate)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // width: width, // Lebar card setara dengan lebar layar
    flexDirection: "row", // Layout horizontal
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 24,
    marginTop: 24,
  },
  cardContent: {
    flexDirection: "row", // Layout horizontal
    flex: 1, // Menggunakan semua ruang yang tersedia
  },
  cardImage: {
    width: width * 0.3, // Lebar gambar setengah dari lebar layar
    height: width * 0.4, // Tinggi gambar setengah dari lebar layar
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  textContainer: {
    flex: 1, // Menggunakan semua ruang yang tersedia
    marginLeft: 12, // Margin kiri antara gambar dan teks
    padding: 16, // Padding untuk teks
    justifyContent: "space-between", // Menyusun teks secara vertikal
  },
  titleText: {
    fontSize: 18, // Ukuran font title
    fontWeight: "600", // Tebal
    marginBottom: 4, // Margin bawah antara title dan description
  },
  descriptionText: {
    fontSize: 16, // Ukuran font description
    marginBottom: 4, // Margin bawah antara description dan date
    color: "#777",
    numberOfLines: 3, // Limit to 3 lines
    ellipsizeMode: "tail" // Add "..." if text overflows
  },
  dateText: {
    fontSize: 12, // Ukuran font date
    color: "#777", // Warna teks date
    marginBottom: 8, // Margin bawah antara date dan total days
  },
  totalDaysText: {
    fontSize: 14, // Ukuran font total days
    fontWeight: "bold", // Tebal
    color: "#0064D2", // Warna teks total days
  },
});
