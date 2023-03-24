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

const AddSquads = () => {
  const [name, setName] = useState("");
  const [squad, setSquad] = useState([]);
  const squadRef = firebase.firestore().collection("squad");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [error5, setError5] = useState(false);
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
      .collection("squad")
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
          <Text style={styles.title}>Squad Game Plan</Text>

          <Text style={[{ fontWeight: 'bold' }, styles]}>Squad Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Squad Name "
            placeholderTextColor="#aaaaaa"
            onChangeText={(sName) => setAddSName(sName)}
            value={addSName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={[{ fontWeight: 'bold' }, styles]}>Formation</Text>
          <TextInput
            style={styles.input}
            placeholder="Formation"
            placeholderTextColor="#aaaaaa"
            onChangeText={(formation) => setAddFormation(formation)}
            value={addFormation}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            textContentType="number"
          />

          <Text style={[{ fontWeight: 'bold' }, styles]}>Captain (jersey no)</Text>
          <TextInput
            style={styles.input}
            placeholder="Captain "
            placeholderTextColor="#aaaaaa"
            onChangeText={(captain) => {
              if (isNaN(captain)) {
                setError1(true);
              } else {
                setError1(false);
              setAddCaptain(captain)
            }
          }}
            value={addCaptain}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
           {error1 && <Text style={styles.error}>Please enter a valid number</Text>}

          <Text style={[{ fontWeight: 'bold' }, styles]}>Free-Kick Taker (jersey no)</Text>
          <TextInput
            style={styles.input}
            placeholder="Free-kick Taker "
            placeholderTextColor="#aaaaaa"
            onChangeText={(fTaker) => {
              if (isNaN(fTaker)) {
                setError2(true);
              } else {
                setError2(false);
              setAddFTaker(fTaker)}}}
            value={addFTaker}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
           {error2 && <Text style={styles.error}>Please enter a valid number</Text>}

          <Text style={[{ fontWeight: 'bold' }, styles]}>Penalty Taker (jersey no)</Text>
          <TextInput
            style={styles.input}
            placeholder="Penalty Taker "
            placeholderTextColor="#aaaaaa"
            onChangeText={(pTaker) => {
              if (isNaN(pTaker)) {
                setError3(true);
              } else {
                setError3(false);
            setAddPTaker(pTaker)}}}
            value={addPTaker}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
           {error3 && <Text style={styles.error}>Please enter a valid number</Text>}

          <Text style={[{ fontWeight: 'bold' }, styles]}>Left Corner Taker (jersey no)</Text>
          <TextInput
            style={styles.input}
            placeholder="Left corner taker "
            placeholderTextColor="#aaaaaa"
            onChangeText={(leftTaker) => {
              if (isNaN(leftTaker)) {
                setError4(true);
              } else {
                setError4(false);
              setAddLCTaker(leftTaker)}}}
            value={addLCTaker}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
           {error4 && <Text style={styles.error}>Please enter a valid number</Text>}

          <Text style={[{ fontWeight: 'bold' }, styles]}>Right Corner Taker (jersey no)</Text>
          <TextInput
            style={styles.input}
            placeholder="Right corner Taker "
            placeholderTextColor="#aaaaaa"
            onChangeText={(rightTaker) => {
              if (isNaN(rightTaker)) {
                setError5(true);
              } else {
                setError5(false);
              setAddRCTaker(rightTaker)}}}
            value={addRCTaker}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
           {error5 && <Text style={styles.error}>Please enter a valid number</Text>}

          <TouchableOpacity style={styles.addButton}
            onPress={() => {
              addSquad();
              navigation.navigate("SquadHome");
            }} >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>


      </SafeAreaView>
    </ScrollView>
  );
};

export default AddSquads;

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
    fontWeight: 'bold',
    marginBottom: 24,
  },

  input: {
    width: '80%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  addButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
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
  error: {
    color: 'red',
  },
});
