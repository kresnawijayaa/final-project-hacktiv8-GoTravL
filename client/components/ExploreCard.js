import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Assuming you want to use the FontAwesome icons

const screenWidth = Dimensions.get("window").width;

const Card = ({ imageUrl, text, rating, voter, description }) => {
  // Calculate the number of filled stars
  const filledStars = Math.floor(rating);

  // Determine if there's a half star
  const hasHalfStar = rating - filledStars >= 0.5;

  // Calculate the number of empty stars
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  // Create an array to store star icons
  const stars = [];

  // Add filled star icons
  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <Icon name="star" key={`star-filled-${i}`} style={styles.starIcon} />
    );
  }

  // Add half star icon if applicable
  if (hasHalfStar) {
    stars.push(
      <Icon name="star-half" key="star-half" style={styles.starIcon} />
    );
  }

  // Add empty star icons
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Icon name="star-o" key={`star-empty-${i}`} style={styles.starIcon} />
    );
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      <Text style={styles.cardText}>{text}</Text>
      <View style={styles.starContainer}>
        <Text style={styles.cardRating}>{rating}</Text>
        {stars}
        <Text style={styles.cardRating}>
          ({parseInt(voter).toLocaleString()})
        </Text>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth - 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "white",
    marginRight: 14,
    marginBottom: 20,
  },
  cardImage: {
    width: screenWidth - 48,
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardText: {
    marginHorizontal: 12,
    fontSize: 22,
    fontWeight: "400",
    marginTop: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 6,
    marginHorizontal: 8,
  },
  starIcon: {
    marginTop: 3,
    fontSize: 16,
    color: "gold",
  },
  cardRating: {
    marginHorizontal: 6,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    color: "gray",
  },
  cardDescription: {
    marginBottom: 12,
    marginHorizontal: 12,
    fontSize: 14,
    lineHeight: 20,
    color: "gray",
  },
});

export default Card;
