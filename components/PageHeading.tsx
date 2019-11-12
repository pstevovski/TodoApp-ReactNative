import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { containers, text } from "../styles/styles";
import Icon from "react-native-vector-icons/MaterialIcons";

interface PageHeadingProps {
  navigation?: any,
  id: string,
  extraIcon?: boolean,
  extraIconType?: string;
  clearList?: () => void
}

const PageHeading = (props: PageHeadingProps) => {
  return (
    <View style={[containers.pageHeading, {
      justifyContent: props.extraIcon ? "space-between" : "flex-start"
    }]}>
      <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Icon name="arrow-back" size={40} color="#999" />
        </TouchableOpacity>

        <Text style={[text.pageTitle, {
          maxWidth: props.extraIcon ? 220 : "100%",
          textAlign: "center",
          paddingLeft: 10
        }]}>{props.navigation.getParam("title")}</Text>
        
        {props.extraIcon ?
          props.extraIconType === "addTodo" ?
            <Icon onPress={() => props.navigation.navigate("CreateTodo", {
                type: "item",
                title: "Add Todo",
                id: props.id
              })} 
              name="playlist-add" 
              size={40} 
              color="#999" 
            />
          : 
            <Icon onPress={props.clearList} name="delete-forever" size={40} color="#999" />
        : null}
    </View>
  )
}

export default withNavigation(PageHeading);