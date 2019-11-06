import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";

// List component
import TodoList from "../components/TodoList";
import SearchBar from "./SearchBar";

const MainList = (props: any) => {
  const { getItem } = useAsyncStorage("@todoList");
  const [todoListsArray, setTodoListsArray] = useState([]);

  // Read saved items from local storage on any(??) update to the state
  useEffect(() => {
    readListFromStorage();
  })

  const readListFromStorage = async () => {
    const list = await getItem();

    // Check if list exists
    if (list !== null) {
      setTodoListsArray(JSON.parse(list));
    } else {
      setTodoListsArray([]);
    }
  }

  // Filter list
  const searchList = (searchText: string) => {
    const test = todoListsArray.filter((item: any) => (item.title || item.description) === searchText);

    console.log(test);
  }

  return (
    <SafeAreaView>
      <SearchBar search={searchList} />
      <Text>Main List</Text>
      {todoListsArray && todoListsArray.length > 0 ?
        todoListsArray.map((item: any) => (
          <TodoList
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            completed={item.listCompleted}
          />
        )) 
      : null}
    </SafeAreaView>
  )
}

export default MainList;