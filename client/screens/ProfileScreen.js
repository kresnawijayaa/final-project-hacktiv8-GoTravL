import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '../navigator/AuthContext'
import { useSelector } from 'react-redux';


const ProfileScreen = () => {
  const { setIsAuthenticated } = useAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const profile = useSelector((state) => state.dataReducer.profile)

  const profileData = {
    name: 'David Jhonson',
    bio: 'Aku adalah anak gembala selalu riang serta gembira',
    imageUrl: 'https://tintermeet.com/wp-content/uploads/2014/10/speaker-3.jpg',
    currency: 'USD 1000',
    languange: 'English'
  };


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token'); // Replace 'userToken' with your storage key
      console.log('Cleared access token')
      setIsAuthenticated(false);
      navigation.navigate("SignIn")
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.centeredView}>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}> */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          <View style={styles.modalContent}>
            <View style={styles.headerContainer}>
              <Image source={{ uri: profileData.imageUrl }} style={styles.profileImage} />
            </View>
            <ScrollView style={styles.profileInfoContainer}>
              <Text style={styles.profileName}>{profile.fullName}</Text>
              <Text style={styles.profileBio}>{profile.email}</Text>
              {/* <Text style={styles.profileBio}>{profileData.currency}</Text>
                <Text style={styles.profileBio}>{profileData.languange}</Text> */}

            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => alert('Edit profile!')}>
              <Text style={styles.closeButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                Alert.alert(
                  'Logout',
                  'Are you sure you want to log out?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Logout',
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
      {/* </Modal> */}
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Profile</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '80%',  // This will make the modal take up 80% of the screen's width.
    height: '70%',  // This will make the modal take up 70% of the screen's height.
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,  // Increase padding for more space inside the modal.
    alignItems: 'center',
    justifyContent: 'center',  // This ensures the content remains centered.
    shadowColor: '#000',
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
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  profileImage: {
    width: 150,  // Increased size from 100 to 150
    height: 150,  // Increased size from 100 to 150
    borderRadius: 75,  // Half of the width/height to ensure it remains circular
    marginBottom: 25,  // Increase the margin to space it out more
    marginRight: 15,
  },
  profileName: {
    fontSize: 24,  // Increased font size from 18 to 24
    fontWeight: 'bold',
    marginBottom: 20,  // Increase the margin to space it out more
  },
  profileBio: {
    textAlign: 'center',
    marginBottom: 30,  // Increase the margin to space it out more
    fontSize: 20,  // Increase font size for better visibility
  },
  modalContent: {
    flex: 1,  // This will make sure the content takes up the entire modal space.
    alignItems: 'center',
    justifyContent: 'space-between',  // This will space out your items inside modalContent.
  },
  editButton: {
    position: 'absolute',  // Absolute positioning
    top: 10,  // From the top
    right: 10,  // From the right
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,

  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  profileInfoContainer: {
    height: 300,  // Set a constant height for the profile info section
  },
  headerContainer: {
    flexDirection: 'row',         // set the direction to row
    justifyContent: 'space-between',  // space out the items
    alignItems: 'center',        // align items vertically
    width: '100%',               // use the full width
    marginBottom: 20,            // add some margin below
    paddingHorizontal: 20
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,            // Distance from the bottom
    left: 0,              // Distance from the left
    padding: 15,
    backgroundColor: '#2196F3', // Color for the close profile button
    borderRadius: 20,
    elevation: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  logoutButton: {
    position: 'absolute',
    bottom: 20,            // Distance from the bottom
    right: 0,             // Distance from the right
    padding: 15,
    backgroundColor: '#E53935',  // Red color for logout button
    borderRadius: 20,
    elevation: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;