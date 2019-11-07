import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import TodoItem from "./TodoItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withNavigation } from "react-navigation";
import { useAsyncStorage } from "@react-native-community/async-storage";
import SearchBar from "./SearchBar";

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
  const [isMarkedAsFavorite, setIsMarkedAsFavorite] = useState(false);

  // Get and Set items to favorites list
  const { getItem: getFavorite, setItem: setFavorite } = useAsyncStorage("@todoListFavorites");

  useEffect(() => {
    getListData();
  }, [items]);

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
    if (!itemID) {
      setItemID(id);
    }

    // Check if item is marked as favorite
    const favorites = await getFavorite();
    if (favorites) {
      const checkIfFavoriteExists = JSON.parse(favorites).find((fav: any) => fav.todoID === id);

      if (checkIfFavoriteExists) {
        setIsMarkedAsFavorite(true);
      } else {
        setIsMarkedAsFavorite(false);
      }
    }

    // Toggle the menu
    setMenuBarOpen(!menuBarOpen);
  }

  // Delete pressed todo item
  const deleteTodo = async () => {
    const deltedTodoIndex = items.findIndex((todo: any) => todo.todoID === itemID);
    const savedLists = await getItem();

    if (savedLists) {
      const listsAfterTodoIsDeleted = JSON.parse(savedLists);
      let specificList = listsAfterTodoIsDeleted.find((list: any) => list.id === props.id);
      const listIndex  = listsAfterTodoIsDeleted.findIndex((list: any) => list.id === props.id);
      
      // Remove todo element from the specific list
      specificList.children.splice(deltedTodoIndex, 1);    

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
  const markAsFavorite = async () => {
    const favoritesList = await getFavorite();
    let favorites = [];

    if (favoritesList !== null) {
      favorites = JSON.parse(favoritesList);
    } else {
      favorites = [];
    }

    // Find todo in list
    const findTodo = items.find((todo: any) => todo.todoID === itemID);

    // Prevent same todo to be added to favorites multiple times
    if (!favorites.find((fav: any) => fav.todoID === itemID)) {
      favorites.push(findTodo)
    } else {
      // Remove from favorites list if clicked on icon if item is already marked as favorite
      const favoriteIndex = favorites.findIndex((fav: any) => fav.todoID === itemID);
      favorites.splice(favoriteIndex, 1);
      setIsMarkedAsFavorite(false);
    }

    // Save to storage
    await setFavorite(JSON.stringify(favorites));

    // Close menu bar
    openMenu(itemID);

    // Clear item ID
    setItemID("");
  }

  return (
    <View>
      <SearchBar search={searchTodos} />

      {items ? 
        searchText && searchText.length > 0 ?
          items.filter((item: any) => item.todo.toLowerCase().includes(searchText)).map((item: any) => (
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
       : items.map((item: any) => (
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
      : null}


      <Icon
        onPress={() => props.navigation.navigate("CreateTodo", { 
          type: "item",
          title: "Add Todo",
          id: props.id
        })}
        name="add-circle" 
        size={70} 
        color="#e1302a" style={{
          position: "absolute",
          right: 20,
          top: Dimensions.get("screen").height - 220,
        }}
      />

      <View style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderTopColor: "#333",
        borderTopWidth: 1,
        position: "absolute",
        backgroundColor: "#fff",
        left: 0,
        top: menuBarOpen ? Dimensions.get("screen").height - 180 : Dimensions.get("screen").height + 200,
      }}>
        <Icon name="edit"     size={30} color="grey" />
        <Icon name="delete"   onPress={deleteTodo} size={30} color="grey" />
        <Icon name="favorite" onPress={markAsFavorite} size={30} color={isMarkedAsFavorite ? "#e1302a" : "grey"} />
      </View>
    </View>
  )
}

export default withNavigation(TodoItemsList);