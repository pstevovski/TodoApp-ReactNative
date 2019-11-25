import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {buttons, text} from '../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';

interface EditTodoModalProps {
  listId: string;
  todoId: string;
  todo: string;
  closeModal: () => void;
  updateList: () => void;
}

const EditTodoModal = (props: EditTodoModalProps) => {
  // Edit todo input
  const [editTodoInput, setEditTodoInput] = useState(props.todo);
  const {getItem, setItem} = useAsyncStorage('@todoList');

  const editTodo = async () => {
    // Close keyboard
    Keyboard.dismiss();

    const list = await getItem();
    if (list) {
      // Get list from storage and find specific list and todo to be edited
      const parsedList = JSON.parse(list);
      const specificList = parsedList.find(
        (list: any) => list.id === props.listId,
      );
      const specificListIndex = parsedList.findIndex(
        (list: any) => list.id === props.listId,
      );
      const todoIndex = specificList.children.findIndex(
        (todo: any) => todo.todoID === props.todoId,
      );
      const bookmarkedIndex = specificList.bookmarked.findIndex(
        (bookmark: any) => bookmark.todoID === props.todoId,
      );

      // Update the children of specific list
      specificList.children.splice(todoIndex, 1, {
        ...specificList.children[todoIndex],
        todo: editTodoInput,
      });

      // Update the bookmarked item of a specific list when updating the todo
      if (specificList.bookmarked) {
        specificList.bookmarked.splice(todoIndex, 1, {
          ...specificList.bookmarked[bookmarkedIndex],
          todo: editTodoInput,
        });
      }

      // Update the whole list and save to storage
      parsedList.splice(specificListIndex, 1, specificList);

      // Save to storage
      await setItem(JSON.stringify(parsedList));

      // Close the modal
      props.closeModal();

      // Update and reload the list
      props.updateList();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        maxHeight: 220,
        backgroundColor: '#fff',
        borderWidth: 0,
        padding: 10,
        elevation: 15,
        borderRadius: 10,
      }}>
      <Text
        style={[
          text.pBig,
          text.title,
          {maxWidth: '100%', textAlign: 'center'},
        ]}>
        EDITING: {props.todo}
      </Text>

      <TextInput
        value={editTodoInput}
        onChangeText={(edit: string) => setEditTodoInput(edit)}
        autoFocus={true}
        style={{
          maxWidth: 300,
          width: '100%',
          backgroundColor: '#fff',
          color: '#333',
          borderBottomWidth: 1,
          borderBottomColor: '#999',
          marginBottom: 20,
        }}
      />

      <TouchableOpacity onPress={editTodo} style={[buttons.global, buttons.md]}>
        <View>
          <Text>EDIT</Text>
        </View>
      </TouchableOpacity>

      <Icon
        onPress={props.closeModal}
        name="close"
        size={30}
        color="#333"
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
        }}
      />
    </View>
  );
};

export default EditTodoModal;
