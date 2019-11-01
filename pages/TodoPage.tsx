import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";

// Storage
import AsyncStorage from "@react-native-community/async-storage";
import { useAsyncStorage } from "@react-native-community/async-storage";

// Import styling 
import { text } from "../styles/styles";

const TodoPage = () => {
  const [todoText, setTodoText] = useState("")
  const { getItem, setItem } = useAsyncStorage("@todoList");
  const [itemArray, setItemArray] = useState([]);
  const [editState, setEditState] = useState(false);
  const [oldTodoText, setOldTodoText] = useState("");

  // Read items from storage on page load
  useEffect(() => {
    readItemFromStorage();

  }, []) 
  
  const readItemFromStorage = async () => {
    const item = await getItem();

    // If theres a saved item
    if (item !== null) {
      setItemArray(JSON.parse(item))
    } else {
      setItemArray([]);
    }
  }

  // Add items to the array and save to storage
  const handleAddItem = async () => {
    const newArray = [...itemArray];
    newArray.push(todoText);

    // Set item in storage
    await setItem(JSON.stringify(newArray));

    // Re-render saved items
    readItemFromStorage();

    // Clear input field
    setTodoText("")
  }

  // Clear list
  const clearStorage = async () => {
    await AsyncStorage.clear();

    // Update list
    readItemFromStorage();

    setTodoText("");
    setEditState(false);
  }

  // Select item and update text in input field to match the item text
  const selectItem = async (id: number) => {
    let item = itemArray[id];
    
    setOldTodoText(item);
    setTodoText(item);

    // Set edit mode
    setEditState(true);
  }

  const updateItem = async () => {
    const findItem = itemArray.find(item => item === oldTodoText);
    const itemId   = itemArray.indexOf(findItem!);

    // Make a copy of the array and edit specific item
    let newItemValue: string = todoText;
    const updatedArray = [...itemArray];
    updatedArray.splice(itemId, 1, newItemValue);

    // Update the current array
    setItemArray(updatedArray);

    // Save the updated array to storage
    await setItem(JSON.stringify(updatedArray))

    // Update list
    readItemFromStorage();

    // Clear input and reset state
    setEditState(false);
    setTodoText("");
  }


  return (
    <View>
      <TextInput
        placeholder="Todo item..."
        onChangeText={todoText => setTodoText(todoText)}
        value={todoText}
        style={{
          borderBottomColor: "#e1302a",
          borderBottomWidth: 2,
        }}
      />

      {itemArray && itemArray.length > 0 ?
        itemArray.map((item, index) => (
          <Text key={index} onPress={() => selectItem(index)}>{item}</Text>
        ))
      : null}
      
        {editState ? 
          <Text onPress={updateItem} style={text.a}>Edit Item</Text> 
        :
          <Text onPress={handleAddItem} style={text.a}>ADD TODO</Text>
        }

      <Text onPress={clearStorage} style={text.p}>CLEAR STORAGE</Text>
    </View>
  )
}

TodoPage.navigationOptions = () => ({
  title: "Todo List"
})

export default TodoPage;