import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';


export default function Home({ navigation }) {
    const logout = async () => {
        await AsyncStorage.clear()
        navigation.navigate('Login');
    }
    return (
        <View style={styles.container}>
            <StatusBar style='auto'></StatusBar>
            <Text>Home</Text>
            <Button onPress={logout} title='Logout'></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
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
