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
// import TimePicker from 'react-native-simple-time-picker';
import React, { useEffect, useState } from "react";
import { firebase } from "../../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddMatch = () => {
  const [name, setName] = useState("");
  const [matches, setMatches] = useState([]);
  const matchRef = firebase.firestore().collection("matches");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [addTournament, setAddTournament] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addKick, setAddKick] = useState("");
  const [addOur, setAddOur] = useState("");
  const [addOpponent, setAddOpponent] = useState("");
  const [addResult, setAddResult] = useState("");
  const [addSheets, setAddSheets] = useState("");
  const [addPom, setAddPom] = useState("");
  const [addRating, setAddRating] = useState("");
  
  const navigation = useNavigation();
  useEffect(() => {
    firebase
      .firestore()
      .collection("matches")
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
        const { title,tournament,date,kick,
          our,
          opponent,result,sheets,pom,rating} = doc.data();
        matches.push({
          id: doc.id,
          title,
          tournament,
          date,
          kick,
          our,
          opponent,
          result,
          sheets,
          pom,
          rating,
        });
      });
      setMatches(matches);
      
    });
  }, []);


  const addMatch = () => {
    if (addTitle && addTitle.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        title:addTitle,
          tournament:addTournament,
          date:addDate,
          kick:addKick,
          our:addOur,
          opponent:addOpponent,
          result:addResult,
          sheets:addSheets,
          pom:addPom,
          rating:addRating,
        createdAt: timestamp,
      };
      matchRef
        .add(data)
        .then(() => {
          setAddTitle("");
          setAddTournament("");
          setAddDate("")
          setAddKick("")
          setAddOur("")
          setAddOpponent("")
          setAddResult("")
          setAddSheets("")
          setAddPom("")
          setAddRating("")
          
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
        <Text style={styles.title}>Create Match Records</Text>

        <Text>Title</Text>
        <TextInput
              style={styles.input}
              placeholder="Title "
              placeholderTextColor="#aaaaaa"
              onChangeText={(title) => setAddTitle(title)}
              value={addTitle}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<Text>Tournament</Text>
<TextInput
              style={styles.input}
              placeholder="Tournament "
              placeholderTextColor="#aaaaaa"
              onChangeText={(tournament) => setAddTournament(tournament)}
              value={addTournament}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
             
            /> 
   
   <Text>Date</Text>
   <DatePicker
   style={styles.inputDate}
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
              onChangeText={(date) => setAddDate(date)}
              date={addDate}
              
            /> 

<Text>Kick off</Text>
<TextInput
              style={styles.input}
              placeholder="Kick off"
              placeholderTextColor="#aaaaaa"
              onChangeText={(kick) => setAddKick(kick)}
              value={addKick}
              keyboardType="time"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<Text>Our Score</Text>
<TextInput
              style={styles.input}
              placeholder="Our Score"
              placeholderTextColor="#aaaaaa"
              onChangeText={(our) => {
                if (isNaN(our)) {
                  setError1(true);
                } else {
                  setError1(false);
                  setAddOur(our);
                }}}
              value={addOur}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
             {error1 && <Text style={styles.error}>Please enter a valid number</Text>}
            
             <Text>Opponent Score</Text>       
<TextInput
              style={styles.input}
              placeholder="Opponent Score"
              placeholderTextColor="#aaaaaa"
              onChangeText={(opponent) => {
                if (isNaN(opponent)) {
                  setError2(true);
                } else {
                  setError2(false);
                  setAddOpponent(opponent);
                }}}
              value={addOpponent}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
             {error2 && <Text style={styles.error}>Please enter a valid number</Text>}

             <Text>Result</Text>     
        <TextInput
              style={styles.input}
              placeholder="Result"
              placeholderTextColor="#aaaaaa"
              onChangeText={(result) => setAddResult(result)}
              value={addResult}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<Text>Score Sheet</Text>     
<TextInput
              style={styles.input}
              placeholder="Score Sheet "
              placeholderTextColor="#aaaaaa"
              onChangeText={(sheets) => setAddSheets(sheets)}
              value={addSheets}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<Text>Player of the Match</Text>     
<TextInput
              style={styles.input}
              placeholder="Player of the Match "
              placeholderTextColor="#aaaaaa"
              onChangeText={(pom) => setAddPom(pom)}
              value={addPom}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

<Text>Manager Ratings</Text>     
<TextInput
              style={styles.input}
              placeholder="Manager Ratings "
              placeholderTextColor="#aaaaaa"
              onChangeText={(rating) => setAddRating(rating)}
              value={addRating}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />



        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addMatch();
            navigation.navigate("MatchHome");
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default AddMatch;

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

  inputDate:{
    width: "80%",
    height: 40,
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    borderColor: "#ccc",
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

  error: {
    color: 'red',
  },
});
