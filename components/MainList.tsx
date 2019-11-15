import React, { useState, useEffect, useCallback } from "react";
import { View, Text, SafeAreaView, FlatList, RefreshControl, Animated, Easing } from "react-native";
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

  // Reload page on pull
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    await readListFromStorage();

    setRefreshing(false);
  }

  // Main screen animation
  const [contentAnimation] = useState(new Animated.Value(0));
  useEffect(() => {
    // contentAnimation.setValue(0);

    Animated.timing(contentAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true
    }).start()
  }, [])
  const contentAnimationValueY = contentAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 0]
  })
  const contentAnimationValueOpacity = contentAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

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
        
        <Animated.View style={{
          padding: 10,
          opacity: contentAnimationValueOpacity,
          transform: [
            {
              translateY: contentAnimationValueY
            }
          ]
        }}>
          <Text style={[text.sectionTitle, { marginBottom: 20}]}>Main List</Text>
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
          : <Text style={text.p}>No bookmarks found.</Text>
          }
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default withNavigation(MainList);