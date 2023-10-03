import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

// import auth from '@react-native-firebase/auth';
import { images, FONTS, SIZES, COLORS } from "../constants/index1";

const SignUp = ({ navigation }) => {

    const [data, setData] = React.useState({
        password: '',
        checkTextInputChange: false,
        secureTextEntry: true,
    });

    const [fullName, setfullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [fullNameError, setfullNameError] = React.useState(false)
    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [phoneNumberError, setPhoneNumberError] = React.useState(false)

    const handleSignUp = async () => {
        try {
            // 1. Make a POST request to the server with the fullName, email, and password
            // const response = await axios.post('https://26b1-2400-9800-362-15ab-3560-11f5-f98f-fb27.ngrok-free.app/register', {
            const response = await axios.post('http://localhost:3099/register', {
                email: email,
                password: password,
                fullName: fullName
            });
    
            // 2. Check if the server response has access_token
            if (response.data.access_token) {
                // Store the access_token using AsyncStorage. This token can be used for login.
                await AsyncStorage.setItem('access_token', response.data.access_token);
    
                console.log('User registered successfully and received access_token.');
                navigation.navigate("SignIn"); // Redirect to the sign-in screen after successful registration
            } else {
                throw new Error("No access token received");
            }
    
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.data && error.response.data.message) {
                console.error("Server Response:", error.response.data.message);
            }
        }
    }

    // this is an auth state change for utilizing a database, specifically Firebase, that pushes the user's primary screen to Home after logging in (remove if you do not plan on implementing Firebase).

    // React.useEffect(() => {
    //     const unsubscribe = auth().onAuthStateChanged(user => {
    //         if(user) {
    //             navigation.replace("Home")
    //         }
    //     })

    //     return unsubscribe
    // }, []);


    // this const handles sign in protocol for the Firebase database to authenticate the user properly - if you wish to utilize, install Firebase and uncomment, else, remove.

    // const handleSignUp = async () => {
    //     try {
    //         // You can store user data in AsyncStorage here
    //         await AsyncStorage.setItem('fullName', fullName);
    //         await AsyncStorage.setItem('email', email);
    //         // await AsyncStorage.setItem('password', password);
    //         // await AsyncStorage.setItem('phoneNumber', phoneNumber);
    
    //         // You can add more fields if needed
    
    //         console.log('User data saved', fullName, '<', email, '<<',password);
    //         navigation.navigate("SignIn"); // Redirect to the sign-in screen after successful sign-up
    //     } catch (error) {
    //         console.error("Error during sign up:", error);
    //     }
    // }

    // const handleSignUp = () => {
    //     auth()
    //     .SignUpWithEmailAndPassword(fullName, phoneNumber, email, password)
    //     .then(userCredentials => {
    //         const user = userCredentials.user;
    //         console.log('User signed in with', user.email);
    //         navigation.replace("Home")
    //       })
    //       .catch(error => {
    //         if (error.code === 'auth/email-already-in-use') {
    //           console.log('That email address is already in use!');
    //         }
        
    //         if (error.code === 'auth/invalid-email') {
    //             setEmailError(true);
    //             console.log('That email address is invalid!');
    //         }

    //         if (error.code === 'auth/wrong-password') {
    //             console.log('That email address is invalid!');
    //             setPasswordError(true);
    //           }
        
    //         console.error(error);
    //       });
    //        setEmailError(false)
    //        setPasswordError(false)
    //        setfullNameError(false)
    //        setphoneNumberError(false)
    // }


    // replaces password text with * on active
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    return (
        // <ImageBackground
        //         source={images.background}
        //         resizeMode='cover'
        //         style={{flex:1, paddingVertical: SIZES.padding, justifyContent: 'center'}}
        //     >
            
            <SafeAreaView>
                <KeyboardAwareScrollView>
                    <View 
                    style={{
                        flex: 1,
                    }}
                    >
                        <View
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <Image 
                                source={images.logo}
                                resizeMode="contain"
                                style={{
                                    height: 250,
                                    width: 500,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 3,
                                paddingHorizontal: 20,
                                paddingVertical: 30,
                                marginBottom: -10,
                            }}
                        >

                            <Text style={styles.textAbove}>Full Name</Text>
                            <View style={styles.textBoxSign}>
                                {/* <Image source={images.person} resizeMode="contain" style={{ width: 26, height: 40, right: 2, alignSelf: 'flex-start'}}/> */}
                                <TextInput 
                                    placeholder="Enter your Full Name..."
                                    onChangeText={(value) => setfullName(value)}
                                    autoCapitalize={"none"}
                                    style={{
                                        flex: 1,
                                        height: 40.5,
                                        fontSize: 15,
                                        marginLeft: 2,
                                    }}
                                />
                            </View>
                            <Text style={styles.textAbove}>Email</Text>
                            <View style={styles.textBoxSign}>
                                {/* <Image source={images.person} resizeMode="contain" style={{ width: 26, height: 40, right: 2, alignSelf: 'flex-start'}}/> */}
                                <TextInput 
                                    placeholder="Enter your email..."
                                    onChangeText={(value) => setEmail(value)}
                                    autoCapitalize={"none"}
                                    style={{
                                        flex: 1,
                                        height: 40.5,
                                        fontSize: 15,
                                        marginLeft: 2,
                                    }}
                                />
                            </View>
                            <Text style={styles.textAbove}>Password</Text>
                            <View style={styles.textBoxSign}> 
                                <Image source={images.lock} resizeMode="contain" style={{ width: 25, height: 20, top: 10, alignSelf: 'flex-start'}}/>
                                <TextInput 
                                    placeholder="Enter your password..."
                                    secureTextEntry={data.secureTextEntry ? true : false}
                                    onChangeText={(value) => setPassword(value)}
                                    style={{
                                        flex: 1,
                                        height: 40.5,
                                        fontSize: 15,
                                        marginLeft: 5
                                    }}
                                />
                                <TouchableOpacity onPress={updateSecureTextEntry} style={{ alignItems: 'flex-end'}}>
                                    {data.secureTextEntry ? 
                                    <Image source={images.eyeclosed} resizeMode="contain" style={{ width: 25, height: 40}}/>
                                    :
                                    <Image source={images.eye} resizeMode="contain" style={{ width: 25, height: 40}}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            {/* <Text style={styles.textAbove}>Phone Number</Text> */}
                            {/* <View style={styles.textBoxSign}>
                                <Image source={images.person} resizeMode="contain" style={{ width: 26, height: 40, right: 2, alignSelf: 'flex-start'}}/>
                                <TextInput 
                                    placeholder="Enter your phone number..."
                                    onChangeText={(value) => setPhoneNumber(value)}
                                    autoCapitalize={"none"}
                                    style={{
                                        flex: 1,
                                        height: 40.5,
                                        fontSize: 15,
                                        marginLeft: 2,
                                    }}
                                />
                            </View> */}
                            
                            <TouchableOpacity style={{
                                flexDirection: "row",
                                alignContent: "center",
                                justifyContent: "center",
                                height: 55,
                                marginHorizontal: 30,
                                marginTop: 40,
                                marginBottom: -20,
                                paddingHorizontal: SIZES.radius,
                                borderRadius: 50,
                                backgroundColor: COLORS.signup,
                                ...styles.shadow
                            }}
                            onPress={handleSignUp}
                            >
                                <View >
                                    <Text 
                                        style={{
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            top: 10,
                                            color: COLORS.white,
                                            fontSize: 30
                                        }}
                                    >Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.radius * 2.5,
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={{ color: COLORS.gray, ...FONTS.body3}}>Already have an account? </Text>

                                <TouchableOpacity
                                    style={{ alignItems: 'center', justifyContent: 'center'}}
                                    onPress={() => navigation.navigate("SignIn")}
                                >
                                    <Text
                                        style={{
                                            color: COLORS.signup,
                                            fontSize: 16,
                                        }}
                                    >Sign In</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 15, justifyContent: 'center', marginBottom: 5}}>
                                <TouchableOpacity style={{
                                    flexDirection: "row",
                                    alignContent: "center",
                                    justifyContent: "center",
                                    height: 65,
                                    width: 120,
                                    marginHorizontal: 20,
                                    marginBottom: -20,
                                    borderRadius: 50,
                                    backgroundColor: COLORS.white,
                                    elevation: 1,
                                    ...styles.shadow
                                }}>
                                    <Image 
                                        source={images.google}
                                        style={{
                                            alignSelf: "center",
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flexDirection: "row",
                                    alignContent: "center",
                                    justifyContent: "center",
                                    height: 65,
                                    width: 120,
                                    marginHorizontal: 20,
                                    marginBottom: -20,
                                    borderRadius: 50,
                                    backgroundColor: "#4267B2",
                                    elevation: 1, 
                                    ...styles.shadow
                                }}>
                                    <Text style={{color: COLORS.white, alignSelf: 'center', fontSize: 40, fontWeight: 'bold'}}>f</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        // </ImageBackground>

    )
}

export default SignUp;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000", // for iphone drop shadow (specifies the android equivalent, elevation: 1)
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1
    },
    textBoxSign: {
        flexDirection: "row",
        height: 45,
        marginHorizontal: 5,
        marginTop: 5,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        elevation: 2,

    },
    textAbove: {fontSize: 14, marginLeft: 12},
    
})