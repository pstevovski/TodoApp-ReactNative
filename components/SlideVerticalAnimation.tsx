import React, { useState, useEffect, ReactNode } from "react";
import { View, Animated, Easing } from "react-native";

interface SlideVerticalAnimationProps {
  yValue: number,
  children: ReactNode
}

const SlideVerticalAnimation = (props: SlideVerticalAnimationProps) => {
  return (
    <View>
      {props.children}
    </View>
  )
}

export default SlideVerticalAnimation;