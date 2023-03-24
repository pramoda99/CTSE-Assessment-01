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
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const PlayersHome = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const playerRef = firebase.firestore().collection("players");
  const [addPName, setAddPName] = useState("");
  const [addAge, setAddAge] = useState("");
  const [addHeight, setAddHeight] = useState("");
  const [addFoot, setAddFoot] = useState("");
  const [addPosition, setAddPosition] = useState("");
  const [addGoals, setAddGoals] = useState("");
  const [addAssists, setAddAssists] = useState("");
  const [addSheets, setAddSheets] = useState("");
  const [addAttacking, setAddAttacking] = useState("");
  const [addDefending, setAddDefending] = useState("");
  const [addDribbling, setAddDribbling] = useState("");
  const [addPassing, setAddPassing] = useState("");
  const [addPhysical, setAddPhysical] = useState("");
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
    playerRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const players = [];
      querySnapshot.forEach((doc) => {
        const { pName,age,height,foot,position,goals,assists,sheets, attacking,dribbling,
            defending,
            passing , physical } = doc.data();
        players.push({
           id: doc.id,
          pName,
          age,
          height,
          foot,
          position,
          goals,
          assists,
          sheets,
          attacking,
          dribbling,
          defending,
          passing,
          physical
        });
      });
      setPlayers(players);
    });
  }, []);

  const deletePlayer = (players) => {
    playerRef
      .doc(players.id)
      .delete()
      .then(() => {
        alert("Successfully Deleted..!!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addPlayer = () => {
    if (addPName && addPName.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
         pName: addPName,
        age:addAge,
        height:addHeight,
        foot:addFoot,
        position:addPosition,
        goals:addGoals,
        assists:addAssists,
        sheets:addSheets,
        attacking:addAttacking,
        dribbling:addDribbling,
        defending:addDefending,
        passing:addPassing,
       physical:addPhysical,
        createdAt: timestamp,
      };
      playerRef
        .add(data)
        .then(() => {
          setAddPName("");
          setAddAge("");
          setAddHeight("")
          setAddFoot("")
          setAddPosition("")
          setAddGoals("")
          setAddAssists("")
          setAddSheets("")
          setAddDefending("")
          setAddPassing("")
          setAddAttacking("")
          setAddDribbling("")
          setAddPhysical("")
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
//   console(item.physical);
  return (
    <ScrollView>
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddPlayers")}
          >
           
            <Text style={styles.buttonText}>Add New Player</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={players}
          numColumns={1}
          renderItem={({ item }) => (
            <View>
              <Pressable style={styles.container}>
                <FontAwesome
                  name="edit"
                  color="green"
                  onPress={() => navigation.navigate("DetailPlayers", { item })}
                  style={styles.icon}
                />

                <FontAwesome
                  name="trash-o"
                  color="red"
                  onPress={() => deletePlayer(item)}
                  style={styles.icon}
                />

                  {/* <Pressable onPress={() => navigation.navigate('DetailPlayers', { item })}> */}
                  <View style={styles.noteView}>
                      <Text style={styles.title}>{item.pName}</Text>
                      <Text style={styles.subtitle}>Position: {item.position}</Text>
                      <Text style={styles.subtitle}>Jersey No: {item.height}</Text>
                      <Text style={styles.subtitle}>Goals: {item.goals}</Text>
                      <Text style={styles.subtitle}>Assists: {item.assists}</Text>
                      <Text style={styles.subtitle}>Clean Sheets: {item.sheets}</Text>
                    </View>
                  {/* </Pressable> */}
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default PlayersHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
  },
  innerContainer: {
    alignItems: "flex-start",
    flexDirection: "column",
    marginLeft: 45,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  noteView: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
    alignItems: 'center'
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
    fontSize: 15,
  },
  icon: {
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

  subtitle: {
    fontSize: 16,
    marginTop: 5,
  }
});
