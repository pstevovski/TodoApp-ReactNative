import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";

interface BookmarkedItemProps {
  id: string,
  listID: string,
  listTitle: string,
  text: string,
  date: Date | string,
  completed: boolean,
  navigation?: any
}

const BookmarkedItem = (props: BookmarkedItemProps) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate("SpecificTodoList", {
      id: props.listID,
      title: props.listTitle
    })}>
      <View>
        <Text>{props.text}</Text>
        <Text>{props.date}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default withNavigation(BookmarkedItem);