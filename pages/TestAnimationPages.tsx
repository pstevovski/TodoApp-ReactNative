import React, { useState, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";

const AnimationPage = () => {
  // Initial animation value
  const initialValue = new Animated.Value(0);

  // useEffect(() => spin(), []);

  // Spin - animation test method
  const spin = () => {
    // Reset animation value
    initialValue.setValue(0);

    // Animation data
    Animated.timing(
      initialValue,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear
      }
    ).start(() => spin())
  }

  const spinAnimation = initialValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  
  return (
    <View style={{height: "100%"}}>
      <Text>Animation Page</Text>
      <Text onPress={spin}>START</Text>
      <Animated.View style={{
        width: 150,
        height: 150,
        backgroundColor: "#333",
        transform: [{ rotate: spinAnimation }],
        position: "absolute",
        top: "50%",
        left: "50%"
      }} useNativeDriver></Animated.View>
    </View>
  )
}

export default AnimationPage