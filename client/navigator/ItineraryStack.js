import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREEN

import CreateItinerary from '../screens/CreateItinerary';
import ItineraryLayout from '../screens/ItineraryLayout';
import ItineraryDetScreen from '../screens/ItineraryDetScreen';
import RouteScreen from '../screens/RouteScreen'
import GroupChatScreen from '../screens/GroupChatScreen'
import InvitationScreen from '../screens/inviteUserScreen';
import ActivityDetail from '../screens/ActivityDetail'

const Stack = createStackNavigator();


export default function ItineraryStack() {
  return (

    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>

      {/* stack Itinerary */}
      <Stack.Screen name="ItineraryLayout" component={ItineraryLayout} />
      <Stack.Screen name="CreateItinerary" component={CreateItinerary} />
      <Stack.Screen name="Itinerary" component={ItineraryDetScreen} />
      <Stack.Screen name="RouteScreen" component={RouteScreen} />
      <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
      <Stack.Screen name="InviteEmailScreen" component={InvitationScreen} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetail} />

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