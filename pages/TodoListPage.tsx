import React, { useState, useEffect } from "react";
import { View } from "react-native";
import TodoItemsList from "../components/TodoItemsList";
import { withNavigation } from "react-navigation";
import { useAsyncStorage } from "@react-native-community/async-storage";

const TodoListPage = (props: any) => {

  return (
    <TodoItemsList 
      id={props.navigation.getParam("id")}
    />
  )
}

TodoListPage.navigationOptions = ({ navigation }: any ) => ({
  title: navigation.getParam("title")
})

export default withNavigation(TodoListPage);