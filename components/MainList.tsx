import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";

const MainList = () => {
  const { getItem, setItem } = useAsyncStorage("@todoList");
  const [todoListsArray, setTodoListsArray] = useState([]);

  // Read saved items from local storage
  useEffect(() => {
    readListFromStorage();
  }, [])

  const readListFromStorage = async () => {
    const list = await getItem();

    // Check if list exists
    if (list !== null) {
      setTodoListsArray(JSON.parse(list));
    } else {
      setTodoListsArray([]);
    }
  }

  // Create a todo list which holds todo items


  return (
    <Text>Main List</Text>
  )
}

export default MainList;