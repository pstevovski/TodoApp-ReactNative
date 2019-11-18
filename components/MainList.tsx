import React, { useState, useEffect, useCallback } from "react";
import { View, Text, SafeAreaView, FlatList, RefreshControl, Animated, Easing, Dimensions } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";

// List component
import TodoList from "../components/TodoList";
import SearchBar from "./SearchBar";
import Icon from "react-native-vector-icons/MaterialIcons";
import TodoItem from "./TodoItem";
import BookmarkedItem from "./BookmarkedItem";
import { ScrollView } from "react-native-gesture-handler";
import { text } from "../styles/styles";

const MainList = (props: any) => {
  const { getItem } = useAsyncStorage("@todoList");
  const [todoListsArray, setTodoListsArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  // Get bookmarked items
  const [bookmarkedArray, setBookmarkedArray] = useState([]);

  // Read saved items from local storage on any(??) update to the state
  useEffect(() => {
    readListFromStorage();
  }, [])

  const readListFromStorage = async () => {
    const list = await getItem();

    // Check if list exists
    if (list !== null) {
      setTodoListsArray(JSON.parse(list));
      setBookmarkedArray(JSON.parse(list).map((list: any) => list.bookmarked));
    } else {
      setTodoListsArray([]);
    }
    
    console.log("LIST", list)
  }

  // Set the text to be used to filter the list out
  const searchList = (searchText: string) => {
    if (searchText !== "") {
      setSearchText(searchText);
    } else {
      setSearchText("");
    }
  }

  // Reload page on pull
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    await readListFromStorage();

    setRefreshing(false);

    const test = bookmarkedArray.map((array: []) => array.map((item: any) => console.log("ITEM", item)))
    // console.log("BOOKMARKS ARRAY", bookmarkedArray)
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>

        {/* PAGE HEADER */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 30,
          paddingHorizontal: 20
        }}>
          <SearchBar search={searchList} />
          <Icon name="note-add" size={30} color="grey" onPress={() => props.navigation.navigate("CreateTodo", {
            type: "list",
            title: "Create New List"
          })} />
        </View>
        
        <View style={{
          padding: 10,
        }}>
          <Text style={[text.sectionTitle, { marginBottom: 20}]}>Todo Lists</Text>
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
                  completed={item.listCompleted}
                />
              ))
          : <Text style={text.p}>No lists found.</Text>}

          <View style={{
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center"
          }}>
            <Text style={text.sectionTitle}>BOOKMARKS</Text>
            <Icon name="bookmark" size={25} color="#1dd67a" style={{paddingLeft: 10}} />
          </View>
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
              : bookmarkedArray.map((array: []) => array.map((item: any) => (
                <BookmarkedItem
                  key={item.todoID}
                  id={item.todoID}
                  text={item.todo}
                  listID={item.todoListID}
                  listTitle={item.todoListTitle}
                  completed={item.completed}
                  date={item.date}
                />
              )))
            // : bookmarkedArray.map((item: any, index: any) => (
            //   <BookmarkedItem
            //     key={item.todoID}
            //     id={item.todoID}
            //     text={item.todo}
            //     listID={item.todoListID}
            //     listTitle={item.todoListTitle}
            //     completed={item.completed}
            //     date={item.date}
            //   />
            // ))
          : <Text style={text.p}>No bookmarks found.</Text>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default withNavigation(MainList);