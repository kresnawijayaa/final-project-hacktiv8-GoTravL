import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { destinationData } from '../constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function Destinations() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {destinationData.map((item, index) => (
                <DestinationCard navigation={navigation} item={item} key={index} />
            ))}
        </View>
    );
}

const DestinationCard = ({ item, navigation }) => {
    const [isFavourite, toggleFavourite] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Destination', { ...item })}
            style={styles.destinationCard}
        >
            <Image source={item.image} style={styles.destinationImage} />

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />

            <TouchableOpacity
                onPress={() => toggleFavourite(!isFavourite)}
                style={styles.favouriteButton}
            >
                <HeartIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.shortDescription}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: wp(2),
        justifyContent: 'space-between',
    },
    destinationCard: {
        width: '48%',
        height: wp(69),
        position: 'relative',
        padding: wp(4),
        paddingBottom: wp(6),
        marginBottom: wp(5),
    },
    destinationImage: {
        width: wp(44),
        height: wp(69),
        borderRadius: 35,
        position: 'absolute',
    },
    gradient: {
        width: wp(44),
        height: hp(20),
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        position: 'absolute',
        bottom: 0,
    },
    favouriteButton: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        position: 'absolute',
        top: wp(1),
        right: wp(3),
        borderRadius: wp(5),
        padding: wp(3),
    },
    title: {
        fontSize: wp(4),
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset (you can adjust this)
        textShadowRadius: 2, // Shadow radius (you can adjust this)
    },
    description: {
        fontSize: wp(2.2),
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset (you can adjust this)
        textShadowRadius: 2, // Shadow radius (you can adjust this)
    },
});
