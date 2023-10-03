// CardComponent.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AiComponent = ({ imageUrl, buttonText, onButtonPress }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />

            <View style={styles.rightContainer}>
                <Text style={styles.topText}>Ask Manesty Ai</Text>
                <View style={styles.spacer} />
                <TouchableOpacity style={styles.button} onPress={onButtonPress}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex:2,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        margin: 10,
        overflow: 'hidden',
        height: 145,
    },
    image: {
        flex:1,
        height: "100%",
        resizeMode: 'cover',
    },
    rightContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    topText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    spacer: {
        flex: 1,
    },
    button: {
        alignSelf: 'flex-end',
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AiComponent;
