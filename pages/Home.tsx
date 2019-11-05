import React, { useState, useEffect } from "react";

// React native elements
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Import styling
import { text, containers, buttons } from "../styles/styles";

// Import components
import MainList from "../components/MainList";

const Home = (props: any) => {
  return (
    <View>
      <MainList />

      <Icon
        onPress={() => props.navigation.navigate("CreateTodo", { 
          type: "list",
          title: "Create New List"
        })}
        name="add-circle" 
        size={70} 
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