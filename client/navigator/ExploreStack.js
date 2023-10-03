import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREEN
import ExploreLayout from '../screens/ExploreLayout';
import DestinationScreen from '../screens/DestinationScreen';
import ProfileScreen from '../screens/ProfileScreen';
const Stack = createStackNavigator();


export default function ItineraryStack() {
  return (

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {/* stack Explore */}
        <Stack.Screen name="ExploreLayout" component={ExploreLayout} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "black",
    padding: 10,
    margin: 15,
    alignItems: "center",
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});