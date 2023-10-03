import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const Header = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const profile = useSelector((state) => state.dataReducer.profile);
  const navigation = useNavigation()

  const handleLogout = async () => {
    await AsyncStorage.removeItem("id")
    await AsyncStorage.removeItem("access_token")
    navigation.navigate('SignIn');
  }
  const profileData = {
    name: "David Jhonson",
    bio: "Aku adalah anak gembala selalu riang serta gembira",
    imageUrl: "https://tintermeet.com/wp-content/uploads/2014/10/speaker-3.jpg",
    // description: `Let's go explore everything !!`,
    languange: "English",
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 2,
        borderRadius: 5,
        justifyContent: "space-between",
        overflow: "hidden",
        height: 84,
        paddingBottom: 6,
        // backgroundColor: "red",
      }}
    >
      <Image
        source={require("../assets/images/Logo-05.png")}
        style={{
          width: 160,
          height: 80,
          marginLeft: 20,
        }}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          }}
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 100,
            height: 54,
            width: 54,
            marginRight: 20,
          }}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: profileData.imageUrl }}
                  style={styles.profileImage}
                />
              </View>
              <ScrollView style={styles.profileInfoContainer}>
                <Text style={styles.profileName}>{profile.fullName}</Text>
                <Text style={styles.profileBio}>{profile.email}</Text>
                <Text style={styles.profileBio}>{profileData.description}</Text>
                {/* <Text style={styles.profileBio}>{profileData.languange}</Text> */}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                // onPress={() => alert('Edit profile!')}
                // onPress={() => setModalVisible(false)}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  Alert.alert(
                    "Logout",
                    "Are you sure you want to log out?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Logout",
                        onPress: async () => {
                          await handleLogout(); // Call the logout function received as a prop
                          // navigation.navigate('AuthStack'); // Navigate to the authentication stack
                          setModalVisible(false); // Close the modal
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

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
    width: "70%", // This will make the modal take up 80% of the screen's width.
    height: "40%", // This will make the modal take up 70% of the screen's height.
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
    fontWeight: "600",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  profileImage: {
    width: 100, // Increased size from 100 to 150
    height: 100, // Increased size from 100 to 150
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
