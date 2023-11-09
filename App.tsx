import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const exampleData = [
  { key: "spacer" },
  {
    img: require("./assets/girl1.png"),
    title: "Algorithm",
    description:
      "Users going through a vetting process to ensure you never match with bots.",
  },
  {
    img: require("./assets/girl2.png"),
    title: "Premium",
    description:
      "Sign up today and enjoy the first month of premium benefits on us.",
  },
  {
    img: require("./assets/girl3.png"),
    title: "Matches",
    description:
      "We match you with people that have a large array of similar interests.",
  },
  {
    img: require("./assets/girl1.png"),
    title: "Algorithm",
    description:
      "Users going through a vetting process to ensure you never match with bots.",
  },
  {
    img: require("./assets/girl2.png"),
    title: "Premium",
    description:
      "Sign up today and enjoy the first month of premium benefits on us.",
  },
  {
    img: require("./assets/girl3.png"),
    title: "Matches",
    description:
      "We match you with people that have a large array of similar interests.",
  },
  { key: "spacer" },
];

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const ITEM_SIZE = screenWidth * 0.65;
  const SPACER_SIZE = (screenWidth - ITEM_SIZE) / 2;
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        scrollEventThrottle={16}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={exampleData}
        renderItem={({ item, index }) => {
          if (!item.img) {
            return <View style={{ width: SPACER_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const scale = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [0.8, 1, 0.8],
          });
          return (
            <Animated.View
              style={{
                marginVertical: 90,
                width: ITEM_SIZE,
                alignItems: "center",
                gap: 40,
              }}
            >
              <Animated.Image
                style={{ transform: [{ scale: scale }] }}
                source={item.img}
              />
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
