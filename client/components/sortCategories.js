import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { sortCategoryData } from '../constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../theme';

export default function SortCategories() {
  const [activeSort, setActiveSort] = useState('Popular');

  return (
    <View style={styles.container}>
      {sortCategoryData.map((sort, index) => {
        const isActive = sort === activeSort;
        const activeButtonStyle = isActive ? styles.activeButton : null;
        const activeTextStyle = isActive ? styles.activeText : null;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveSort(sort)}
            style={[styles.sortButton, activeButtonStyle]}
          >
            <Text style={[styles.sortButtonText, activeTextStyle]}>{sort}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: wp(4),
    backgroundColor: '#E5E7EB', // Set your background color here
    borderRadius: wp(8), // Adjust the border radius as needed
    padding: wp(1), // Adjust the padding as needed
    paddingHorizontal: wp(4), // Adjust the horizontal padding as needed
  },
  sortButton: {
    paddingVertical: wp(1.5), // Adjust the vertical padding as needed
    paddingHorizontal: wp(4), // Adjust the horizontal padding as needed
    borderRadius: wp(6), // Adjust the border radius as needed
  },
  sortButtonText: {
    fontSize: wp(4),
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 'bold',
  },
  activeButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  activeText: {
    color: theme.text,
  },
});
