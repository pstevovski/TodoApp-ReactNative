import React from 'react';

// React navigation
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

// Import pages
import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";
import AboutPage from "./pages/AboutPage";

// Create navigation routes
const MainNavigator = createStackNavigator(
  {
    Home: Home,
    Todo: TodoPage,
    About: AboutPage
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#f5f5f5",
        elevation: 0
      },
      headerTintColor: "#e1302a",
      headerTitleStyle: {
        fontSize: 24,
        color: "#e1302a",
        fontWeight: "bold"
      }
    }
  }
)

// Create the container for the navigation routes
const AppContainer = createAppContainer(MainNavigator);

const App = () => {
  return (
    <AppContainer />
  )
}


export default App;