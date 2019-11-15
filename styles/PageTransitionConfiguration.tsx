import { Easing, Animated } from "react-native";

export default function transitionConfig() {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.bounce,
      timing: Animated.spring,
      useNativeDriver: true
    },
    screenInterpolator: (screenProps: any) => {
      // Destructure screen props object
      const { layout, index, scene, position } = screenProps;

      // Current screen data
      const currentIndex = scene.index;
      const width  = layout.initWidth;
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
      const goLeft = {
        opacity,
        transform: [
          {
            translateX: translateXLeft,
          }
        ]
      }

      // Animate screens to the right - going forwards
      const translateXRight = position.interpolate({
        inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
        outputRange: [width, 1, -width]
      })
      const goRight = {
        opacity: opacityRight,
        transform: [
          {
            translateX: translateXRight,
          }
        ]
      }

      // Check which direction is user going
      if (nextIndex > currentIndex && index !== 0) {
        return goRight;
      } 

      return goLeft;
    }
  }
}