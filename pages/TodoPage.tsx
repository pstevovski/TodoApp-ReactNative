import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

// Storage
import AsyncStorage from "@react-native-community/async-storage";
import { useAsyncStorage } from "@react-native-community/async-storage";

// Import styling 
// import { text, containers } from "../styles/styles";
import { ScrollView } from "react-native-gesture-handler";

const TodoPage = (props: any) => {
  const [todoText, setTodoText] = useState("")
  const { getItem, setItem } = useAsyncStorage("@todoList");
  const [itemArray, setItemArray] = useState([]);
  const [editState, setEditState] = useState(false);
  const [oldTodoText, setOldTodoText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

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
    if (!todoText) return;

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

    // Update list
    updateTodoList(updatedArray);

    // Clear input and reset state
    setEditState(false);
    setTodoText("");
  }

  // Delete specific item
  const deleteItem = async (id: number) => {
    const arrayAfterDelete = [...itemArray];
    arrayAfterDelete.splice(id, 1);

    // Update list
    updateTodoList(arrayAfterDelete);
  }

  // Update current array, save to storage, reload list
  const updateTodoList = async (newArray: Array<string>) => {
    // Update current array
    setItemArray(newArray);

    // Save to storage
    await setItem(JSON.stringify(newArray));

    // Update list
    readItemFromStorage();
  }

  return (
    <View>
      <Text>Todo page test</Text>
      <Text>Item id: {JSON.stringify(props.navigation.getParam("itemID"))}</Text>
    </View>
  )
  // return (
  //   <View>
  //     <View style={{flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
  //       <TextInput
  //         placeholder="Todo item..."
  //         onChangeText={todoText => setTodoText(todoText)}
  //         onFocus={() => setInputFocused(!inputFocused)}
  //         value={todoText}
  //         style={{
  //           borderBottomColor: inputFocused ? "#e1302a" : "#eee",
  //           borderBottomWidth: 2,
  //           flex: 1
  //         }}
  //       />
        
  //       {editState ? 
  //         <Icon onPress={updateItem} name="edit" size={30} color="#e1302a" />
  //       :
  //         <Icon onPress={handleAddItem} name="add-circle" size={30} color="#e1302a" style={{paddingHorizontal: 5}} />
  //       }

  //     </View>
      
  //     <ScrollView>
  //       {itemArray && itemArray.length > 0 ?
  //         itemArray.map((item, index) => (
  //           <View key={index} onTouchStart={() => selectItem(index)} style={containers.todoItem}>
  //             <Text>{item}</Text>
  //             {/* <Text onPress={() => deleteItem(index)}> DEL </Text> */}
  //             <Icon onPress={() => deleteItem(index)} name="delete-forever" size={30} color="#e1302a" />
  //           </View>
  //         ))
  //       : null}
  //     </ScrollView>
      
  //     {itemArray.length > 0 ? <Text onPress={clearStorage} style={text.p}>CLEAR STORAGE</Text> : null }
  //   </View>
  // )
}

TodoPage.navigationOptions = () => ({
  title: "Todo List"
})

export default TodoPage;