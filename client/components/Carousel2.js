import React from 'react'
import { View, Image, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


const { width } = Dimensions.get("window");
const image = useSelector(

)
const height = width * 0.6 //60%
const images = [
    'https://images.pexels.com/photos/1024989/pexels-photo-1024989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/879010/pexels-photo-879010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/751268/pexels-photo-751268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1591362/pexels-photo-1591362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
]

export default class Carousel2 extends React.Component {
    state = {
        active: 0
    }

    change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide !== this.state.active) {
            this.setState({ active: slide })
        }
    }

    render() {
        return (
            <View style={style.container}>
                <ScrollView pagingEnabled
                    horizontal
                    onscrollEventThrottleScroll={this.change}
                    showsHorizontalScrollIndicator={false}
                    style={style.scroll}>
                    {images.map((image, index) => (
                        <View key={index} style={style.imageContainer}>
                            <Image
                                source={{ uri: image }}
                                style={style.images}
                            />
                        </View>
                    ))}
                </ScrollView>
                {/* <View style={style.pagination}>
                    {
                        images.map((i,k) => (
                            <Text key={k} style={k==this.state.active ? style.pagingActiveText : style.pagingText}>{' '}
                            •{' '}</Text>
                        ))
                    }
                </View> */}
            </View>
        )
    }
}


const style = StyleSheet.create({
    container: { marginTop: 50, width, height },
    scroll: { width, height },
    imageContainer: {
        width,
        height: '100%',
        padding: 10, // Add padding or margin for the gap between images
    },
    images: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    pagination: { flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' },
    pagingText: { fontSize: (width / 30), color: '#888', margin: 3 },
    pagingActiveText: { fontSize: (width / 30), color: '#fff', margin: 3 },

})