import React, { useState } from "react";
import { View, Button } from "react-native";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen"; // Asumsikan Anda menyimpannya di file yang sama

const LoadingComponent = () => {
    return (
        <View style={{ flex: 1 }}>
            <LoadingScreen />
        </View>
    );
};

export default LoadingComponent;
