import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage, { useAsyncStorage } from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";

// Unique IDs generator
import uuid from "uuid";

const CreateTodo = (props: any) => {
  // const [editState, setEditState] = useState(false);
  const { getItem, setItem } = useAsyncStorage("@todoList");
  const [listArray, setListArray] = useState([]);

  // List properties
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    readFromStorage();

    if (props.navigation.getParam("state") === "edit") {
      editState();
    }

  }, [])
  const readFromStorage = async () => {
    const list = await getItem();

    if (list !== null) {
      setListArray(JSON.parse(list));
      console.log(list);
    } else {
      setListArray([]);
    }
  }

  // Get current date and time
  const currentDateAndTime = () => {
    const date = new Date();
    const currentDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}`:date.getMinutes()}` // Format: mm/dd/yyyy, hh:mm:ss

    return currentDate;
  }

  // Save item to storage
  const saveList = async () => {
    // Fields must be filled
    if (!title || !description) return;

    // Update the array of lists / todo items
    const newListArray: Object[] = [...listArray];
    newListArray.push({
      id: uuid.v4().slice(0, 8),
      title,
      description,
      date: `Created: ${currentDateAndTime()}`,
      children: [],
      completed: false    
    })

    saveToStorage(newListArray);
  }

  // Add and save todo items in a specific todo list
  const addTodoToList = () => {
    if (!title || !description) return;

    // Add item to the list
    const listItems: Object[] = [...listArray];
    
    /* 
      TODO:
      - Find the object in the array based on index
      - Push a new item to the children array thats of type object.
    */
  }

  const editState = () => {
    setTitle(props.navigation.getParam("listTitleInput"));
    setDescription(props.navigation.getParam("desc"));
  }
  
  const editItem = async () => {
    const editedListArray: any[] = [...listArray];
    const id = props.navigation.getParam("id");
    const listIndex = editedListArray.findIndex((item: any) => item.id === id)
    let listItem = editedListArray.find((item: any) => item.id === id);
    if (listItem) {
      listItem = {
        ...listItem,
        id,
        title,
        description,
        date: `Updated: ${currentDateAndTime()}`,
      }
    }
    // Update object at specific index
    editedListArray.splice(listIndex, 1, listItem)

    saveToStorage(editedListArray);
  }

  // Save new / updated item
  const saveToStorage = async (array: Object[]) => {
    // Save to storage
    await setItem(JSON.stringify(array));

    // Clear input fields
    setTitle("");
    setDescription("");

    props.navigation.navigate("Home")
  }

  return (
    <View>
      {/* List / Item title */}
      <View>
        <Text>Title: </Text>
        <TextInput
          placeholder="Title"
          onChangeText={(title: string) => setTitle(title)}
          value={title}
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "#e1302a"
          }}
        />
      </View>
      
      {/* List / Item description */}
      <View>
        <Text>Description: </Text>
        <TextInput
          placeholder="Description"
          onChangeText={(description: string) => setDescription(description)}
          value={description}
          multiline={true}
          numberOfLines={8}
          style={{
            padding: 10,
            textAlignVertical: "top"
          }}
        />
      </View>

      {/* Save / Edit button */}
      <TouchableOpacity onPress={() => {
        if (props.navigation.getParam("state") === "edit") {
          editItem();
        } else if (props.navigation.getParam("type") === "item") {
          addTodoToList();
        } else {
          saveList();
        }
      }}>
        <View>
          <Text>{props.navigation.getParam("state") === "edit" ? 'Edit List' : 'Create List'}</Text>
        </View>
      </TouchableOpacity>

      <Text onPress={async() => await AsyncStorage.clear()}>CLEAR</Text>
    </View>
  )
}

CreateTodo.navigationOptions = ({ navigation }: any) => ({
  title: navigation.getParam("title")
})

export default withNavigation(CreateTodo);