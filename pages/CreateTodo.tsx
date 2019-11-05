import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CreateTodoProps {
  type: string,
  title: string,
}

const CreateTodo = (props: CreateTodoProps) => {
  const [editState, setEditState] = useState(false);

  // List properties
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Save item to storage

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
    </View>
  )
}

CreateTodo.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("title")
})

export default CreateTodo;