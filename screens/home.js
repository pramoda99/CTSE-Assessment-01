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
import Icon from "react-native-vector-icons/FontAwesome";

const Home = () => {
  const [name, setName] = useState("");
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





  return (
    <SafeAreaView style={styles.container}>



      
      <View style={{ flex: 1 }}>
        <View
          style={{ margin: 10, alignItems: "left", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Hello , {name.firstname}
            <br></br>
            <br></br>
            🤾‍♂️ ⚽ Welcome to the Football manager - 23 ⚽   🤾‍♂️



          
          </Text>


        
        </View>


        <View style={styles.formContainer}>


          <TouchableOpacity
            style={styles.addButton}
             onPress={() => navigation.navigate("PlayersHome")}
          >
            <Text style={styles.buttonText}>Players</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton1}
             onPress={() => navigation.navigate("PlayersHome")}
          >
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
       

       
       
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("SquadHome")}
          >
            <Text style={styles.buttonText}>Squad</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.addButton1}
             onPress={() => navigation.navigate("PlayersHome")}
          >
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("TrainingHome")}
          >
            <Text style={styles.buttonText}>Training</Text>
          </TouchableOpacity>



          <TouchableOpacity
            style={styles.addButton1}
             onPress={() => navigation.navigate("PlayersHome")}
          >
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("MatchHome")}
          >
            <Text style={styles.buttonText}>Match</Text>
          </TouchableOpacity>
        </View>

        <br></br>

        <br></br>

        <br></br>
<view
 style={{ margin: 10, alignItems: "center", justifyContent: "center" }}
 >
<TouchableOpacity
            onPress={() => {
              firebase.auth().signOut();
            }}
            style={styles.button}
          >


            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign out</Text>
          </TouchableOpacity>
</view>

      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ADD8E6",
    padding: 5,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
    // marginRight: 45,
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
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton1: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "ADD8E6",
    width: 10,
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
