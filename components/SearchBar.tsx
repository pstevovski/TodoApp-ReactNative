import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface SearchBarProps {
  search: (text: string) => void
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <View>
      <Icon name="search" size={20} style={{
        position: "absolute",
        top:  14,
        left: 5
      }} />
      <TextInput 
        placeholder="Search..." 
        style={{paddingLeft: 30}}
        onChangeText={text => props.search(text)}
      />
    </View>
  )
}

export default SearchBar;