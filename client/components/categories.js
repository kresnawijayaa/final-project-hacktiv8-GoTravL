import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../theme';
import { categoriesData } from '../constants';

export default function Categories() {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 15 }}>
        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: theme.text }}>Categories</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: wp(4), color: theme.text }}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
        {categoriesData.map((cat, index) => (
          <TouchableOpacity key={index} style={{ alignItems: 'center', marginRight: 15 }}>
            <Image source={cat.image} style={{ width: wp(20), height: wp(19), borderRadius: 15 }} />
            <Text style={{ fontSize: wp(3), fontWeight: 'bold', marginTop: 5 }}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
