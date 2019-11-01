import React from "react";
import { text, containers, buttons, colors } from "../styles/styles";

// React native elements
import { View, Text, Button, TouchableOpacity } from "react-native";

const Home = props => {
  return (
    <View style={containers.div}>
      <Text style={text.p}>ReactNative TodoApp</Text>
      
      <TouchableOpacity onPress={() => props.navigation.navigate("Todo")}>
        <View style={[buttons.global, buttons.sm, colors.red]}>
          <Text style={{color: "#fff"}}>Todo list</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default Home;