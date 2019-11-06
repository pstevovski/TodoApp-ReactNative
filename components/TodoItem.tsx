import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface TodoItemProps {
  todo: string,
  completed: boolean,
  date?: Date | string
}

const TodoItem = (props: TodoItemProps) => {
  return (
    <View>
      <View>
        <Text>{props.todo}</Text>
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
  )
}

export default TodoItem;