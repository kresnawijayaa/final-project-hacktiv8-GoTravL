import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  Button,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postItinerary, postItineraryByBot } from "../store/actionCreator";
import { CheckBox } from "@react-native-community/checkbox";
import { SvgXml } from "react-native-svg";

export default function CreateItinerary({ navigation }) {
  const [isInputsDisabled, setInputsDisabled] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isSelected, setSelection] = useState(false);

  // FOR IS PUBLIC
  const [isEnabledP, setIsEnabledP] = useState(false);
  const toggleSwitchP = () =>
    setIsEnabledP((previousStateP) => !previousStateP);

  const access_token = useSelector((state) => state.dataReducer.access_token);
  const userId = useSelector((state) => state.dataReducer.userId);
  const addedTripId = useSelector((state) => state.dataReducer.addedTripId);

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleOnPressEndDate = () => {
    setOpenEndDatePicker(!openEndDatePicker);
  };

  // AXIOS FOR POST ITINERARY
  const handleSubmit = async () => {
    try {
      const itineraryData = {
        title: title,
        description: description,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        isPublic: false,
        isEnabled,
        city,
        userId
      };
      if (isEnabled) {
        console.log(access_token, "<<<<<<<<<<")
        await dispatch(postItineraryByBot(itineraryData, access_token));
        navigation.navigate("Itinerary", addedTripId);
      } else {
        console.log(isEnabled)
        await dispatch(postItinerary(access_token, itineraryData));
        navigation.navigate("Itinerary", addedTripId);
      }

      // onPress={() => navigation.navigate('Itinerary', { ...item })}
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ height: 42 }}></View>
      <ScrollView
        contentContainerStyle={{
          marginTop: 12,
          height: 1000,
        }}
      >
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
            top: 36, // Menyesuaikan posisi vertikal tombol kembali
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
        <View style={{ alignItems: "center", marginTop: 28 }}>
          <Text
            style={{
              fontSize: 24,
              marginVertical: 4,
              fontWeight: "600",
              color: "#202124",
            }}
          >
            Create Itinerary
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginVertical: 4,
              fontWeight: "500",
              color: "#202124",
            }}
          >
            Itinerary for best vacations plan
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "left",
            width: "100%",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              paddingTop: 10,
              textAlign: "left",
              marginLeft: 18,
            }}
          >
            Title
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            editable={!isInputsDisabled}
            value={title}
            onChangeText={setTitle}
          />
          <Text
            style={{
              fontSize: 18,
              paddingTop: 10,
              textAlign: "left",
              marginLeft: 18,
            }}
          >
            Description
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={[styles.input, { height: 100 }]}
            placeholder="Description"
            editable={!isInputsDisabled}
            value={description}
            onChangeText={setDescription}
          />

          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              paddingTop: 10,
              textAlign: "left",
              marginLeft: 18,
            }}
          >
            City
          </Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            editable={!isInputsDisabled}
            value={city}
            onChangeText={setCity}
          />

          <View style={{ width: "100%", paddingHorizontal: 22, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 18 }}>Start Date</Text>
              <TouchableOpacity
                style={styles.inputBtn}
                onPress={handleOnPressStartDate}
              >
                <Text>{selectedStartDate}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ fontSize: 18, paddingTop: 10 }}>End Date</Text>
              <TouchableOpacity
                style={styles.inputBtn}
                onPress={handleOnPressEndDate}
              >
                <Text>{selectedEndDate}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={styles.switchText}>
                Auto generate destination with AI
              </Text>
            </View>
            <View style={styles.switchContainerP}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabledP ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchP}
                value={isEnabledP}
              />
              <Text style={styles.switchText}>
                Share Itinerary with the Public
              </Text>
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
              <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={openEndDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={
                    selectedStartDate ? selectedStartDate : startDate
                  }
                  selected={selectedEndDate}
                  onDateChanged={(date) => setSelectedEndDate(date)}
                  onSelectedChange={(date) => setSelectedEndDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />
                <TouchableOpacity onPress={handleOnPressEndDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 16,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    width: "90%", // This will give it a consistent width with the City TextInput
    alignSelf: "center", // This will center the button
    marginTop: 4,
    marginBottom: 14,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  switchContainerP: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  switchText: {
    marginLeft: 10,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  dateInput: {
    width: 110,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // latar belakang setengah transparan
  },
  modalView: {
    width: "80%", // Anda bisa menyesuaikan lebar modal
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20, // Tambahkan borderRadius jika Anda ingin sudut modal membulat
  },
  textHeader: {
    fontSize: 30,
    marginVertical: 10,
    marginTop: 50,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 20,
    color: "#111",
    marginBottom: 0,
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  submitBtn: {
    backgroundColor: "#0064D2",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 80,
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerC: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainerC: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkboxC: {
    alignSelf: "center",
  },
  labelC: {
    margin: 8,
  },
});
