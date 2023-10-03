import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ imageUrl, text }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "white",
    marginRight: 16,
  },
  cardImage: {
    width: 260,
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "400",
    margin: 12,
    lineHeight: 24,
  },
});

export default Card;
