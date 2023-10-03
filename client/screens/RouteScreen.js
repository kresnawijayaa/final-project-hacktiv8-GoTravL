import React, { useState, useCallback } from "react";
import MapViewDirections from "react-native-maps-directions";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch } from "react-redux";
import { updateLocations } from "../store/actionCreator";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function getDistanceBetweenLocations(origin, destination) {
  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${GOOGLE_API_KEY}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.status === "OK") {
    const distanceInMeters = data.rows[0].elements[0].distance.value;
    return distanceInMeters;
  } else {
    throw new Error("Failed to fetch distance");
  }
}

function getAllPermutations(array) {
  if (array.length === 0) return [[]];
  const firstElem = array[0];
  const remainingElems = array.slice(1);
  const permutationsOfRemainingElems = getAllPermutations(remainingElems);

  return permutationsOfRemainingElems.flatMap((p) => {
    return array.map((elem, index) => {
      const tempArray = [...p];
      tempArray.splice(index, 0, firstElem);
      return tempArray;
    });
  });
}

async function getTotalDistanceForOrder(startingPlace, order) {
  let totalDistance = 0;
  let currentPlace = startingPlace;

  for (const place of order) {
    totalDistance += await getDistanceBetweenLocations(currentPlace, place);
    currentPlace = place;
  }
  return totalDistance;
}

function getOrderString(order) {
  return order.map((place) => place.name).join(" -> ");
}

function MapViewPage({ route }) {
  const [bestOrder, setBestOrder] = useState(null);
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();
  const temp = [];
  const data = route.params;
  // console.log(route.params)
  data.map((el) => {
    const tempArr = [];
    el.locationId.map((element) => {
      tempArr.push({
        lat: element.geometry.location.lat,
        lng: element.geometry.location.lng,
        name: element.name,
        id: element.id,
        toSend: element,
      });
    });
    temp.push({ label: el.name, value: { id: el.id, data: tempArr } });
  });
  const handleChangeSelect = (send) => {
    if (send) {
      const loc = [];
      loc.push({ name: "Hacktiv8", lat: -6.2606744, lng: 106.7791296 });
      send.data.map((el) => {
        loc.push({
          name: el.name,
          lat: el.lat,
          lng: el.lng,
          id: el.id,
          toUpdate: el.toSend,
        });
      });
      setLocations(loc);
      setBestOrder(loc);
    }
  };
  // const forSend = locations.shift()

  // console.log(locations)
  // locations = [
  //   {
  //     name: "7shades coffee",
  //     lat: -6.26588967001838,
  //     lng: 106.80601135157572,
  //   },
  //   {
  //     name: "gandaria",
  //     lat: -6.2439765551731385,
  //     lng: 106.78396887690839,
  //   },
  //   {
  //     name: "cove taman",
  //     lat: -6.265793687315359,
  //     lng: 106.7994453038897,
  //   },
  // ];

  const generateOptimalRoute = useCallback(async () => {
    try {
      if (locations.length > 0) {
        console.log("Generating");
        const startingPlace = locations[0];
        const otherPlaces = locations.slice(1);

        const allPossibleOrders = getAllPermutations(otherPlaces);
        let shortestDistance = Infinity;
        let bestOrder = null;

        for (const order of allPossibleOrders) {
          const currentDistance = await getTotalDistanceForOrder(
            startingPlace,
            order
          );
          if (currentDistance < shortestDistance) {
            shortestDistance = currentDistance;
            bestOrder = order;
          }
        }
        console.log(
          `Jarak teroptimal dari ${getOrderString([
            startingPlace,
            ...bestOrder,
          ])} adalah: ${(shortestDistance / 1000).toFixed(2)} km`
        );

        setBestOrder([startingPlace, ...bestOrder]);
        dispatch(updateLocations(bestOrder));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [locations]);

  const initialRegion = {
    latitude: -6.2606744,
    longitude: 106.7791296,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [selectedValue, setSelectedValue] = useState();
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        style={{ flex: 4 }}
      >
        {(bestOrder || locations).map((loc, idx) => (
          <Marker
            key={idx}
            coordinate={{ latitude: loc.lat, longitude: loc.lng }}
            title={loc.name}
          />
        ))}

        {(bestOrder || locations).slice(0, -1).map((startLoc, idx) => {
          const endLoc = (bestOrder || locations)[idx + 1];
          return (
            <MapViewDirections
              key={idx}
              origin={{ latitude: startLoc.lat, longitude: startLoc.lng }}
              destination={{ latitude: endLoc.lat, longitude: endLoc.lng }}
              apikey={GOOGLE_API_KEY}
              strokeWidth={4}
              strokeColor="blue"
            />
          );
        })}
      </MapView>

      <ScrollView style={{ flex: 1, padding: 10 }}>
        <View
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
        >
          <RNPickerSelect
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 4,
                color: "black",
                paddingRight: 30,
                marginTop: 16,
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: "gray",
                borderRadius: 8,
                color: "black",
                paddingRight: 30,
              },
            }}
            onValueChange={(value) => handleChangeSelect(value)}
            items={temp}
            placeholder={{ label: "Select an option...", value: null }}
          />
        </View>

        <View style={{ marginHorizontal: 24, marginTop: 16 }}>
          {locations.map((location, index) => (
            <View>
              <View
                style={{
                  borderWidth: 0.4,
                  borderColor: "#777",
                  marginTop: 12,
                  borderRadius: 12,
                  flexDirection: "row",
                  padding: 12,
                  marginBottom: 8,
                }}
              >
                <Text
                  numberOfLines={1} // Limit to 3 lines
                  ellipsizeMode="tail" // Add "..." if text overflows
                  style={{
                    fontSize: 16,
                    color: "#202124",
                    fontWeight: "bold",
                  }}
                >
                  {index + 1}.{" "}
                </Text>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text
                    numberOfLines={1} // Limit to 3 lines
                    ellipsizeMode="tail" // Add "..." if text overflows
                    style={{
                      fontSize: 16,
                      color: "#202124",
                      fontWeight: "bold",
                    }}
                  >
                    {location.name}
                  </Text>
                </View>

                {/* batas disini */}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#0064D2",
            paddingVertical: 16,
            borderRadius: 5,
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            marginHorizontal: 100,
            marginTop: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={generateOptimalRoute}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
            }}
          >
            Generate Optimal Route
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default MapViewPage;
