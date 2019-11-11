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
  },
  pageTitle: {
    fontSize: 32,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#666",
    fontWeight: "bold",
    maxWidth: 220
  },
  listTitle: {
    fontSize: 28,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: "left",
    fontWeight: "bold",
    color: "#999",
    textTransform: "uppercase"
  }
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
  },
  pageHeading: {
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
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
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  // Todo List
  list: {
    maxWidth: 500,
    width:  "85%",
    padding:   5,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#fff",
    shadowColor: "#333",
    shadowOpacity: 0.5,
    elevation: 3,
    padding: 10,
    borderRadius: 5,
    marginBottom: 40,
    maxWidth: 400,
    width: "90%",
  },
  date: {
    position: "absolute",
    right: -10,
    top: -30,
    fontSize: 12,
    fontWeight: "bold",
    color: "#999",
    fontStyle: "italic"
  }
})

// Todo menu bar
export const menubar = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color: "grey",
    textTransform: "uppercase"
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth:  0,
    shadowColor: "#333",
    shadowOpacity: 0.3,
    elevation: 15,
    shadowOffset: {
      width: -50,
      height: -30
    }
  }
})

// Search bar
export const searchBar = StyleSheet.create({
  global: {
    width: 300,
    borderRadius: 25,
    borderColor: "#999",
    borderWidth: 2,
    height: 45
  }
})

// Icons
export const icons = StyleSheet.create({
  itemIcons: {
    paddingHorizontal: 10,
    marginBottom: 35
  }
})