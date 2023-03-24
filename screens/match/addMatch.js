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
  Picker
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
        const { title, tournament, date, kick,
          our,
          opponent, result, pom, rating } = doc.data();
        matches.push({
          id: doc.id,
          title,
          tournament,
          date,
          kick,
          our,
          opponent,
          result,
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
        title: addTitle,
        tournament: addTournament,
        date: addDate,
        kick: addKick,
        our: addOur,
        opponent: addOpponent,
        result: 'Not Started',
        pom: addPom,
        rating: addRating,
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
          {/* <Text style={styles.title}>Add New Fixture</Text> */}

          <Text style={[{ fontWeight: 'bold' }, styles]}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title "
            placeholderTextColor="#aaaaaa"
            onChangeText={(title) => setAddTitle(title)}
            value={addTitle}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

      <Text style={[{ fontWeight: 'bold' }, styles]}>Tournament</Text>
      <Picker
        selectedValue={addTournament}
        onValueChange={(tournament) => setAddTournament(tournament)}
        style={styles.input}
      >
        <Picker.Item style={styles.input} label="Friendly Match" value="Friendly Match" />
        <Picker.Item style={styles.input} label="League" value="League" />
        <Picker.Item style={styles.input} label="Cup Match" value="Cup Match" />
        <Picker.Item style={styles.input} label="Cup Final" value="Cup Final" />
      </Picker>

          <Text style={[{ fontWeight: 'bold' }, styles]}>Date</Text>
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

          <Text style={[{ fontWeight: 'bold' }, styles]}>Kick off</Text>
          <TextInput
            style={styles.input}
            placeholder="Kick off (time)"
            placeholderTextColor="#aaaaaa"
            onChangeText={(kick) => setAddKick(kick)}
            value={addKick}
            keyboardType="time"
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
            <Text style={styles.buttonText}>Submit</Text>
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

  inputDate: {
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
