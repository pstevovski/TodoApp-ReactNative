import React, {useState, useEffect} from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Style
import {menubar} from '../styles/styles';

interface MenuBarProps {
  editTodo: () => void;
  deleteTodo: () => void;
  bookmarkTodo: () => void;
  isBookmarked: boolean;
  menuOpen: boolean;
}

const MenuBar = (props: MenuBarProps) => {
  const [translateYValue] = useState(new Animated.Value(0));
  const [renderElement, setRenderElement] = useState(false);

  // When component mounts / unmounts
  useEffect(() => {
    // Allow the element to be rendered
    setRenderElement(true);

    // Reset to initial value
    translateYValue.setValue(0);

    Animated.spring(translateYValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      // If menu bar is closed, remove the element from render once animation is complete
      if (!props.menuOpen) setRenderElement(false);
    });
  }, [props.menuOpen]);

  const menuBarOpen = translateYValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });
  const menuBarClosed = translateYValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return renderElement ? (
    <Animated.View
      style={[
        menubar.main,
        {
          transform: [
            {
              translateY: props.menuOpen ? menuBarOpen : menuBarClosed,
            },
          ],
        },
      ]}
      o>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={menubar.container}>
          <Icon name="edit" onPress={props.editTodo} size={30} color="grey" />
          <Text style={menubar.text}>Edit</Text>
        </View>
        <View
          style={[
            menubar.container,
            {
              marginLeft: 30,
            },
          ]}>
          <Icon
            name="delete-forever"
            onPress={props.deleteTodo}
            size={30}
            color="grey"
          />
          <Text style={menubar.text}>Delete</Text>
        </View>
        <View style={menubar.container}>
          <Icon
            name="bookmark"
            onPress={props.bookmarkTodo}
            size={30}
            color={props.isBookmarked ? '#1dd67a' : 'grey'}
          />
          <Text style={menubar.text}>Bookmark</Text>
        </View>
      </View>
    </Animated.View>
  ) : null;
};

export default MenuBar;
