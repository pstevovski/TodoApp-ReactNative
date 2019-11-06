import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import TodoItem from "./TodoItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withNavigation } from "react-navigation";
import { useAsyncStorage } from "@react-native-community/async-storage";

interface TodoItemsListProps {
  id: string,
  navigation: any
}

const TodoItemsList = (props: TodoItemsListProps) => {
  const { getItem } = useAsyncStorage("@todoList");
  const [items, setItems] = useState([]);

  useEffect(() => {
    getListData();
  });

  const getListData = async() => {
    const list = await getItem();

    if (list !== null) {
      setItems(JSON.parse(list).find((list: any) => list.id === props.id).children);
    }

  } 

  return (
    <View>
      <Text>ID: {props.id} </Text>

      {items ? 
        items.map((item: any) => (
          <TodoItem
            todo={item.todo}
            date={item.date}
            completed={item.completed}
          />
        ))
      : null}


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