import { Easing, Animated } from "react-native";

export default function transitionConfig() {
  return {
    transitionSpec: {
      duration: 700,
      easing: Easing.ease,
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: (screenProps: any) => {
      // Destructure screen props object
      const { layout, index, scene, scenes, position } = screenProps;

      // Current screen data
      const currentIndex = scene.index;
      const width  = layout.initWidth;
      const height = layout.initHeight;
      const nextIndex = index + 1;

      // Opacity interpolation
      const opacity = position.interpolate({
        inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
        outputRange: [0, 1, 1]
      })
      const opacityRight = position.interpolate({
        inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
        outputRange: [0, 1, 0]
      })

      // Animate screens to the left - going backwards
      const translateXLeft = position.interpolate({
        inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
        outputRange: [width, 1, -width]
      })
      const scaleLeft = position.interpolate({
        inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
        outputRange: [0, 1, 0]
      })
      const goLeft = {
        opacity,
        transform: [
          {
            translateX: translateXLeft,
            scale: scaleLeft
          }
        ]
      }

      // Animate screens to the right - going forwards
      const translateXRight = position.interpolate({
        inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
        outputRange: [width, 1, -width]
      })
      const scaleRight = position.interpolate({
        inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
        outputRange: [0, 1, 0]
      })
      const goRight = {
        opacity: opacityRight,
        transform: [
          {
            translateX: translateXRight,
            scale: scaleRight
          }
        ]
      }

      // Animate home page - slide from bottom
      const translateYBottom = position.interpolate({
        inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
        outputRange: [0, 1, height]
      })
      const homeScreen = {
        opacity,
        transform: [
          {
            translateY: translateYBottom,
            scale: scaleRight
          }
        ]
      }

      // Check which direction is user going
      if (nextIndex > currentIndex && index !== 0) {
        return goRight;
      } else if (index === 0) {
        return homeScreen
      }

      return goLeft;
    }
  }
}