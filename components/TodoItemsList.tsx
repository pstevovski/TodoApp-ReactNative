import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import TodoItem from "./TodoItem";
import Icon from "react-native-vector-icons/MaterialIcons";

interface TodoItemsListProps {
  id: string
}

const TodoItemsList = (props: TodoItemsListProps) => {
  return (
    <View>
      <Text>ID: {props.id} </Text>
      <TodoItem />

      <Icon
        // onPress={() => props.navigation.navigate("CreateTodo", { 
        //   type: "list",
        //   title: "Create New List"
        // })}
        name="add-circle" 
        size={70} 
        color="#e1302a" style={{
          position: "absolute",
          right: 20,
          top: Dimensions.get("screen").height - 220,
        }}
      />
    </View>
  )
}

export default TodoItemsList;