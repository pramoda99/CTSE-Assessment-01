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
  import DatePicker from 'react-native-datepicker';
  import React, { useEffect, useState } from "react";
  import { firebase } from "../../config";
  import { FontAwesome } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  
  const AddTraining = () => {
    const [name, setName] = useState("");
    const [training, setTraining] = useState([]);
    const [error1, setError1] = useState(false);
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
        .collection("training")
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
          const {  tDate,
            tTime,
            focus,
            session,
            striker,
            midfielder,
            defender,
            goalkeeper,
            rating
 } = doc.data();
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
  
    
  
    const addTraining = () => {
      if (addTDate && addTDate.length > 0) {
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
        
          </View>
          <Text style={styles.title}>Add New training</Text>
           
          <DatePicker
           mode="date" //The enum of date, datetime and time
           placeholder="Select Date"
           format="DD-MM-YYYY"
           minDate="01-01-2020"
           maxDate="01-01-2025"
           confirmBtnText="Confirm"
           cancelBtnText="Cancel"
           customStyles={{
             dateIcon: {
               //display: 'none',
               position: 'absolute',
               left: 0,
               top: 4,
               marginLeft: 0,
             },
             dateInput: {
               marginLeft: 36,
             },
           }}
              onChangeText={(tDate) => setAddTDate(tDate)}
              date={addTDate}
              
            /> 

         <TextInput
              style={styles.input}
              placeholder="Training Time "
              placeholderTextColor="#aaaaaa"
              onChangeText={(tTime) => setAddTTime(tTime)}
              value={addTTime}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              textContentType="number"
            /> 
   
   <TextInput
              style={styles.input}
              placeholder="Focus on "
              placeholderTextColor="#aaaaaa"
              onChangeText={(focus) => setAddFocus(focus)}
              value={addFocus}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            /> 

        <TextInput
              style={styles.input}
              placeholder="Best Striker of the day"
              placeholderTextColor="#aaaaaa"
              onChangeText={(striker) => setAddStriker(striker)}
              value={addStriker}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
  
  <TextInput
              style={styles.input}
              placeholder="Best midfielder"
              placeholderTextColor="#aaaaaa"
              onChangeText={(midfielder) => setAddMidfielder(midfielder)}
              value={addMidfielder}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Best defender of the day"
              placeholderTextColor="#aaaaaa"
              onChangeText={(defender) => setAddDefender(defender)}
              value={addDefender}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Best goalkeeper of the day"
              placeholderTextColor="#aaaaaa"
              onChangeText={(goalkeeper) => setAddGoalkeeper(goalkeeper)}
              value={addGoalkeeper}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<TextInput
              style={styles.input}
              placeholder="Rating"
              placeholderTextColor="#aaaaaa"
              onChangeText={(rating) => {
                if (isNaN(rating)) {
                  setError1(true);
                } else {
                  setError1(false);
                  setAddRating(rating);
                }}}
              value={addRating}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
             {error1 && <Text style={styles.error}>Please enter a valid number</Text>}

            <TouchableOpacity style={styles.addButton}
             onPress={() => {
                 addTraining();
                 navigation.navigate("TrainingHome");
              }} >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
  
    
      </SafeAreaView>
      </ScrollView>
    );
  };
  
  export default AddTraining;
  
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
  