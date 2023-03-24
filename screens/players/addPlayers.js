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
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddPlayers = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const playerRef = firebase.firestore().collection("players");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
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
      .collection("players")
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
        const { pName, age, height, foot, position, goals, assists, sheets, attacking, dribbling,
          defending,
          passing, physical } = doc.data();
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


  const addPlayer = () => {
    if (addPName && addPName.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        pName: addPName,
        age: addAge,
        height: addHeight,
        foot: addFoot,
        position: addPosition,
        goals: "0",
        assists: "0",
        sheets: "0",
        attacking: addAttacking,
        dribbling: addDribbling,
        defending: addDefending,
        passing: addPassing,
        physical: addPhysical,
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

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* <Text style={styles.title}>Personal Info</Text> */}
          <Text style={[{ fontWeight: 'bold' }, styles]}>Player Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Player Name "
            placeholderTextColor="#aaaaaa"
            onChangeText={(pName) => setAddPName(pName)}
            value={addPName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          <Text style={[{ fontWeight: 'bold' }, styles]}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Age "
            placeholderTextColor="#aaaaaa"
            onChangeText={(age) => {
              if (isNaN(age)) {
                setError1(true);
              } else {
                setError1(false);
                setAddAge(age)
              }
            }}
            value={addAge}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            keyboardType="numeric"
          />
          {error1 && <Text style={styles.error}>Please enter a valid number</Text>}


          <Text style={[{ fontWeight: 'bold' }, styles]}>Preferred Foot</Text>
          <TextInput
            style={styles.input}
            placeholder="Preferred Foot"
            placeholderTextColor="#aaaaaa"
            onChangeText={(foot) => setAddFoot(foot)}
            value={addFoot}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          <Text style={[{ fontWeight: 'bold' }, styles]}>Position</Text>
          <TextInput
            style={styles.input}
            placeholder="Position "
            placeholderTextColor="#aaaaaa"
            onChangeText={(position) => setAddPosition(position)}
            value={addPosition}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          <Text style={[{ fontWeight: 'bold' }, styles]}>Jersey No</Text>
          <TextInput
            style={styles.input}
            placeholder="jersey No "
            placeholderTextColor="#aaaaaa"
            onChangeText={(height) => {
              if (isNaN(height)) {
                setError2(true);
              } else {
                setError2(false);
                setAddHeight(height)
              }
            }}
            value={addHeight}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          {error2 && <Text style={styles.error}>Please enter a valid number</Text>}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              addPlayer();
              navigation.navigate("PlayersHome");
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddPlayers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
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
    //   flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },

  input: {
    width: "80%",
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  addButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
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
  image: {
    width: 120,
    height: 120,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },

  error: {
    color: 'red',
  },

});
