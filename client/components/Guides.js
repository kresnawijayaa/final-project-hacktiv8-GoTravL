import React from 'react';
import { FlatList } from 'react-native';
import GuideCard from './GuideCard';

const Guides = ({ guidesData }) => {
    return (
        <FlatList
            data={guidesData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <GuideCard guide={item} />
            )}
        />
    );
};

export default Guides;
