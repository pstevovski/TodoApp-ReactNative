import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";

// List component
import TodoList from "../components/TodoList";
import SearchBar from "./SearchBar";
import Icon from "react-native-vector-icons/MaterialIcons";
import TodoItem from "./TodoItem";
import BookmarkedItem from "./BookmarkedItem";

const MainList = (props: any) => {
  const { getItem } = useAsyncStorage("@todoList");
  const [todoListsArray, setTodoListsArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  // Get bookmarked items
  const { getItem: getBookmarked} = useAsyncStorage("@todoListBookmarks")
  const [bookmarkedArray, setBookmarkedArray] = useState([]);

  // Read saved items from local storage on any(??) update to the state
  useEffect(() => {
    readListFromStorage();
  }, [])

  const readListFromStorage = async () => {
    const list = await getItem();
    const bookmarksList = await getBookmarked();

    // Check if list exists
    if (list !== null) {
      setTodoListsArray(JSON.parse(list));
    } else {
      setTodoListsArray([]);
    }

    // Check if there are bookmarked todos
    if (bookmarksList !== null) {
      setBookmarkedArray(JSON.parse(bookmarksList));
    } else {
      setBookmarkedArray([]);
    }

  }

  // Set the text to be used to filter the list out
  const searchList = (searchText: string) => {
    if (searchText !== "") {
      setSearchText(searchText);
    } else {
      setSearchText("");
    }
  }

  return (
    <SafeAreaView>

      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 10
      }}>
        <SearchBar search={searchList} />
        <Icon name="note-add" size={30} color="grey" onPress={() => props.navigation.navigate("CreateTodo", {
          type: "list",
          title: "Create New List"
        })} />
      </View>

      <Text>Main List</Text>
      {todoListsArray && todoListsArray.length > 0 ?
          searchText && searchText.length > 0 ?
            todoListsArray.filter((list: any) => list.title.toLowerCase().includes(searchText) || list.description.toLowerCase().includes(searchText)).map((item: any) => (
              <TodoList
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
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
              date={item.date}
              completed={item.completed}
            />
          ))
      : null}

      <Text>BOOKMARKS</Text>
      {bookmarkedArray && bookmarkedArray.length > 0 ?
        searchText && searchText.length > 0 ?
          bookmarkedArray.filter((bookmark: any) => bookmark.todo.toLowerCase().includes(searchText))
                         .map((item: any) => (
                          <BookmarkedItem
                            key={item.todoID}
                            id={item.todoID}
                            text={item.todo}
                            listID={item.todoListID}
                            listTitle={item.todoListTitle}
                            completed={item.completed}
                            date={item.date}
                          />
                         ))
        : bookmarkedArray.map((item: any) => (
          <BookmarkedItem
            key={item.todoID}
            id={item.todoID}
            text={item.todo}
            listID={item.todoListID}
            listTitle={item.todoListTitle}
            completed={item.completed}
            date={item.date}
          />
        ))
      : null
      }
    </SafeAreaView>
  )
}

export default withNavigation(MainList);