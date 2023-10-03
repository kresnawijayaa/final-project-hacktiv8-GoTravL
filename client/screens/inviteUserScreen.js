import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { inviteUser } from "../store/actionCreator";

export default function InvitationScreen({ navigation, route }) {
    const { tripId } = route.params
    const access_token = useSelector((state) => state.dataReducer.access_token)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");

    // Contoh daftar email yang sudah terdaftar
    const registeredEmails = ["admin@mail.com", "kresna@mail.com"];

    const sendInvitation = () => {
        dispatch(inviteUser(access_token, email, tripId))
        if (email === "") {
            Alert.alert("Kesalahan", "Alamat email tidak boleh kosong");
            return;
        }

        if (!registeredEmails.includes(email)) {
            // Simulasikan pengiriman email
            Alert.alert("Sukses", "Undangan berhasil dikirim");
            navigation.goBack();

        } else {
            Alert.alert(
                "Kesalahan",
                "Email sudah terdaftar dan tidak bisa menerima undangan lagi"
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: "https://img.freepik.com/premium-vector/email-messagingemail-marketing-campaignflat-design-icon-vector-illustration_183665-226.jpg?w=740",
                    }}
                    style={styles.imageStyle}
                    resizeMode="contain"
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Masukkan alamat email"
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.buttonStyle} onPress={sendInvitation}>
                <Text style={styles.buttonText}>Kirim Undangan</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        // marginTop: 20,
    },
    imageContainer: {
        marginVertical: 20,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80,

    },
    imageStyle: {
        width: 320,
        height: 320,
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        marginBottom: 20,
        marginHorizontal: 40,
    },
    buttonStyle: {
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        alignSelf: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});
