import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { firebase } from "../config/config.js";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../constants/config.js";

const AiChatScreen = () => {
  const navigation = useNavigation();
  const currentUser = "user123"; // contoh ID user yang sedang login

  const todoRef = firebase.firestore().collection("newBot");
  const [chatData, setChatData] = useState("");
  const [chatList, setChatList] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const scrollViewRef = useRef();
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });

    const unsubscribe = todoRef
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const newChatData = [];
        querySnapshot.forEach((doc) => {
          newChatData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setChatList(newChatData);
      });

    // Unmount logic
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // ...

    // Scroll to the end after component mounts
    scrollViewRef.current?.scrollToEnd({ animated: true });

    // ...
  }, [chatList]);

  const chatField = () => {
    if (chatData && chatData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        from: currentUser, // Ini sudah benar, pesan dari currentUser
        to: "Bot", // Menetapkan tujuan ke "Bot"
        message: chatData,
        createdAt: timestamp,
      };

      todoRef
        .add(data)
        .then(() => {
          setChatData("");
          Keyboard.dismiss();
          setIsBotTyping(true);

          // Send data to your endpoint
          fetch(BASE_URL + "/openai/ask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ chat: data.message }),
          })
            .then((response) => response.json())
            .then((dataRes) => {
              const botMessage = {
                from: "Bot",
                to: currentUser,
                message: dataRes.message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              };

              todoRef
                .add(botMessage)
                .then(() => {
                  setIsBotTyping(false); // bot selesai mengetik
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                })
                .catch((error) => {
                  setIsBotTyping(false);
                  console.error(
                    "Error adding bot's response to the database:",
                    error
                  );
                  alert(error.message);
                });
            })
            .catch((error) => {
              setIsBotTyping(false);
              console.error("Error posting to endpoint:", error);
            });
        })
        .catch((error) => {
          console.error("Error adding chat:", error);
          alert(error.message);
        });
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = timestamp.toDate();
      return `${date.getDate()}/${date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
    return "";
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    const isChatAtBottom = setIsAtBottom(isChatAtBottom); // Logika untuk memeriksa apakah chat sudah paling bawah
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <View style={{ backgroundColor: "white", borderRadius: 100 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={styles.backButtonIcon}
          >
            <ChevronLeftIcon size={wp(5)} strokeWidth={3} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Manesty AI</Text>
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={{ padding: 10 }}>
        {chatList.map((chat) => {
          const isBot = chat.from === "Bot";
          const messageStyle = isBot ? styles.messageBot : styles.messageRight;

          return (
            <View key={chat.id} style={[styles.chatBox, messageStyle]}>
              {isBot ? (
                <View>
                  <Text style={{ fontWeight: "bold" }}>{chat.from}:</Text>
                </View>
              ) : (
                <></>
              )}
              <View>
                <Text
                  style={{ color: "#404142", fontSize: 14, lineHeight: 20 }}
                >
                  {chat.message}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 10, color: "gray", marginTop: 12 }}>
                  {formatDate(chat.createdAt)}
                </Text>
              </View>
            </View>
          );
        })}

        {isBotTyping && (
          <View style={[styles.chatBox, styles.messageBot]}>
            <Text>Bot is typing...</Text>
          </View>
        )}
      </ScrollView>

      {!isAtBottom && (
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity
            onPress={scrollToBottom}
            style={styles.floatingButton}
          >
            <Text style={styles.floatingButtonText}>↓</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message..."
          placeholderTextColor={"#aaaaaa"}
          onChangeText={(text) => setChatData(text)}
          value={chatData}
          multiline={true}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={chatField}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0064D2",
    paddingHorizontal: 15,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
    flexDirection: "row", // Mengatur tata letak elemen secara horizontal
    justifyContent: "center", // Mengatur tata letak elemen secara horizontal
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButtonIcon: {
    position: "absolute", // Mengatur posisi tombol kembali
    left: -120, // Menyesuaikan posisi horizontal tombol kembali
    top: -10, // Menyesuaikan posisi vertikal tombol kembali
    zIndex: 2, // Pastikan tombol kembali berada di atas elemen header lainnya
  },
  formContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#f7f7f7",
    gap: 10,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    paddingTop: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#0064D2",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  chatBox: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignSelf: "flex-start",
    maxWidth: 400,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chatBox: {
    flexDirection: "row",
    margin: 10,
    padding: 20,
    borderRadius: 5,
    maxWidth: 320,
    flexWrap: "wrap",
  },
  messageLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#e6e6e6",
    maxWidth: 400,
  },
  messageRight: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    maxWidth: 260,
  },
  messageBot: {
    alignSelf: "flex-start",
    backgroundColor: "#CAEBFC",
    borderColor: "#0064D2",
    borderWidth: 0.2,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 100,
    right: 20,
    zIndex: 1,
  },
  floatingButton: {
    backgroundColor: "#0064D2",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AiChatScreen;
