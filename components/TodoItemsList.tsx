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
  const [currentList, setCurrentList] = useState([] as any);
  const [searchText, setSearchText] = useState("");
  const [itemID, setItemID] = useState(String);
  const [menuBarOpen, setMenuBarOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoValue, setEditingTodoValue] = useState("");

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
      setCurrentList(JSON.parse(list).find((list: any) => list.id === props.id));

      console.log("CURRENT LIST", currentList);
    } else {
      setCurrentList([]);
    }
  }

  const getDataFromList = async() => {
    const todoItemIndex = currentList.children.findIndex((todo: any) => todo.todoID === itemID);
    const bookmarkedItemIndex = currentList.bookmarked.findIndex((todo: any) => todo.todoID === itemID);
    const selectedItem = currentList.children.find((item: any) => item.todoID === itemID);
    const currentListIndex = currentList.findIndex((list: any) => list.id === props.id);

    return {
      todoItemIndex,
      bookmarkedItemIndex,
      selectedItem,
      currentListIndex
    }
  }

  const updateCurrentList = async (action: string) => {
    // Make a copy of the list
    const listToBeUpdated = [...currentList];
    const { currentListIndex } = await getDataFromList();

    switch (true) {
      case action === "MARK_COMPLETE":
        const checkIfEveryTodoIsCompleted = currentList.children.every((item: any) => item.completed)
        if (checkIfEveryTodoIsCompleted) {
          listToBeUpdated[currentListIndex].listCompleted = true;
        } else {
          listToBeUpdated[currentListIndex].listCompleted = false;
        }
        break;
      case action === "BOOKMARK_TODO":
        break;
      case action === "EDIT_TODO":
        break;
      case action === "DELETE_TODO":
        // do nothing
        break;
    }

    // Save updated list to storage
    await setItem(JSON.stringify(listToBeUpdated));

    // Close the menubar
    openMenu("");

    // Clear item ID
    setItemID("");

    // Reload the now updated list
    getListData();
  }

  // Mark a todo as completed on long press
  const markAsComplete = async (id: string) => {
    const { todoItemIndex, bookmarkedItemIndex } = await getDataFromList();

    // Mark the todo item as completed
    currentList.children[todoItemIndex] = {
      ...currentList.children[todoItemIndex],
      completed: !currentList.children[todoItemIndex].completed
    }

    // Update the bookmarked todo when the todo itself is updated (completed / not completed)
    if (currentList.bookmarked[bookmarkedItemIndex]) {
      currentList.bookmarked[bookmarkedItemIndex] = {
        ...currentList.bookmarked[bookmarkedItemIndex],
        completed: !currentList.bookmarked[bookmarkedItemIndex].completed
      }
    }

    updateCurrentList("MARK_COMPLETE");
  }

  // Bookmark todo item
  const bookmarkTodo = async() => {
    const { bookmarkedItemIndex, selectedItem } = await getDataFromList();

    // Prevent same todo to be added to bookmarks multiple times, if already bookmarked, remove it
    if (!currentList[0].bookmarked.find((bookmark: any) => bookmark.todoID === itemID)) {
      currentList[0].bookmarked.push(selectedItem);
    } else {
      currentList[0].bookmarked.splice(bookmarkedItemIndex, 1);
      setIsBookmarked(false);
    }

    updateCurrentList("BOOKMARK_TODO");
  }

  // Delete item
  const deleteItem = async() => {
    const { todoItemIndex, bookmarkedItemIndex, currentListIndex } = await getDataFromList();
    // Remove todo element from the specific list
    currentList.children.splice(todoItemIndex, 1);    

    // Remove todo element from bookmarked
    if (currentList.bookmarked) {
      currentList.bookmarked.splice(bookmarkedItemIndex, 1);
    }

    // Update the array containing all created lists
    currentList.splice(currentListIndex, 1, currentList);
  }

  // Edit specific todo
  const editTodo = async () => {
    const { todoItemIndex } = await getDataFromList();
    const specificTodo = currentList.children[todoItemIndex];

    setIsEditing(true);
    setEditingTodoValue(specificTodo.todo);

    openMenu("");
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

  // Reload page on pull
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    await getListData();

    setRefreshing(false);

    console.log("CURRENT LIST CHILDREN", currentList.children.some((item: any) => !item.completed));
  }

  return (
    <>
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      keyboardShouldPersistTaps="handled"
      scrollEnabled={!isEditing} // Take opposite value since isEditing is false by default
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
            {/* {currentList.children.some((item: any) => item.completed) ? <Text style={[text.sectionTitle, { marginBottom: 20}]}>COMPLETED</Text> : null} */}
            { currentList.children ?
                searchText && searchText.length > 0 ?
                  currentList.children.filter((item: any) => item.completed && item.todo.toLowerCase().includes(searchText)).map((item: any) => (
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
                : currentList.children.filter((item: any) => item.completed).map((item: any) => (
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
              {/* {currentList.children.some((item: any) => !item.completed) ? <Text style={[text.sectionTitle, { marginBottom: 20}]}>NOT COMPLETED</Text> : null} */}

              { currentList.children ?
                  searchText && searchText.length > 0 ?
                    currentList.children.filter((item: any) => !item.completed && item.todo.toLowerCase().includes(searchText)).map((item: any) => (
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
                : currentList.children.filter((item: any) => !item.completed).map((item: any) => (
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
            justifyContent: "flex-start",
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
              updateList={() => getListData()}
            />
          </View>
        : null}
      </View>
    </ScrollView>

    <MenuBar
      isBookmarked={isBookmarked}
      editTodo={editTodo}
      deleteTodo={deleteItem}
      bookmarkTodo={bookmarkTodo}
      menuOpen={menuBarOpen}
    />
    </>
  )
}

export default withNavigation(TodoItemsList);