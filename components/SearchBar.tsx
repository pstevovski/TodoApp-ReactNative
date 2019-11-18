import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Easing } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { searchBar } from "../styles/styles";

interface SearchBarProps {
  search: (text: string) => void
}

// Create custom animated component
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SearchBar = (props: SearchBarProps) => {
  const [searchBarAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Reset animation
    searchBarAnimation.setValue(0);

    Animated.timing(searchBarAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true
    }).start();
  }, [])
  
  const searchX = searchBarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [ -15, 10]
  })
  const searchRotate = searchBarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"]
  })

  return (
    <View style={[searchBar.global, { overflow: "hidden"}]}>
      <View>
        <AnimatedIcon name="search" size={25} color="#999" style={{
          position: "absolute",
          top:  8,
          left: 0,
          transform: [ 
            { 
              translateX: searchX
            },
            {
              rotate: searchRotate
            },
          ]
        }} />
      </View>
      <TextInput 
        placeholder="Search..." 
        style={{paddingLeft: 45, paddingRight: 20}}
        onChangeText={text => props.search(text)}
      />
    </View>
  )
}

export default SearchBar;