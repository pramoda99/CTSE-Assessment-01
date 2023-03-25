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

const SquadHome = () => {
  const [name, setName] = useState("");
  const [squad, setSquad] = useState([]);
  const squadRef = firebase.firestore().collection("squad");
  const [addSName, setAddSName] = useState("");
  const [addFormation, setAddFormation] = useState("");
  const [addFSquad, setAddFSquad] = useState("");
  const [addAttacking, setAddAttacking] = useState("");
  const [addDefending, setAddDefending] = useState("");
  const [addCaptain, setAddCaptain] = useState("");
  const [addFTaker, setAddFTaker] = useState("");
  const [addPTaker, setAddPTaker] = useState("");
  const [addLCTaker, setAddLCTaker] = useState("");
  const [addRCTaker, setAddRCTaker] = useState("");
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
    squadRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const squad = [];
      querySnapshot.forEach((doc) => {
        const { sName, formation, fSquad, attacking, defending, captain, fTaker, pTaker, leftTaker, rightTaker } = doc.data();
        squad.push({
          id: doc.id,
          sName,
          formation,
          fSquad,
          attacking,
          defending,
          captain,
          fTaker,
          pTaker,
          leftTaker,
          rightTaker
        });
      });
      setSquad(squad);
    });
  }, []);

  const deleteSquad = (squad) => {
    squadRef
      .doc(squad.id)
      .delete()
      .then(() => {
        alert("Successfully Deleted..!!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addSquad = () => {
    if (addSName && addSName.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        sName: addSName,
        formation: addFormation,
        fSquad: addFSquad,
        attacking: addAttacking,
        defending: addDefending,
        captain: addCaptain,
        fTaker: addFTaker,
        pTaker: addPTaker,
        leftTaker: addLCTaker,
        rightTaker: addRCTaker,
        createdAt: timestamp,
      };
      squadRef
        .add(data)
        .then(() => {
          setAddSName("");
          setAddFormation("");
          setAddFSquad("");
          setAddAttacking("");
          setAddDefending("");
          setAddCaptain("");
          setAddFTaker("");
          setAddPTaker("");
          setAddLCTaker("");
          setAddRCTaker("");
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
              onPress={() => navigation.navigate("AddSquad")}
            >

              <Text style={styles.buttonText}>Add squad</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={squad}
            numColumns={1}
            renderItem={({ item }) => (
              <View>
                <Pressable style={styles.container}>
                  <FontAwesome
                    name="edit"
                    color="green"
                    onPress={() => navigation.navigate("DetailSquad", { item })}
                    style={styles.icon}
                  />

                  <FontAwesome
                    name="trash-o"
                    color="red"
                    onPress={() => deleteSquad(item)}
                    style={styles.icon}
                  />
                  {/* <Pressable onPress={() => navigation.navigate('DetailMatch', { item })}> */}
                  <View style={styles.noteView}>
                      <Text style={styles.title}>{item.sName}</Text>
                      <Text style={styles.subtitle}>Formation: {item.formation}</Text>
                      <Text style={styles.subtitle}>Captain: {item.captain}  (jersey no)</Text>
                      <Text style={styles.subtitle}>Free-Kick Taker: {item.fTaker} (jersey no)</Text>
                      <Text style={styles.subtitle}>Penalty Taker: {item.pTaker} (jersey no)</Text>
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

export default SquadHome;

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
    width:100,
  },
  icon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
    width:100,
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
    marginTop: 5
  }
});
