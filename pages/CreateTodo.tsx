import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage, { useAsyncStorage } from "@react-native-community/async-storage";

// Unique IDs generator
import uuid from "uuid";

const CreateTodo = (props: any) => {
  const [editState, setEditState] = useState(false);
  const { getItem, setItem } = useAsyncStorage("@todoList");
  const [listArray, setListArray] = useState([]);

  // List properties
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    readFromStorage();
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


  // Save item to storage
  const saveList = async () => {
    // Fields must be filled
    if (!title || !description) return;

    // Current date and time
    const date = new Date();
    const currentDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}`:date.getMinutes()}` // Format: mm/dd/yyyy, hh:mm:ss

    // Update the array of lists / todo items
    const newListArray: Object[] = [...listArray];
    newListArray.push({
      title,
      description,
      id: uuid.v4().slice(0, 8),
      dateCreated: currentDate,
      children: []
    })

    // Save to storage
    await setItem(JSON.stringify(newListArray));

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
      <TouchableOpacity onPress={saveList}>
        <View>
          <Text>{editState ? 'Edit' : 'Add'}</Text>
        </View>
      </TouchableOpacity>

      <Text onPress={async() => await AsyncStorage.clear()}>CLEAR</Text>
    </View>
  )
}

CreateTodo.navigationOptions = ({ navigation }: any) => ({
  title: navigation.getParam("title")
})

export default CreateTodo;