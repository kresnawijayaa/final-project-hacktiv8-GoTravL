import React from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");
const itemWidth = width / 2; // Adjust this value to control the number of items displayed

const mediaData = [
  {
    id: 1,
    type: "video",
    videoId: "KU36z-LKHOQ",
  },
  {
    id: 2,
    type: "video",
    videoId: "QFFY6GXH99g",
  },
  {
    id: 3,
    type: "video",
    videoId: "OMtBFTT5GAU",
  },
  {
    id: 4,
    type: "video",
    videoId: "Mvu4_L3soRA",
  },
  {
    id: 5,
    type: "video",
    videoId: "OrR0MDGRKy0",
  },
  {
    id: 6,
    type: "video",
    videoId: "Pz8goknMrG4",
  },
  {
    id: 7,
    type: "video",
    videoId: "iWVvrB6MTEo",
  },
  {
    id: 8,
    type: "video",
    videoId: "1p7vIj7h8YU",
  },
  {
    id: 9,
    type: "video",
    videoId: "lgAnxsnd_Hw",
  },
];

export default class CarouselTiktok extends React.Component {
  state = {
    active: 0,
  };

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      (nativeEvent.contentOffset.x + itemWidth / 2) / itemWidth
    );
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };

  shouldLoadVideo = (index) => {
    const { active } = this.state;
    return index === active || index === active - 1 || index === active + 1;
  };

  renderMedia = () => {
    return mediaData.map((media, index) => (
      <View key={media.id} style={styles.mediaContainer}>
        {media.type === "video" &&
          // Check if this video is the one that's clicked to play, otherwise show thumbnail
          (this.state.active === index ? (
            <WebView
              scrollEnabled={false}
              source={{
                uri: `https://www.youtube.com/embed/${media.videoId}?rel=0&modestbranding=1&showinfo=0`,
              }}
              style={{
                flex: 1,
                width: itemWidth,
                height: height * 0.4,
                borderRadius: 15,
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => this.setState({ active: index })}>
              <Image
                source={{
                  uri: `https://img.youtube.com/vi/${media.videoId}/0.jpg`,
                }}
                style={{
                  width: itemWidth,
                  height: height * 0.4,
                  resizeMode: "cover",
                  borderRadius: 15,
                }}
              />
            </TouchableOpacity>
          ))}
      </View>
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled={true}
          horizontal={true}
          onScrolscrollEventThrottlel={this.change}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
        >
          {this.renderMedia()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  mediaContainer: {
    padding: 2,
    borderRadius: 12, // Added border radius
    marginRight: 12,
  },
});
