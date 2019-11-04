import React, { useState, useEffect } from "react";

// React native elements
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Import styling
import { text, containers, buttons } from "../styles/styles";

const Home = (props: any) => {
  const [addRotate, setAddRotate] = useState(0)

  return (
    <View>
      <Icon
        onPress={() => props.navigation.navigate("CreateTodo", { title: "Create Todo"})}
        name="add-circle" 
        size={80} 
        color="#e1302a" style={{
          position: "absolute",
          right: 20,
          top: Dimensions.get("screen").height - 170,
        }}
      />
      {/* <View style={containers.homePageContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Todos", {
          itemID: Math.floor(Math.random() * 50)
        })}>
          <View style={[buttons.global, buttons.md]}>
            <Text style={text.pButtonMd}>Go to list</Text>
          </View>
        </TouchableOpacity>
      </View> */}

      
      {/* <TouchableOpacity onPress={() => props.navigation.navigate("Todo")}>
        <View style={[buttons.global, buttons.sm, colors.red]}>
          <Text style={{color: "#fff"}}>Todo list</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Animation")}>
        <View style={[buttons.global, buttons.sm, colors.red]}>
          <Text style={{color: "#fff"}}>Animations</Text>
        </View>
      </TouchableOpacity> */}

    </View>
  )
}

Home.navigationOptions = () => ({
  header: null
})

export default Home;