import React from "react";
import { View } from "react-native";
import TodoItemsList from "../components/TodoItemsList";

const TodoListPage = (props: any) => {
  return (
    <TodoItemsList 
      id={props.navigation.getParam("id")} 
    />
  )
}

TodoListPage.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("title")
})

export default TodoListPage;