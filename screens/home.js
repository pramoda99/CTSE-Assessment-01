import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("User not found");
        }
      });
  }, []);

  useEffect(() => {
    todoRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading } = doc.data();
        todos.push({
          id: doc.id,
          heading,
        });
      });
      setTodos(todos);
    });
  }, []);

  const deleteTodo = (todos) => {
    todoRef
      .doc(todos.id)
      .delete()
      .then(() => {
        alert("Successfully Deleted..!!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addTodo = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{ margin: 10, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Hello , {name.firstname}
          </Text>
          <TouchableOpacity
            onPress={() => {
              firebase.auth().signOut();
            }}
            style={styles.button}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
         

          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Add")}>
          <Icon name="plus" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          numColumns={1}
          renderItem={({ item }) => (
            <View>
              <Pressable
                style={styles.container}
                
              >
<FontAwesome
                  name="edit"
                  color="green"
                  onPress={() => navigation.navigate("Detail", { item })}
                  style={styles.todoIcon}
                />

                <FontAwesome
                  name="trash-o"
                  color="red"
                  onPress={() => deleteTodo(item)}
                  style={styles.todoIcon}
                />



                <View style={styles.innerContainer}>
                  <Text style={styles.itemHeading}>
                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
   shadowColor:'blue',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation:7,

  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },

  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },

  formContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },

  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
  },
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  addButton: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    marginTop: 20,
    height: 50,
    width: 150,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
