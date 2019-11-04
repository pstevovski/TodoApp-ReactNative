import React from "react";
import { Text } from "react-native";

const CreateTodoPage = () => {
  return <Text>Create Todo Page</Text>
}

CreateTodoPage.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("title")
})

export default CreateTodoPage;