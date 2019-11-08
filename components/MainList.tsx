import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";

// List component
import TodoList from "../components/TodoList";
import SearchBar from "./SearchBar";

const MainList = (props: any) => {
  const { getItem } = useAsyncStorage("@todoList");
  const [todoListsArray, setTodoListsArray] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Read saved items from local storage on any(??) update to the state
  useEffect(() => {
    readListFromStorage();
  }, [todoListsArray])

  const readListFromStorage = async () => {
    const list = await getItem();

    // Check if list exists
    if (list !== null) {
      setTodoListsArray(JSON.parse(list));
    } else {
      setTodoListsArray([]);
    }
  }

  // Set the text to be used to filter the list out
  const searchList = (searchText: string) => {
    if (searchText !== "") {
      setSearchText(searchText);
    } else {
      setSearchText("");
    }
    console.log(searchText);
  }

  return (
    <SafeAreaView>
      <SearchBar search={searchList} />
      <Text>Main List</Text>
      {todoListsArray && todoListsArray.length > 0 ?
          searchText && searchText.length > 0 ?
            todoListsArray.filter((list: any) => list.title.toLowerCase().includes(searchText) || list.description.toLowerCase().includes(searchText)).map((item: any) => (
              <TodoList
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                date={item.date}
                completed={item.listCompleted}
              />
            ))
          : todoListsArray.map((item: any) => (
            <TodoList
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              date={item.date}
              completed={item.completed}
            />
          ))
      : null}
    </SafeAreaView>
  )
}

export default MainList;