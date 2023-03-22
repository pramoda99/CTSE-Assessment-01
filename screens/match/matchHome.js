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
  import Icon from "react-native-vector-icons/FontAwesome";
  
  const MatchHome = () => {
    const [name, setName] = useState("");
    const [matches, setMatches] = useState([]);
    const matchRef = firebase.firestore().collection("matches");
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
      matchRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
        const matches = [];
        querySnapshot.forEach((doc) => {
          const { heading } = doc.data();
          matches.push({
            id: doc.id,
            heading,
          });
        });
        setMatches(matches);
      });
    }, []);
  
    const deleteMatch = (matches) => {
      matchRef
        .doc(matches.id)
        .delete()
        .then(() => {
          alert("Successfully Deleted..!!");
        })
        .catch((error) => {
          alert(error);
        });
    };
  
    const addMatch = () => {
      if (addData && addData.length > 0) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          heading: addData,
          createdAt: timestamp,
        };
        matchRef
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
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("AddMatch")}
            >
             
              <Text style={styles.buttonText}>Add match</Text>
            </TouchableOpacity>
          </View>
  
          <FlatList
            data={matches}
            numColumns={1}
            renderItem={({ item }) => (
              <View>
                <Pressable style={styles.container}>
                  <FontAwesome
                    name="edit"
                    color="green"
                    onPress={() => navigation.navigate("DetailMatch", { item })}
                    style={styles.icon}
                  />
  
                  <FontAwesome
                    name="trash-o"
                    color="red"
                    onPress={() => deleteMatch(item)}
                    style={styles.icon}
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
  
  export default MatchHome;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#e5e5e5",
      padding: 15,
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
  });
  