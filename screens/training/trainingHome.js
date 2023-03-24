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
  
  const TrainingHome = () => {
    const [name, setName] = useState("");
    const [training, setTraining] = useState([]);
    const trainingRef = firebase.firestore().collection("training");
    const [addTDate, setAddTDate] = useState("");
  const [addTTime, setAddTTime] = useState("");
  const [addFocus, setAddFocus] = useState("");
  const [addSession, setAddSession] = useState("");
  const [addStriker, setAddStriker] = useState("");
  const [addMidfielder, setAddMidfielder] = useState("");
  const [addDefender, setAddDefender] = useState("");
  const [addGoalkeeper, setAddGoalkeeper] = useState("");
  const [addRating, setAddRating] = useState("");
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
      trainingRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
        const training = [];
        querySnapshot.forEach((doc) => {
          const { tDate,
            tTime,
            focus,
            session,
            striker,
            midfielder,
            defender,
            goalkeeper,
            rating } = doc.data();
          training.push({
            id: doc.id,
            tDate,
            tTime,
            focus,
            session,
            striker,
            midfielder,
            defender,
            goalkeeper,
            rating,
          });
        });
        setTraining(training);
      });
    }, []);
  
    const deleteTraining = (training) => {
      trainingRef
        .doc(training.id)
        .delete()
        .then(() => {
          alert("Successfully Deleted..!!");
        })
        .catch((error) => {
          alert(error);
        });
    };
  
    const addTraining = () => {
      if (tDate && tDate.length > 0) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          tDate:addTDate,
          tTime:addTTime,
          focus:addFocus,
          session:addSession,
          striker:addStriker,
          midfielder:addMidfielder,
          defender:addDefender,
          goalkeeper:addGoalkeeper,
          rating:addRating,
          createdAt: timestamp,
        };
        trainingRef
          .add(data)
          .then(() => {
            setAddTDate("");
            setAddTTime("");
            setAddFocus("");
            setAddSession("");
            setAddStriker("");
            setAddMidfielder("");
            setAddDefender("");
            setAddGoalkeeper("");
            setAddRating("");
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
              onPress={() => navigation.navigate("AddTraining")}
            >
             
              <Text style={styles.buttonText}>Add Training Session</Text>
            </TouchableOpacity>
          </View>
  
          <FlatList
            data={training}
            numColumns={1}
            renderItem={({ item }) => (
              <View>
                <Pressable style={styles.container}>
                  <FontAwesome
                    name="edit"
                    color="green"
                    onPress={() => navigation.navigate("DetailTraining", { item })}
                    style={styles.icon}
                  />
  
                  <FontAwesome
                    name="trash-o"
                    color="red"
                    onPress={() => deleteTraining(item)}
                    style={styles.icon}
                  />

                    {/* <Pressable onPress={() => navigation.navigate('DetailMatch', { item })}> */}
                    <View style={styles.noteView}>
                      <Text style={styles.title}>{item.tDate}</Text>
                      <Text style={styles.subtitle}>Focus on: {item.focus}</Text>
                      <Text style={styles.subtitle}>Best Striker of the session: {item.striker}</Text>
                      <Text style={styles.subtitle}>Best Midfielder of the session: {item.midfielder}</Text>
                      <Text style={styles.subtitle}>Best Defender of the session: {item.defender}</Text>
                      <Text style={styles.subtitle}>Best Goalkeeper of the session: {item.goalkeeper}</Text>
                      <Text style={styles.subtitle}>Manager Rating for the session: {item.rating}</Text>
    
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
  
  export default TrainingHome;
  
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
      width: 100,
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
  