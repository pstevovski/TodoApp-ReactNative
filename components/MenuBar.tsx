import React, { useState, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Style
import { menubar } from "../styles/styles";



interface MenuBarProps {
  editTodo: () => void,
  deleteTodo: () => void,
  bookmarkTodo: () => void,
  isBookmarked: boolean
}

const MenuBar = (props: MenuBarProps) => {
  const [translateYValue] = useState(new Animated.Value(0));

  // When component mounts / unmounts
  useEffect(() => {
    translateYValue.setValue(0); // Reset to initial value

    Animated.timing(
      translateYValue,
      {
        toValue: 1,
        duration: 1250,
        easing: Easing.bounce,
        useNativeDriver: true
      }
    ).start();
  }, [])

  const animatedTranslateY = translateYValue.interpolate({
    inputRange: [0, 1],
    outputRange: [ 100, 0]
  })

  return (
    <Animated.View style={[menubar.main, {
      transform: [
        {
          translateY: animatedTranslateY
        }
      ]
    }]}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        alignItems: "center",
        width: "100%"
      }}>
        <View style={menubar.container}>
          <Icon name="edit" onPress={props.editTodo} size={30} color="grey" />
          <Text style={menubar.text}>Edit</Text>
        </View>
        <View style={[menubar.container, {
          marginLeft: 30
        }]}>
          <Icon name="delete-forever" onPress={props.deleteTodo} size={30} color="grey" />
          <Text style={menubar.text}>Delete</Text>
        </View>
        <View style={menubar.container}>
          <Icon name="bookmark" onPress={props.bookmarkTodo} size={30} color={props.isBookmarked ? "#1dd67a" : "grey"} />
          <Text style={menubar.text}>{props.isBookmarked ? 'Bookmarked' : 'Bookmark'}</Text>
        </View>
      </View>
    </Animated.View>
  )
}

export default MenuBar;