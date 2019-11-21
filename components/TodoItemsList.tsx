import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity, Platform, RefreshControl, CheckBox } from "react-native";
import TodoItem from "./TodoItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withNavigation } from "react-navigation";
import { useAsyncStorage } from "@react-native-community/async-storage";
import SearchBar from "./SearchBar";
import EditTodoModal from "./EditTodoModal";
import { menubar, text, containers } from "../styles/styles";
import { ScrollView } from "react-native-gesture-handler";
import PageHeading from "./PageHeading";
import MenuBar from "./MenuBar";

interface TodoItemsListProps {
  id: string,
  navigation: any
}

const TodoItemsList = (props: TodoItemsListProps) => {
  const { getItem, setItem } = useAsyncStorage("@todoList");
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [itemID, setItemID] = useState(String);
  const [menuBarOpen, setMenuBarOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    getListData();

    // Read saved items from local storage when going back to home page
    props.navigation.addListener('willFocus', () => {
      getListData();
    })
  }, []);

  const getListData = async() => {
    const list = await getItem();

    if (list !== null) {
      setItems(JSON.parse(list).find((list: any) => list.id === props.id).children);
    }

  }

  // Mark a todo as completed on long press
  const markAsComplete = async (id: string) => {
    // Get saved list and find pressed todo
    const lists = await getItem();
    const markedItemIndex = items.findIndex((item: any) => item.todoID === id);

    if (lists !== null) {
      // Find the list and its index that contains the marked todo
      const filteredList = JSON.parse(lists).find((list: any) => list.id === props.id);
      const filteredListIndex = JSON.parse(lists).findIndex((list: any) => list.id === props.id);

      // Mark the todo item as completed
      filteredList.children[markedItemIndex] = {
        ...filteredList.children[markedItemIndex],
        completed: !filteredList.children[markedItemIndex].completed
      }

      // If bookmarks exist on list, find specific item that is bookmarked and toggle completition
      if (filteredList.bookmarked) {
        filteredList.bookmarked[markedItemIndex] = {
          ...filteredList.bookmarked[markedItemIndex],
          completed: !filteredList.bookmarked[markedItemIndex].completed
        }
      }

      // Update the lists
      const listToBeSaved = JSON.parse(lists);
      listToBeSaved.splice(filteredListIndex, 1, filteredList);

      // Mark list as completed if every todo inside is completed
      const checkIfEveryTodoIsCompleted = filteredList.children.every((item: any) => item.completed)
      if (checkIfEveryTodoIsCompleted) {
        listToBeSaved[filteredListIndex].listCompleted = true;
      } else {
        listToBeSaved[filteredListIndex].listCompleted = false;
      }

      // Save to storage
      await setItem(JSON.stringify(listToBeSaved));
    }

  }

  // Set the text to be used to filter the list out
  const searchTodos = (searchText: string) => {
    if (searchText !== "") {
      setSearchText(searchText);
    } else {
      setSearchText("");
    }
  }

  // Bottom menu bar
  const openMenu = async (id: string) => {
    // Save the id of the item to state
    setItemID(id);

    // Check if item is bookmarked
    const bookmarks = await getItem();
    if (bookmarks) { 
      const bookmarksList = JSON.parse(bookmarks).find((list: any) => list.id === props.id).bookmarked;
      const checkIfBookmarkExists = bookmarksList.find((bookmark: any) => bookmark.todoID === id);

      if (checkIfBookmarkExists) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    }

    // Toggle the menu
    setMenuBarOpen(!menuBarOpen);
  }

  // Delete pressed todo item
  const deleteTodo = async () => {
    const deletedTodoIndex = items.findIndex((todo: any) => todo.todoID === itemID);
    const savedLists = await getItem();

    if (savedLists) {
      const listsAfterTodoIsDeleted = JSON.parse(savedLists);
      let specificList = listsAfterTodoIsDeleted.find((list: any) => list.id === props.id);
      const listIndex  = listsAfterTodoIsDeleted.findIndex((list: any) => list.id === props.id);

      // Remove todo element from the specific list
      specificList.children.splice(deletedTodoIndex, 1);    

      // Remove todo element from bookmarked
      if (specificList.bookmarked) {
        specificList.bookmarked.splice(deletedTodoIndex, 1);
      }

      // Update the array containing all created lists
      listsAfterTodoIsDeleted.splice(listIndex, 1, specificList);

      // Save updated list to storage
      await setItem(JSON.stringify(listsAfterTodoIsDeleted))
    }

    // Close the menubar
    openMenu(itemID);

    // Clear item ID
    setItemID("");
  }

  // Mark todo item as favorite
  const bookmarkTodo = async () => {
    const currentLists = await getItem();

    // Find opened list
    if (currentLists) {
      const lists = JSON.parse(currentLists);

      const openedList = lists.filter((list: any) => list.id === props.id);
      const openedListIndex = lists.findIndex((list: any) => list.id === props.id);

      // Find the selected todo in the list
      const selectedTodo = items.find((todo: any) => todo.todoID === itemID);

      // Prevent same todo to be added to bookmarks multiple times, if already bookmarked, remove it
      if (!openedList[0].bookmarked.find((bookmark: any) => bookmark.todoID === itemID)) {
        openedList[0].bookmarked.push(selectedTodo);
      } else {
        const bookmarkedTodoIndex = openedList[0].bookmarked.findIndex((bookmark: any) => bookmark.todoID === itemID);
        openedList[0].bookmarked.splice(bookmarkedTodoIndex, 1);
        setIsBookmarked(false);
      }

      // // Save to storage
      await setItem(JSON.stringify(lists));

      // Close the menu bar
      openMenu(itemID);

      // Clear item ID
      setItemID("");
    }
  }

  // Edit todo
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoValue, setEditingTodoValue] = useState("");
  const editTodo = () => {
    // Find the index of the todo
    const findTodoIndex: number = items.findIndex((todo: any) => todo.todoID === itemID);
    const todo: any = items[findTodoIndex];

    // Set editing mode and send todo value to editing modal
    setIsEditing(true);
    setEditingTodoValue(todo.todo);

    openMenu(itemID);
  }

  // Reload page on pull
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    await getListData();

    setRefreshing(false);
  }

  return (
    <>
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isEditing ? 
        <View style={{
          height: "100%",
          width: "100%",
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#333",
          opacity: 0.5,
          elevation: 12,
        }}></View>
      : null}

      <PageHeading id={props.id} extraIcon={true} extraIconType="addTodo" />

      <View style={{
        flex: 1, 
        justifyContent: "space-between",
        alignContent: "center",
        width: "100%",
        height: Dimensions.get("window").height
      }}>
        <View>
          <View style={{alignSelf: "center", padding: 20}}>
            <SearchBar search={searchTodos} />
          </View>

          {/* COMPLETED ITEMS */}
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            {items.some((item: any) => item.completed) ? <Text style={[text.sectionTitle, { marginBottom: 20}]}>COMPLETED</Text> : null}
            { items ?
                searchText && searchText.length > 0 ?
                  items.filter((item: any) => item.completed && item.todo.toLowerCase().includes(searchText)).map((item: any) => (
                    <TodoItem
                      key={item.todoID}
                      todo={item.todo}
                      todoID={item.todoID}
                      date={item.date}
                      completed={item.completed}
                      onPress={markAsComplete}
                      openMenu={openMenu}
                    />
                  ))
                : items.filter((item: any) => item.completed).map((item: any) => (
                  <TodoItem
                    key={item.todoID}
                    todo={item.todo}
                    todoID={item.todoID}
                    date={item.date}
                    completed={item.completed}
                    onPress={markAsComplete}
                    openMenu={openMenu}
                  />
                ))
            : null }

            <View>
              {/* NOT COMPLETED ITEMS */}
              {items.some((item: any) => !item.completed) ? <Text style={[text.sectionTitle, { marginBottom: 20}]}>NOT COMPLETED</Text> : null}

              { items ?
                  searchText && searchText.length > 0 ?
                    items.filter((item: any) => !item.completed && item.todo.toLowerCase().includes(searchText)).map((item: any) => (
                      <TodoItem
                        key={item.todoID}
                        todo={item.todo}
                        todoID={item.todoID}
                        date={item.date}
                        completed={item.completed}
                        onPress={markAsComplete}
                        openMenu={openMenu}
                      />
                    ))
                : items.filter((item: any) => !item.completed).map((item: any) => (
                  <TodoItem
                    key={item.todoID}
                    todo={item.todo}
                    todoID={item.todoID}
                    date={item.date}
                    completed={item.completed}
                    onPress={markAsComplete}
                    openMenu={openMenu}
                  />
                ))
              : null }
            </View>

          </View>
        </View>

        {/* EDIT TODO MODAL */}
        {isEditing ?
          <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <EditTodoModal 
              listId={props.id} 
              todoId={itemID} 
              todo={editingTodoValue}
              closeModal={() => {
                setIsEditing(false);
                setEditingTodoValue("");
              }}
            />
          </View>
        : null}
      </View>
    </ScrollView>

    {menuBarOpen ?
      <MenuBar
        isBookmarked={isBookmarked}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        bookmarkTodo={bookmarkTodo}
      />
    : null }
    </>
  )
}

export default withNavigation(TodoItemsList);