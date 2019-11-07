import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";

interface EditTodoModalProps {
  listId: string,
  todoId: string,
  todo: string
}

const EditTodoModal = (props: EditTodoModalProps) => {
  // Edit todo input
  const [editTodoInput, setEditTodoInput] = useState(props.todo);
  const { getItem, setItem } = useAsyncStorage("@todoList");

  const editTodo = async () => {
    const list = await getItem();
    if (list) {
      const parsedList = JSON.parse(list);
      const specificList = parsedList.find((list: any) => list.id === props.listId);

      const specificTodoInList = specificList.children.findIndex((todo: any) => todo.todoID === props.todoId)
      console.log(specificTodoInList);
      /*
        TODO: 
        - Find specific list index
        - Edit specific todo in the specific list childrens array
        - Update the whole list
      */
    }
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      height: 200,
      backgroundColor: "#eee",
      borderBottomColor: "#333",
      borderBottomWidth: 3,
      padding: 10,
      position: "absolute",
      top: Dimensions.get("screen").height / 2 - 200,
      left: 0,
    }}>
      <Text>EDITING: {props.todo}</Text>

      <TextInput 
        value={editTodoInput} 
        onChangeText={(edit: string) => setEditTodoInput(edit)}
        // autoFocus={true}
        style={{
          width: 200,
          height: 50,
          backgroundColor: "#fff",
          color: "#333"
        }}  
      />

      <TouchableOpacity onPress={editTodo} style={{backgroundColor: "red"}}>
        <View>
          <Text>EDIT</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default EditTodoModal;