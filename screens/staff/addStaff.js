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
  import { firebase } from "../../config";
  import { FontAwesome } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  
  const AddStaff = () => {
    const [name, setName] = useState("");
    const [staff, setStaff] = useState([]);
    const staffRef = firebase.firestore().collection("staff");
    const [addData, setAddData] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
      firebase
        .firestore()
        .collection("staff")
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
      staffRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
        const staff = [];
        querySnapshot.forEach((doc) => {
          const { heading } = doc.data();
          staff.push({
            id: doc.id,
            heading,
          });
        });
        setStaff(staff);
      });
    }, []);
  
    
  
    const addStaff = () => {
      if (addData && addData.length > 0) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          heading: addData,
          createdAt: timestamp,
        };
        staffRef
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
        
          </View>
          <Text style={styles.title}>Add New Staff member</Text>
            <TextInput
              style={styles.input}
              placeholder="Add a New Staff"
              placeholderTextColor="#aaaaaa"
              onChangeText={(heading) => setAddData(heading)}
              value={addData}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

{/* <TextInput
              style={styles.input}
              placeholder="Add a New "
              placeholderTextColor="#aaaaaa"
              onChangeText={(heading) => setAddData(heading)}
              value={addData}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Add a New "
              placeholderTextColor="#aaaaaa"
              onChangeText={(heading) => setAddData(heading)}
              value={addData}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Add a New "
              placeholderTextColor="#aaaaaa"
              onChangeText={(heading) => setAddData(heading)}
              value={addData}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            /> */}
  
            <TouchableOpacity style={styles.addButton}
             onPress={() => {
                 addStaff();
                 navigation.navigate("StaffHome");
              }} >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
  
    
      </SafeAreaView>
    );
  };
  
  export default AddStaff;
  
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
  