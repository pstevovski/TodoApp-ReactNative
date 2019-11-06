import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import TodoItem from "./TodoItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withNavigation } from "react-navigation";

interface TodoItemsListProps {
  id: string,
  navigation: any
}

const TodoItemsList = (props: TodoItemsListProps) => {
  return (
    <View>
      <Text>ID: {props.id} </Text>
      {/* <TodoItem />
      <TodoItem completed={true} /> */}


      <Icon
        onPress={() => props.navigation.navigate("CreateTodo", { 
          type: "item",
          title: "Add Todo",
          id: props.id
        })}
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

export default withNavigation(TodoItemsList);