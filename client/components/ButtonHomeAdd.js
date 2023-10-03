import React, { useState, useRef, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const App = () => {
    const navigation = useNavigation()
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const rotationValue = useRef(new Animated.Value(0)).current;

  const create = async () => {
    navigation.navigate('CreateItinerary');
    setModal1Visible(false);
    setModal2Visible(false);
  }

  const toggleModals = () => {
    setModal1Visible(!modal1Visible);
    setModal2Visible(!modal2Visible);
  };

  useEffect(() => {
    Animated.timing(rotationValue, {
      toValue: modal1Visible ? 30 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [modal1Visible]);

  const rotateButtonStyle = {
    transform: [{ rotate: rotationValue.interpolate({ inputRange: [0, 75], outputRange: ['0deg', '75deg'] }) }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, rotateButtonStyle]} onPress={toggleModals}>
          <Text style={styles.buttonText}><Octicons name="plus" size={24} color="white" /></Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modal1Visible || modal2Visible}
        onRequestClose={() => {
          Alert.alert('Modals have been closed.');
          setModal1Visible(false);
          setModal2Visible(false);
        }}>
        <TouchableWithoutFeedback onPress={() => {
          setModal1Visible(false);
          setModal2Visible(false);
        }}>
          <View style={styles.modalContainer}>
            <View style={styles.overlay} />

            {modal1Visible && (
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={create}
                  >
                  <Text style={styles.buttonText}><FontAwesome5 name="book-medical" size={24} color="black" /></Text>
                  <Text >Trip</Text>
                </TouchableOpacity>
              </View>
            )}

            {modal2Visible && (
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                //   onPress={() => setModal2Visible(!modal2Visible)}
                // onPress={() => navigation.navigate('Order')}
                  >
                  <Text><MaterialIcons name="recommend" size={24} color="black" /></Text>
                  <Text>Rec</Text>
                </Pressable>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0064D2',
    borderRadius: 50, // Make it rounder
    padding: 20, // Make it bigger
    width: 80, // Adjust width to make it bigger
    height: 80, // Adjust height to make it bigger
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40, // Adjust font size to make it bigger
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flex: 1,
  },
  buttonClose: {
    backgroundColor: '#efefef',
    marginBottom: 75,
  },
});

export default App;
