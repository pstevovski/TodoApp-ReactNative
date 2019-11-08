import React from 'react';
import { StatusBar } from "react-native";

// React navigation
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

// Import pages
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import CreateTodo from "./pages/CreateTodo"
import TodoListPage from "./pages/TodoListPage";

// Create navigation routes
const MainNavigator = createStackNavigator(
  {
    Home: Home,
    About: AboutPage,
    CreateTodo: CreateTodo,
    SpecificTodoList: TodoListPage
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#fff",
        elevation: 2
      },
      headerTintColor: "#e1302a",
      headerTitleStyle: {
        fontSize: 26,
        color: "#e1302a",
      }
    }
  }
)

// Create the container for the navigation routes
const AppContainer = createAppContainer(MainNavigator);

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#e1302a" barStyle="light-content" />
      <AppContainer />
    </>
  )
}


export default App;