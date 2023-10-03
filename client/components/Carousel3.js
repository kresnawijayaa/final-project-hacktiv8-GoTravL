import React from 'react';
import { View, Image, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';

const { width } = Dimensions.get("window");
const height = width * 0.6; // 60%
// locationId[0].images[0]
export default function Carousel3({ publicPost }) {
    const [active, setActive] = React.useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (slide !== active) {
            setActive(slide);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled
                horizontal
                onMomentumScrollEnd={change}
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}
            >
                {publicPost.map((dayPosts, index) => (
                    <View key={index} style={styles.dayContainer}>
                        {dayPosts.map((post, postIndex) => (
                            <Image
                                key={postIndex}
                                source={{ uri: post.locationId[0].images[0] }}
                                style={styles.image}
                            />
                        ))}
                    </View>
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {publicPost.map((_, pageIndex) => (
                    <Text
                        key={pageIndex}
                        style={
                            pageIndex === active
                                ? styles.pagingActiveText
                                : styles.pagingText
                        }
                    >
                        {' • '}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: 10, width, height },
    scroll: { width, height },
    dayContainer: { flexDirection: 'row' },
    image: {
        width,
        height: '100%',
        padding: 10,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    pagingText: { fontSize: width / 30, color: '#888', margin: 3 },
    pagingActiveText: { fontSize: width / 30, color: '#fff', margin: 3 },
});
