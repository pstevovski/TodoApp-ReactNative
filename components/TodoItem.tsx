import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withNavigation } from "react-navigation";

interface TodoItemProps {
  todo: string,
  todoID: string,
  completed: boolean,
  date?: Date | string,
  onPress: (todoID: string) => void,
  navigation: any
}

const TodoItem = (props: TodoItemProps) => {
  return (
    <TouchableOpacity 
      onLongPress={() => props.onPress(props.todoID)}
      onPress={() => props.navigation.navigate("CreateTodo", {
        type: "item",
        title: props.todo,
        listTitleInput: props.todo,
        state: "edit"
      })}
    >
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <View>
          <Text style={{
            textDecorationLine: props.completed ? "line-through" : 'none',
            textDecorationStyle: "solid"
          }}>{props.todo}</Text>
          <Text>{props.date}</Text>
        </View>

        <Icon 
          name={props.completed ? 'check-circle' : 'cancel'}
          size={30}
          color={props.completed ? "green" : "#e1302a"}
          style={{
            opacity: props.completed ? 1 : 0.6
          }}
        />

      </View>
    </TouchableOpacity>
  )
}

export default withNavigation(TodoItem);