import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, CheckBox, Animated, Easing } from "react-native";
import AsyncStorage, { useAsyncStorage } from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";
import { todo, text } from "../styles/styles";
import Icon from "react-native-vector-icons/MaterialIcons";

interface TodoListProps {
  id: string,
  title: string,
  description: string,
  date: Date | string,
  completed: boolean,
  navigation: any
}

// Animated trash can icon
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const TodoList = (props: TodoListProps) => {
  const { getItem, setItem } = useAsyncStorage("@todoList");
  const [items, setItems] = useState([]);
  const [deleteAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    getData();
  }, [])

  const getData = async() => {
    const list = await getItem();

    if (list !== null) {
      setItems(JSON.parse(list).find((list: any) => list.id === props.id));
    } else {
      setItems([])
    }
  }

  // Delete list on long press
  const deleteList = async (id: string) => {
    // Get saved list array
    const list = await getItem();

    // Animate trash can icon
    deleteAnimation.setValue(0);
    Animated.timing(deleteAnimation, {
      toValue: 2,
      duration: 700,
      easing: Easing.elastic(3),
      useNativeDriver: true
    }).start( async() => {
      // Remove list from storage after animation ends
      if (list !== null) {
        // Filter the array and remove item if IDs dont match
        const filteredArray = JSON.parse(list).filter((item: any) => item.id !== id)
  
        if ( filteredArray === [] ) {
          // Clear storage from bookmarks and lists if last list is deleted
          await AsyncStorage.clear();
        } else {
          // Update the saved array
          await setItem(JSON.stringify(filteredArray));
        }
      }
    });
  }

  const deleteAnimationScale = deleteAnimation.interpolate({
    inputRange: [0, 1, 2,],
    outputRange: [1, 1.2, 1]
  })
  const deleteAnimationRotate = deleteAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0deg", "25deg", "0deg"]
  })

  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("SpecificTodoList", {
        id: props.id,
        title: props.title,
        data: items
      })}
      onLongPress={() => props.navigation.navigate("CreateTodo", {
        state: "edit",
        type: "list",
        title: props.title,
        listTitleInput: props.title,
        desc: props.description,
        id: props.id
      })}
      style={{flexDirection: "row", alignItems: "center"}}
    >
      <View style={[todo.global, todo.list, {
        marginBottom: 30,
        backgroundColor: props.completed ? "#1dd67a" : "#fff",
        padding: 10
      }]}>
          {/* DATE */}
          <Text style={[todo.date, { top: -20, right: 0}]}>{props.date}</Text>

          {/* LIST TITLE AND DESCRIPTION */}
          <View>
            <Text style={[text.pBig, text.title,{
              textDecorationLine: props.completed ? "line-through" : "none",
              textDecorationStyle: "solid",
              color: props.completed ? "#fff" : "#555",
              marginBottom: 10
            }]}>{props.title}</Text>
            <Text style={{
              textDecorationLine: props.completed ? "line-through" : "none",
              textDecorationStyle: "solid",
              color: props.completed ? "#fff" : "#555"
            }}>{props.description}</Text>
          </View>

      </View>
      
      <AnimatedIcon
        name="delete-forever"
        size={30}
        color="#999"
        onPress={() => deleteList(props.id)}
        style={{
          paddingHorizontal: 0,
          marginBottom: 30,
          transform: [
            {
              scale: deleteAnimationScale
            },
            {
              rotate: deleteAnimationRotate
            }
          ]
        }}
      />

    </TouchableOpacity>
  )
}

export default withNavigation(TodoList);