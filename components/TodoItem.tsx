import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface TodoItemProps {
  title: string,
  completed: boolean,
  date?: Date | string
}

const TodoItem = () => {
  return <Text>Todo Item</Text>
}

export default TodoItem;