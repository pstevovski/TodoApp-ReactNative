import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";

// Icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { todo, icons } from "../styles/styles";

interface TodoItemProps {
  todo: string,
  todoID: string,
  completed: boolean,
  date?: Date | string,
  onPress: (todoID: string) => void,
  openMenu: (todoID: string) => void,
  navigation: any
}

const TodoItem = (props: TodoItemProps) => {
  return (
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <TouchableOpacity
        onPress={() => props.onPress(props.todoID)}
        onLongPress={() => props.openMenu(props.todoID)}
        style={[todo.item, {
          backgroundColor: props.completed ? "#1dd67a" : "#fff",
        }]}
      >
        <View>
          {/* DATE */}
          <Text style={todo.date}>{props.date}</Text>

          {/* TODO DESCRIPTION */}
          <Text style={{
            textDecorationLine: props.completed ? "line-through" : 'none',
            textDecorationStyle: "solid",
            color: props.completed ? "#fff" : "#555",
            fontSize: 16,
          }}>{props.todo}</Text>
      
        </View>


      </TouchableOpacity>

      {props.completed ?
        <View style={icons.itemIcons}>
          <Icon name="check-circle-outline" size={30} color="#1dd67a" />
        </View>
      : 
        <View style={icons.itemIcons}>
          <Icon name="close-circle-outline" size={30} color="#e1302a" />
        </View>
      }
    </View>
  )
}

export default withNavigation(TodoItem);