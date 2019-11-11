import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, CheckBox } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";
import { todo, text } from "../styles/styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { icons } from "../styles/styles";

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

  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async() => {
    const list = await getItem();

    if (list !== null) {
      setItems(JSON.parse(list).find((list: any) => list.id === props.id));
    } else {
      setItems([])
    }
  }

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
        title: props.title,
        data: items
      })}
      onLongPress={() => props.navigation.navigate("CreateTodo", {
        state: "edit",
        type: "list",
        title: props.title,
        listTitleInput: props.title,
        desc: props.description,
        id: props.id
      })}
      style={{flexDirection: "row", alignItems: "center"}}
    >
      <View style={[todo.global, todo.list, {
        marginBottom: 30,
        backgroundColor: props.completed ? "#1dd67a" : "#fff",
        padding: 10
      }]}>
          {/* DATE */}
          <Text style={[todo.date, { top: -20, right: 0}]}>{props.date}</Text>

          {/* LIST TITLE AND DESCRIPTION */}
          <View>
            <Text style={[text.pBig, text.title,{
              textDecorationLine: props.completed ? "line-through" : "none",
              textDecorationStyle: "solid",
              color: props.completed ? "#fff" : "#555",
              marginBottom: 10
            }]}>{props.title}</Text>
            <Text style={{
              textDecorationLine: props.completed ? "line-through" : "none",
              textDecorationStyle: "solid",
              color: props.completed ? "#fff" : "#555"
            }}>{props.description}</Text>
          </View>

      </View>
      
      <View style={{
        paddingHorizontal: 0,
        marginBottom: 30
      }}>
        <Icon name="delete-forever" size={30} color="#999" onPress={() => deleteList(props.id)} />
      </View>

    </TouchableOpacity>
  )
}

export default withNavigation(TodoList);