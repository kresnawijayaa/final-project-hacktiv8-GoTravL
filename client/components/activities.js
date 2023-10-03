import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { activitiesDetails } from "../constants/itinerary";
import {
  TrashIcon,
  PencilIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import { theme } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, deleteLocation } from "../store/actionCreator";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";

export default function Activites({ activitiesDetails }) {
  const access_token = useSelector((state) => state.dataReducer.accessToken)

  const body = {}

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleClick = async (id) => {
    dispatch(deleteLocation(id))
  }
  const renderItem = ({ item }) => {
    return <ActivityCard navigation={navigation} item={item} handleClick={handleClick} />;
  };
  const getDetails = async (place_id) => {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?fields=name,formatted_address,geometry,photo,url,opening_hours,place_id&place_id=${place_id}&key=AIzaSyAGbMR0JMGpMMy6HmuFJ5YID7Ne0WSOOeM`)
    body.name = data.result.name;
    body.address = data.result.formatted_address;
    body.place_id = data.result.place_id;
    body.url = data.result.url;
    body.geometry = data.result.geometry;
    body.photos = data.result.photos;
  }
  const getPhotos = async (photos) => {
    if (!Array.isArray(photos)) {
      return [];
    }

    const photoUrls = photos.map((photo) => {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAGbMR0JMGpMMy6HmuFJ5YID7Ne0WSOOeM`;
    });

    return photoUrls;
  }
  const handleClicked = async (id, details) => {
    if (details && details.place_id) {
      body.place_id = details.place_id
      await getDetails(body.place_id)
      const fetchPhoto = await getPhotos(body.photos)
      delete body.photos
      body.images = fetchPhoto
    }
    await dispatch(addLocation(body, access_token, id))
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 2, marginLeft: 0 }}>
      {activitiesDetails.map((activity, i) => (
        <View>
          <View
            style={{ alignItems: "left", marginHorizontal: 24, marginTop: 20 }}
            key={i}
          >
            <Text
              style={{
                fontSize: 24,
                marginVertical: 4,
                fontWeight: "600",
                color: "#202124",
              }}
            >
              💬 {activity.name}{" "}
              <Text
                style={{
                  fontSize: 14,
                  marginVertical: 4,
                  fontWeight: "400",
                  color: "#777",
                }}
              >
                ({activity.date.split("-").reverse().join("-")})
              </Text>
            </Text>
          </View>
          <FlatList
            key={i + 2}
            scrollEnabled={false}
            data={activity.locationId}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <ScrollView style={{ marginHorizontal: 24, borderWidth: 0.4, borderColor: "#777", borderRadius: 12, marginTop: 20 }}>
            <GooglePlacesAutocomplete
              key={i + 1}
              placeholder="Add a place"
              fetchDetails={false}
              onPress={(data, details) => {
                handleClicked(activity.id, details);
              }}
              query={{
                key: "AIzaSyAGbMR0JMGpMMy6HmuFJ5YID7Ne0WSOOeM",
                language: "en",
              }}
            />
          </ScrollView>

        </View>
      ))}
    </View>
  );
}

const ActivityCard = ({ item, navigation, handleClick }) => {
  const [isFavourite, toggleFavourite] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ActivityDetail", { url: item.url })}
        style={{
          borderWidth: 0.4,
          borderColor: "#777",
          height: 140,
          marginHorizontal: 24,
          marginTop: 12,
          borderRadius: 12,
          flexDirection: "row",
          padding: 12,
        }}
      >
        <Image
          source={{ uri: item.images[0] }}
          style={{
            borderRadius: 8,
            width: 100,
          }}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            numberOfLines={1} // Limit to 3 lines
            ellipsizeMode="tail" // Add "..." if text overflows
            style={{
              fontSize: 16,
              color: "#202124",
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {item.name}
          </Text>
          <Text
            numberOfLines={3} // Limit to 3 lines
            ellipsizeMode="tail" // Add "..." if text overflows
            style={{
              fontSize: 12,
              color: "#777",
              lineHeight: 16,
              marginRight: 12,
            }}
          >
            {item.address}
          </Text>
        </View>
        <View style={{ position: "absolute", bottom: 10, right: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 100,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,

            }}
            onPress={() => handleClick(item.id)}
          >
            <TrashIcon size={wp(5)} color={"red"} opacity={0.6} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* batas disini */}
    </View>
  );
};

const styles = StyleSheet.create({
  dayTitle: {
    fontSize: wp(4),
    fontWeight: "bold",
    marginBottom: -20,
    color: theme.text,
    paddingHorizontal: wp(5), // Add horizontal padding
    marginBottom: hp(1),
  },
  input: {
    borderWidth: 0.4,
    borderColor: "#777",
    height: 48,
    paddingLeft: 12,
    fontSize: 16,
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 24,
    borderRadius: 12,
  },
});
