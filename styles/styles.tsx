import { StyleSheet } from "react-native";

// Text styling
export const text = StyleSheet.create({
  p: {
    fontSize: 24,
  },
  a: {
    fontSize: 18,
    textDecorationLine: "underline",
    color: "blue"
  }
})

// Views styling
export const containers = StyleSheet.create({
  div: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#f5f5f5"
  },
})

// Buttons
export const buttons = StyleSheet.create({
  global: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    borderRadius: 25,
  },
  sm: {
    width: 100,
    height: 40,
    marginTop: 20,
    color: "#fff",
    textAlign: "center",
  }
})

// Colors
export const colors = StyleSheet.create({
  red: {
    backgroundColor: "#e1302a",
    color: "#fff"
  },
  white: {
    color: "#fff"
  }
})