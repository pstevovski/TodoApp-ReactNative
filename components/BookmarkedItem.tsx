import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import {icons, todo, text} from '../styles/styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BookmarkedItemProps {
  id: string;
  listID: string;
  listTitle: string;
  text: string;
  date: Date | string;
  completed: boolean;
  navigation?: any;
}

const BookmarkedItem = (props: BookmarkedItemProps) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('SpecificTodoList', {
            id: props.listID,
            title: props.listTitle,
          })
        }
        style={[
          todo.item,
          {
            backgroundColor: props.completed ? '#1dd67a' : '#fff',
          },
        ]}>
        {/* DATE */}
        <Text style={[todo.date, {top: -20, right: 0}]}>{props.date}</Text>

        {/* TEXT */}
        <Text
          style={{
            color: props.completed ? '#fff' : '#555',
          }}>
          {props.text}
        </Text>
      </TouchableOpacity>

      {props.completed ? (
        <View style={icons.itemIcons}>
          <Icon name="check-circle-outline" size={30} color="#1dd67a" />
        </View>
      ) : (
        <View style={icons.itemIcons}>
          <Icon name="close-circle-outline" size={30} color="#e1302a" />
        </View>
      )}
    </View>
  );
};

export default withNavigation(BookmarkedItem);
