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
          const { sName,formation,fSquad,attacking,defending,captain,fTaker,pTaker,leftTaker,rightTaker } = doc.data();
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
          <View
            style={{ margin: 10, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Hello , {name.firstname}
            </Text>
        
          </View>
          <Text style={styles.title}>Create New Squad</Text>
          <TextInput
              style={styles.input}
              placeholder="Squad Name "
              placeholderTextColor="#aaaaaa"
              onChangeText={(sName) => setAddSName(sName)}
              value={addSName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

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
   
   <TextInput
              style={styles.input}
              placeholder="Full Squad "
              placeholderTextColor="#aaaaaa"
              onChangeText={(fSquad) => setAddFSquad(fSquad)}
              value={addFSquad}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            /> 

<Text style={styles.title}>Game Plan</Text>
        <TextInput
              style={styles.input}
              placeholder="Attacking Plan"
              placeholderTextColor="#aaaaaa"
              onChangeText={(attacking) => setAddAttacking(attacking)}
              value={addAttacking}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Defending Plan "
              placeholderTextColor="#aaaaaa"
              onChangeText={(defending) => setAddDefending(defending)}
              value={addDefending}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Captain "
              placeholderTextColor="#aaaaaa"
              onChangeText={(captain) => setAddCaptain(captain)}
              value={addCaptain}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Free-kick Taker "
              placeholderTextColor="#aaaaaa"
              onChangeText={(fTaker) => setAddFTaker(fTaker)}
              value={addFTaker}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Panelty Taker "
              placeholderTextColor="#aaaaaa"
              onChangeText={(pTaker) => setAddPTaker(pTaker)}
              value={addPTaker}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Left Conor Taker "
              placeholderTextColor="#aaaaaa"
              onChangeText={(leftTaker) => setAddLCTaker(leftTaker)}
              value={addLCTaker}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Right Conor Taker "
              placeholderTextColor="#aaaaaa"
              onChangeText={(rightTaker) => setAddRCTaker(rightTaker)}
              value={addRCTaker}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
  
            <TouchableOpacity style={styles.addButton}
             onPress={() => {
                 addSquad();
                 navigation.navigate("SquadHome");
              }} >
              <Text style={styles.buttonText}>Create A New Squad</Text>
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
  });
  