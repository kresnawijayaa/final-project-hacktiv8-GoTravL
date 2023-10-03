import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  StyleSheet,
  ImageBackground,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import SortCategories from "../components/sortCategories";
import Destinations from "../components/destinations";
import { images, FONTS, SIZES, COLORS } from "../constants/index1";

// for modal
import { useSelector } from "react-redux";
import ExploreCard from "../components/ExploreCard";
import HeaderExplore from "../components/HeaderExplore";
import { SvgXml } from "react-native-svg";

const ios = Platform.OS == "ios";
const topMargin = ios ? hp(3) : hp(10);

export default function ExploreLayout({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const data = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      text: "Lombok",
      rating: getRandomRating(),
      voter: getRandomVoter(),
      description: getRandomDescription(),
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      text: "Bekasi Anjay",
      rating: getRandomRating(),
      voter: getRandomVoter(),
      description: getRandomDescription(),
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      text: "Rice Field",
      rating: getRandomRating(),
      voter: getRandomVoter(),
      description: getRandomDescription(),
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      text: "Phuket Thailand",
      rating: getRandomRating(),
      voter: getRandomVoter(),
      description: getRandomDescription(),
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      text: "Nusa Penida",
      rating: getRandomRating(),
      voter: getRandomVoter(),
      description: getRandomDescription(),
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      text: "Raja Ampat",
      rating: getRandomRating(),
      voter: getRandomVoter(),
      description: getRandomDescription(),
    },
    // ... other data entries
  ];

  function getRandomRating() {
    // Generate a random rating between 3 and 5
    return (Math.random() * (5 - 3) + 3).toFixed(1);
  }

  function getRandomVoter() {
    // Generate a random number of voters between 1000 and 50000
    return Math.floor(Math.random() * (50000 - 1000 + 1)) + 1000;
  }

  function getRandomDescription() {
    const descriptions = [
      "Remote setting popular for rock climbing",
      "Beautiful island with pristine beaches",
      "Famous tourist destination with rich history",
      "Great spot for scuba diving and snorkeling",
      "Lively city with vibrant nightlife",
      "Tranquil retreat for nature lovers",
    ];

    // Pick a random description from the array
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    return descriptions[randomIndex];
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderExplore />
      <View
        style={{
          marginHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingHorizontal: 10,
            marginRight: 10,
            paddingVertical: 12,
          }}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity
          // onPress={handleSignIn}
          style={{
            backgroundColor: "#0064D2",
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 100,
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            alignItems: "center",
          }}
        >
          <SvgXml
            xml={`<svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 20l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>`}
            width={20}
            height={20}
            fill="#ffffff"
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ marginLeft: 24 }}>
        {/* <View style={{ alignItems: "left" }}>
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
        </View> */}
        <View>
          <FlatList
            data={data}
            numColumns={1} // Menampilkan 2 kartu per baris
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ExploreCard
                key={index}
                imageUrl={item.imageUrl}
                text={item.text}
                rating={item.rating}
                voter={item.voter}
                description={item.description}
              />
            )}
          />
        </View>

        <View style={{ marginVertical: 4 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    paddingHorizontal: wp(0),
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginLeft: wp(5),
    marginRight: wp(5),
    borderRadius: 20,
  },
  avatarText: {
    fontSize: wp(7),
    fontWeight: "bold",
    color: "black",
  },
  avatarImage: {
    height: wp(12),
    width: wp(12),
  },
  searchBarContainer: {
    marginLeft: wp(5),
    marginRight: wp(5),
    marginBottom: hp(1),
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaefef",
    borderRadius: wp(5),
    padding: wp(2),
    paddingLeft: wp(3),
  },
  searchInput: {
    flex: 1,
    fontSize: wp(4),
    marginLeft: wp(2),
    color: "black",
  },
  categoriesContainer: {
    marginBottom: hp(1),
  },
  sortCategoriesContainer: {
    marginBottom: hp(1),
  },
  destinationsContainer: {
    flexDirection: "row", // Set the direction to row
    flexWrap: "wrap", // Allow items to wrap to new row
    justifyContent: "space-between", // Adjust as needed
    paddingHorizontal: 10, // Add padding to create spacing between items
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "80%", // This will make the modal take up 80% of the screen's width.
    height: "70%", // This will make the modal take up 70% of the screen's height.
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50, // Increase padding for more space inside the modal.
    alignItems: "center",
    justifyContent: "center", // This ensures the content remains centered.
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  profileImage: {
    width: 150, // Increased size from 100 to 150
    height: 150, // Increased size from 100 to 150
    borderRadius: 75, // Half of the width/height to ensure it remains circular
    marginBottom: 25, // Increase the margin to space it out more
    marginRight: 15,
  },
  profileName: {
    fontSize: 24, // Increased font size from 18 to 24
    fontWeight: "bold",
    marginBottom: 20, // Increase the margin to space it out more
  },
  profileBio: {
    textAlign: "center",
    marginBottom: 30, // Increase the margin to space it out more
    fontSize: 20, // Increase font size for better visibility
  },
  modalContent: {
    flex: 1, // This will make sure the content takes up the entire modal space.
    alignItems: "center",
    justifyContent: "space-between", // This will space out your items inside modalContent.
  },
  editButton: {
    position: "absolute", // Absolute positioning
    top: 10, // From the top
    right: 10, // From the right
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  profileInfoContainer: {
    height: 300, // Set a constant height for the profile info section
  },
  headerContainer: {
    flexDirection: "row", // set the direction to row
    justifyContent: "space-between", // space out the items
    alignItems: "center", // align items vertically
    width: "100%", // use the full width
    marginBottom: 20, // add some margin below
    paddingHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    bottom: 20, // Distance from the bottom
    left: 0, // Distance from the left
    padding: 15,
    backgroundColor: "#2196F3", // Color for the close profile button
    borderRadius: 20,
    elevation: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  logoutButton: {
    position: "absolute",
    bottom: 20, // Distance from the bottom
    right: 0, // Distance from the right
    padding: 15,
    backgroundColor: "#E53935", // Red color for logout button
    borderRadius: 20,
    elevation: 5,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
