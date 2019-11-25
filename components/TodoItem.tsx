import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated, Easing} from 'react-native';

import {withNavigation} from 'react-navigation';

// Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {todo, icons} from '../styles/styles';

interface TodoItemProps {
  todo: string;
  todoID: string;
  completed: boolean;
  date?: Date | string;
  onPress: (todoID: string) => void;
  openMenu: (todoID: string) => void;
  navigation: any;
}

// Animated icon component
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const TodoItem = (props: TodoItemProps) => {
  const [iconAnimation] = useState(new Animated.Value(0));
  const [iconRotationAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    iconAnimation.setValue(0);

    // Run both animation parallel
    Animated.parallel([
      Animated.timing(iconAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(2),
        useNativeDriver: true,
      }),
      Animated.spring(iconRotationAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const scaleIconUp = iconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.1],
  });
  const rotateIconCheck = iconRotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scaleIconDown = iconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const rotateIconClose = iconRotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => props.onPress(props.todoID)}
        onLongPress={() => props.openMenu(props.todoID)}
        style={[
          todo.item,
          {
            backgroundColor: props.completed ? '#1dd67a' : '#fff',
          },
        ]}>
        <View>
          {/* DATE */}
          <Text style={todo.date}>{props.date}</Text>

          {/* TODO DESCRIPTION */}
          <Text
            style={{
              textDecorationLine: props.completed ? 'line-through' : 'none',
              textDecorationStyle: 'solid',
              color: props.completed ? '#fff' : '#555',
              fontSize: 16,
            }}>
            {props.todo}
          </Text>
        </View>
      </TouchableOpacity>

      <AnimatedIcon
        name={`${
          props.completed ? 'check-circle-outline' : 'close-circle-outline'
        }`}
        size={30}
        color={`${props.completed ? '#1dd67a' : '#e1302a'}`}
        style={[
          icons.itemIcons,
          {
            transform: [
              {
                scale: props.completed ? scaleIconUp : scaleIconDown,
              },
              {
                rotate: props.completed ? rotateIconCheck : rotateIconClose,
              },
            ],
          },
        ]}
      />
    </Animated.View>
  );
};

export default withNavigation(TodoItem);
