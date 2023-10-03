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
import React, { useState, useEffect, useRef } from "react";
import { firebase } from "../config/config.js";
import { useSelector } from "react-redux";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";


const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    const isChatAtBottom = setIsAtBottom(isChatAtBottom); // Logika untuk memeriksa apakah chat sudah paling bawah
};


export function GroupChat({ route }) {
    const navigation = useNavigation();
    const [isAtBottom, setIsAtBottom] = useState(false);
    const { roomid, title } = route.params;
    const profile = useSelector((state) => state.dataReducer.profile)
    const currentUser = profile.fullName; // contoh ID user yang sedang login
    const tripId = roomid; // contoh ID room yang sedang aktif
    const todoRef = firebase.firestore().collection("GroupChat").doc(tripId).collection("messages");
    const [chatData, setChatData] = useState("");
    const [chatList, setChatList] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");
    const [isBotTyping, setIsBotTyping] = useState(false);
    const scrollViewRef = useRef();

    useEffect(() => {
        const unsubscribe = todoRef
            .orderBy("createdAt", "asc")
            .onSnapshot((querySnapshot) => {
                const newChatData = [];
                querySnapshot.forEach((doc) => {
                    newChatData.push({
                        id: doc.id,
                        from: currentUser,
                        ...doc.data(),
                    });
                });
                setChatList(newChatData);
            });

        return () => unsubscribe();
    }, []);

    const handleBotResponse = (message) => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            from: "Bot",
            message: message,
            createdAt: timestamp,
        };
    }

    const chatField = () => {
        if (chatData == "halo") {
            handleBotResponse("halo juga");
        }
        if (chatData && chatData.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                from: currentUser, // Ini sudah benar, pesan dari currentUser
                message: chatData,
                createdAt: timestamp,
            };

            todoRef.add(data)
            setChatData("");
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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.header}>
                <View style={{ backgroundColor: "white", borderRadius: 100 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButtonIcon}
                    >
                        <ChevronLeftIcon size={wp(5)} strokeWidth={3} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>{title}</Text>
            </View>

            <ScrollView ref={scrollViewRef} contentContainerStyle={{ padding: 10 }}>
                {chatList.map((chat) => {
                    const isBot = chat.from !== currentUser;
                    const messageStyle = isBot ? styles.messageBot : styles.messageRight;

                    return (
                        <View key={chat.id} style={[styles.chatBox, messageStyle]}>
                            <Text style={{ fontWeight: "bold" }}>{chat.from}:</Text>
                            <Text>{chat.message}</Text>
                            <Text style={{ fontSize: 10, color: "gray", marginTop: 10 }}>
                                {formatDate(chat.createdAt)}
                            </Text>
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

export default GroupChat;