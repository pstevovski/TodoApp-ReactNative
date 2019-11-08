import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

interface EditTodoModalProps {
  listId: string,
  todoId: string,
  todo: string
  closeModal: () => void;
}

const EditTodoModal = (props: EditTodoModalProps) => {
  // Edit todo input
  const [editTodoInput, setEditTodoInput] = useState(props.todo);
  const { getItem, setItem } = useAsyncStorage("@todoList");

  const editTodo = async () => {
    const list = await getItem();
    if (list) {
      // Get list from storage and find specific list and todo to be edited
      const parsedList = JSON.parse(list);
      const specificList = parsedList.find((list: any) => list.id === props.listId);
      const specificListIndex = parsedList.findIndex((list: any) => list.id === props.listId);
      const todoIndex = specificList.children.findIndex((todo: any) => todo.todoID === props.todoId)

      // Update the children of specific list
      specificList.children.splice(todoIndex, 1, {
        ...specificList.children[todoIndex],
        todo: editTodoInput,
      })

      // Update the whole list and save to storage
      parsedList.splice(specificListIndex, 1, specificList);

      // Save to storage
      await setItem(JSON.stringify(parsedList));

      // Close the modal
      props.closeModal();
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
        autoFocus={true}
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

      <Icon onPress={props.closeModal} name="close" size={30} color="#333" />
    </View>
  )
}

export default EditTodoModal;