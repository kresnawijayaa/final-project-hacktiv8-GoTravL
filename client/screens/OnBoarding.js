
import { View, SafeAreaView, Image, ActivityIndicator, TouchableOpacity, StyleSheet, Text } from 'react-native';


import BackgroundAnimation from '../animated';
import { COLORS, images, SIZES } from '../constants/index1';


export default function OnBoarding() {
    
  return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white}}>
        <SafeAreaView>
            <View style={{paddingVertical: SIZES.padding, }}>
                <Image 
                    source={images.logo}
                    resizeMode="contain"
                    style={{
                    height: 250,
                    width: 500,
                    opacity: 1
                }}
                />
                <ActivityIndicator style={{marginTop: 20}} size="large" color={COLORS.signup}/>
                {/* <TouchableOpacity style={{
                                flexDirection: "row",
                                alignContent: "center",
                                justifyContent: "center",
                                height: 55,
                                marginHorizontal: 30,
                                marginTop: 40,
                                marginBottom: -20,
                                paddingHorizontal: SIZES.radius,
                                borderRadius: 50,
                                backgroundColor: COLORS.primary,
                                ...styles.shadow
                            }}
                            // onPress={handleSignIn}
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
                                    >Sign In</Text>
                                </View>
                            </TouchableOpacity> */}
            </View>

        </SafeAreaView>
        <BackgroundAnimation />
        </View>
  );
}


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
    }
})