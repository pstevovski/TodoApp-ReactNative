import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, CheckBox } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";
import { todo } from "../styles/styles";
import Icon from "react-native-vector-icons/MaterialIcons";

interface TodoListProps {
  id: string,
  title: string,
  description: string,
  date: Date | string,
  completed: boolean,
  navigation: any
}

const TodoList = (props: TodoListProps) => {
  const { getItem, setItem } = useAsyncStorage("@todoList");

  // Delete list on long press
  const deleteList = async (id: string) => {
    // Get saved list array
    const list = await getItem();
    
    if (list !== null) {
      // Filter the array and remove item if IDs dont match
      const filteredArray = JSON.parse(list).filter((item: any) => item.id !== id)
      
      // Update the saved array
      await setItem(JSON.stringify(filteredArray));
    }

  }

  return (
    <TouchableOpacity
      // onPress={() => console.log(props.id, props.completed)}
      onPress={() => props.navigation.navigate("SpecificTodoList", {
        id: props.id,
        title: props.title
      })}
      onLongPress={() => props.navigation.navigate("CreateTodo", {
        state: "edit",
        title: props.title,
        listTitleInput: props.title,
        desc: props.description,
        id: props.id
      })}
    >
      <View style={[todo.global, todo.list]}>
          <View>
            <Text>{props.title}</Text>
            <Text>{props.description}</Text>
            <Text>{props.date}</Text>
          </View>

          <Icon name="delete" size={30} onPress={() => deleteList(props.id)} />
      </View>
    </TouchableOpacity>
  )
}

export default withNavigation(TodoList);