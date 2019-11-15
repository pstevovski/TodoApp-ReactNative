import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { searchBar } from "../styles/styles";

interface SearchBarProps {
  search: (text: string) => void
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <View style={searchBar.global}>
      <Icon name="search" size={25} color="#999" style={{
        position: "absolute",
        top:  8,
        left: -15
      }} />
      <TextInput 
        placeholder="Search..." 
        style={{paddingLeft: 45, paddingRight: 20}}
        onChangeText={text => props.search(text)}
      />
    </View>
  )
}

export default SearchBar;