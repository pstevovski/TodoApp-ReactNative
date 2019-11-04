import React, { useState, useEffect, ReactNode } from "react";
import { View, Animated, Easing } from "react-native";

interface TestAnimationComponentProps {
  children: ReactNode,
}

const TestAnimationComponent = (props: TestAnimationComponentProps) => {
  const initialValue = new Animated.Value(0);

  // Start animation on page load
  useEffect(() => {
    testAnimation();
  }, [])

  const testAnimation = () => {
    initialValue.setValue(0); // Reset value

    Animated.timing(
      initialValue,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear
      }
    ).start();
  }

  const spinAnimation = initialValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  })

  return (
    <View>{props.children}</View>
  )
}

export default TestAnimationComponent;