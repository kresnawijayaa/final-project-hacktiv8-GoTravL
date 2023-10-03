import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Platform, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { images, FONTS, SIZES, COLORS } from "../constants/index1";
const ios = Platform.OS == 'ios';



export default function DestinationScreen(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);

    return (
        // <ImageBackground
        //     source={images.background}
        //     resizeMode='cover'
        //     style={{ flex: 1, paddingVertical: SIZES.padding, justifyContent: 'center' }} >
            <View style={styles.container}>
                {/* Destination image */}
                <Image source={item.image} style={styles.image} />
                <StatusBar style={'light'} />

                {/* Back button and favorite button */}
                <SafeAreaView style={styles.backButton}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButtonIcon}
                    >
                        <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => toggleFavourite(!isFavourite)}
                        style={styles.favoriteButton}
                    >
                        <HeartIcon size={wp(7)} strokeWidth={4} color={isFavourite ? "red" : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>

                {/* Title, description, and info */}
                <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>
                            {item?.title}
                        </Text>
                        <Text style={styles.description}>
                            {item?.longDescription}
                        </Text>

                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <ClockIcon size={wp(7)} color="skyblue" style={styles.infoIcon} />
                                <View>
                                    <Text style={styles.infoText}>{item.duration}</Text>
                                    <Text style={styles.infoLabel}>Duration</Text>
                                </View>
                            </View>
                            <View style={styles.infoItem}>
                                <MapPinIcon size={wp(7)} color="#f87171" style={styles.infoIcon} />
                                <View>
                                    <Text style={styles.infoText}>{item.distance}</Text>
                                    <Text style={styles.infoLabel}>Distance</Text>
                                </View>
                            </View>
                            <View style={styles.infoItem}>
                                <SunIcon size={wp(7)} color="orange" style={styles.infoIcon} />
                                <View>
                                    <Text style={styles.infoText}>{item.weather}</Text>
                                    <Text style={styles.infoLabel}>Sunny</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        // </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: wp(100),
        height: hp(55),
    },
    backButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
    },
    backButtonIcon: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: wp(2),
        borderRadius: wp(4),
        marginLeft: wp(4),
    },
    favoriteButton: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: wp(2),
        borderRadius: wp(4),
        marginRight: wp(4),
    },
    title: {
        fontSize: wp(7),
        fontWeight: 'bold',
        color: theme.text,
        marginTop: hp(3),
        paddingHorizontal: wp(5),
    },
    description: {
        fontSize: wp(3.7),
        marginBottom: -10,
        color: theme.text,
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(5),
        marginTop: 20,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        marginRight: wp(3),
    },
    infoText: {
        fontSize: wp(4.5),
        fontWeight: 'bold',
        color: theme.text,
    },
    infoLabel: {
        fontSize: wp(3.5),
        color: 'gray',
    },
});