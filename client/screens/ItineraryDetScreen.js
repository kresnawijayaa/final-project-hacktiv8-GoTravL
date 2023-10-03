import {
  Linking,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  ClockIcon,
  ShareIcon,
  MapPinIcon,
  SunIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import Activities from "../components/activities";
import { TextInput } from "react-native-gesture-handler";
import { itineraryData } from "../constants/itinerary";
import {
  TrashIcon,
  PencilIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import { images, FONTS, SIZES, COLORS } from "../constants/index1";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivitiesByTripId,
  initialFirestore,
} from "../store/actionCreator";
import LoadingComponent from "./Loading";
import { SvgXml } from "react-native-svg";

const ios = Platform.OS == "ios";
const topMargin = ios ? hp(1) : hp(10);

const shareToEmail = (subject, body) => {
  const emailURL = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}&ui=2&tf=1`;
  Linking.openURL(emailURL).catch((err) =>
    console.error("An error occurred", err)
  );
};

export default function ItineraryDetScreen(props) {
  const item = props.route.params;
  const activitiesDetails = useSelector(
    (state) => state.dataReducer.activitiesDetails
  );
  const dataAddedPost = useSelector((state) => state.dataReducer.dataAddedPost);
  const access_token = useSelector((state) => state.dataReducer.access_token);
  const loading = useSelector((state) => state.dataReducer.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActivitiesByTripId(item.id));
  }, []);
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);

  const onShare = () => {
    navigation.navigate("InviteEmailScreen", {
      tripId: !item.id ? dataAddedPost.id : item.id,
    });
  };

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#0064D2",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 12,
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          alignItems: "center",
          justifyContent: "center",
          height: 44,
          width: 44,
          position: "absolute", // Mengatur posisi tombol kembali
          left: 24, // Menyesuaikan posisi horizontal tombol kembali
          top: 60, // Menyesuaikan posisi vertikal tombol kembali
          zIndex: 2, // Pastikan tombol kembali berada di atas elemen header lainnya
        }}
      >
        <SvgXml
          xml={`<svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>`}
          width={14}
          height={14}
        />
      </TouchableOpacity>
      <Image
        source={{
          uri: !item.image ? itineraryData[0].image : item.image,
        }}
        // source={{ uri: !item.image && itineraryData[0].image }}
        style={styles.image}
      />

      <View style={{ marginHorizontal: 24, marginVertical: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ maxWidth: 260 }}>
            <Text
              style={{
                fontSize: 36,
                marginVertical: 4,
                fontWeight: "600",
                color: "#202124",
              }}
            >
              {!item?.title ? dataAddedPost.title : item.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginVertical: 8,
                fontWeight: "500",
                color: "#777",
              }}
            >
              📅 {!item?.startDate ? dataAddedPost.startDate : item.startDate} (
              {activitiesDetails.length} Days)
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 12, paddingVertical: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditItinerary", {})}
              style={{
                borderWidth: 2,
                borderColor: "#0064D2",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 12,
                elevation: 3,
                alignItems: "center",
                justifyContent: "center",
                height: 44,
                width: 44,
              }}
            >
              <SvgXml
                xml={`<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"/>
  </svg>`}
                width={14}
                height={14}
                fill="#0064D2"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onShare}
              style={{
                backgroundColor: "#0064D2",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 12,
                elevation: 3,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                alignItems: "center",
                justifyContent: "center",
                height: 44,
                width: 44,
              }}
            >
              <SvgXml
                xml={`<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"/>
              </svg>`}
                width={14}
                height={14}
                fill="#ffffff"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 24,
            marginVertical: 8,
            fontWeight: "500",
            color: "#777",
          }}
        >
          {!item?.description ? dataAddedPost.description : item.description}{" "}
        </Text>
      </View>

      {/* rute + chat */}

      <View style={{ alignItems: "left", marginHorizontal: 24, marginTop: 12 }}>
        <Text
          style={{
            fontSize: 24,
            marginVertical: 4,
            fontWeight: "600",
            color: "#202124",
          }}
        >
          📍 Destination route
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginVertical: 4,
            fontWeight: "500",
            color: "#202124",
          }}
        >
          Discover your ultimate optimization route
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RouteScreen", activitiesDetails);
          }}
        >
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/abstract-city-map-with-pins-navigation-app_95169-1513.jpg?w=740",
            }}
            style={styles.imageMap}
          />
          <View
            style={{
              position: "absolute", // Mengatur posisi tombol kembali
              left: 123, // Menyesuaikan posisi horizontal tombol kembali
              top: 90, // Menyesuaikan posisi vertikal tombol kembali
              zIndex: 2, // Pastikan tombol kembali berada di atas elemen header lainnya
              paddingHorizontal: 20,
              paddingVertical: 6,
              backgroundColor: "white",
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                marginVertical: 4,
                fontWeight: "500",
                color: "#0064D2",
              }}
            >
              click to view route
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "left", marginHorizontal: 24, marginTop: 36 }}>
        <Text
          style={{
            fontSize: 24,
            marginVertical: 4,
            fontWeight: "600",
            color: "#202124",
          }}
        >
          💬 Group chat
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginVertical: 4,
            fontWeight: "500",
            color: "#202124",
          }}
        >
          Stay connected with your group for fun
        </Text>
      </View>

      <View style={{ marginHorizontal: 24 }}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 0.7,
            borderColor: "#ccc",
            borderRadius: 12,
            marginTop: 10,
          }}
        >
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/text-messages-cell-phone-chat-notification-people-digital-talk-sms-smartphone-cellphone_101884-1867.jpg?w=740",
            }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 12,
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#0064D2",
                paddingVertical: 12,
                paddingHorizontal: 28,
                borderRadius: 5,
                elevation: 3,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                marginLeft: 16,
                marginRight: 16,
              }}
              onPress={() => {
                if (!item?.description) {
                  navigation.navigate("GroupChatScreen", {
                    roomid: dataAddedPost.id,
                    title: dataAddedPost.title,
                  });
                } else {
                  navigation.navigate("GroupChatScreen", {
                    roomid: item.id,
                    title: item.title,
                  });
                }
              }}
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

      {/* locationsss */}

      <View style={{ alignItems: "left", marginHorizontal: 24, marginTop: 36 }}>
        <Text
          style={{
            fontSize: 24,
            marginVertical: 4,
            fontWeight: "600",
            color: "#202124",
          }}
        >
          🗺️ Your itinerary
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginVertical: 4,
            fontWeight: "500",
            color: "#202124",
          }}
        >
          Plan your adventure day by day
        </Text>
      </View>

      <Activities activitiesDetails={activitiesDetails} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 320, // Tinggi gambar 20% dari layar
  },
  imageMap: {
    height: 200, // Tinggi gambar 20% dari layar
    marginHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    padding: 16, // Padding sebanyak 16 piksel
    ...topMargin,
  },
  backButtonIcon: {
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 8, // Padding sebanyak 8 piksel
    borderRadius: 16, // Radius sudut 16 piksel
  },
  shareButton: {
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 8, // Padding sebanyak 8 piksel
    borderRadius: 16, // Radius sudut 16 piksel
  },
  title: {
    fontSize: 28, // Ukuran font 28
    fontWeight: "bold",
    color: theme.text,
    marginTop: 24, // Margin atas sebanyak 24 piksel
    paddingHorizontal: 20, // Padding horizontal sebanyak 20 piksel
  },
  description: {
    fontSize: 18, // Ukuran font 18
    marginBottom: -10, // Margin bawah -10 piksel (untuk mengatur margin atas teks berikutnya)
    color: theme.text,
    marginTop: 16, // Margin atas sebanyak 16 piksel
    paddingHorizontal: 20, // Padding horizontal sebanyak 20 piksel
  },
  date: {
    fontSize: 18, // Ukuran font 18
    color: theme.text,
    marginBottom: 16, // Margin bawah sebanyak 16 piksel
    paddingHorizontal: 20, // Padding horizontal sebanyak 20 piksel
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Padding horizontal sebanyak 20 piksel
    marginBottom: 16, // Margin bawah sebanyak 16 piksel
    marginTop: 32, // Margin atas sebanyak 32 piksel
  },
  button: {
    backgroundColor: "#f7f7f7",
    padding: 12, // Padding sebanyak 12 piksel
    borderRadius: 16, // Radius sudut 16 piksel
    flex: 1,
    marginHorizontal: 8, // Margin horizontal sebanyak 8 piksel
  },
  buttonText: {
    color: "#0064D2",
    fontSize: 18, // Ukuran font 18
    fontWeight: "bold",
    marginLeft: 20, // Margin kiri sebanyak 20 piksel
    marginTop: 16, // Margin atas sebanyak 16 piksel
  },
  dayTitle: {
    fontSize: 20, // Ukuran font 20
    fontWeight: "bold",
    marginBottom: -20, // Margin bawah -20 piksel (untuk mengatur margin atas teks berikutnya)
    color: theme.text,
    paddingHorizontal: 20, // Padding horizontal sebanyak 20 piksel
    marginBottom: 8, // Margin bawah sebanyak 8 piksel
  },
});
