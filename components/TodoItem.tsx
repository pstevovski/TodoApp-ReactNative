import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface TodoItemProps {
  todo: string,
  todoID: string,
  completed: boolean,
  date?: Date | string,
  onPress: (todoID: string) => void
}

const TodoItem = (props: TodoItemProps) => {
  return (
    <TouchableOpacity onLongPress={() => props.onPress(props.todoID)}>
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

export default TodoItem;