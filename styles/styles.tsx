import { StyleSheet } from "react-native";

// Text styling
export const text = StyleSheet.create({
  global: {
    color: "#333",
    marginVertical:   0,
    marginHorizontal: 0
  },
  p: {
    fontSize: 16,
  },
  pBig: {
    fontSize: 20
  },
  pButtonMd: { fontSize: 18 },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 20
  },
  pageTitle: {
    fontSize: 32,
  },
  sectionTitle: {
    fontSize: 28,
  },
})

// Containers
export const containers = StyleSheet.create({
  div: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee", // Default color
  },
  homePageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 120
  }
})

// Buttons
export const buttons = StyleSheet.create({
  global: {
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#333",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
    // height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sm: {
    width:  50,
    fontSize: 16
  },
  md: {
    width: 120,
    fontSize: 20
  },
  lg: {
    width: 180,
    fontSize: 24
  }
})

// Todo items
export const todo = StyleSheet.create({
  global: {
    marginVertical: 5,
    marginHorizontal: 15
  },
  // Todo List
  list: {
    maxWidth: 500,
    width:  "80%",
    padding: 5,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: "#fff",
  }
})