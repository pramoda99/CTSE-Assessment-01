import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable,ScrollView } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import DatePicker from 'react-native-datepicker';

const DetailMatch = ({ route }) => {
  const matchRef = firebase.firestore().collection("matches");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [textTitle, onChangeTitle] = useState(route.params.item.title);
  const [textTournament, onChangeTournament] = useState(route.params.item.tournament);
  const [textDate, onChangeDate] = useState(route.params.item.date);
  const [textKick, onChangeKick] = useState(route.params.item.kick);
  const [textOur, onChangeOur] = useState(route.params.item.our);
  const [textOpponent, onChangeOpponent] = useState(route.params.item.opponent);
  const [textResult, onChangeResult] = useState(route.params.item.result);
  const [textSheets, onChangeSheets] = useState(route.params.item.sheets);
  const [textPom, onChangePom] = useState(route.params.item.pom);
  const [textRating, onChangeRating] = useState(route.params.item.rating);
  const navigation = useNavigation();

  const updateMatch = () => {
    if (textTitle && textTitle.length > 0) {
      matchRef
        .doc(route.params.item.id)
        .update({
          title: textTitle,
          tournament:textTournament,
          date:textDate,
          kick:textKick,
          our:textOur,
          opponent:textOpponent,
          result:textResult,
          sheets:textSheets,
          pom:textPom,
          rating:textRating,

        })
        .then(() => {
          navigation.navigate("MatchHome");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
     

<Text style={styles.title}>Update Match Details</Text>

<Text>Title</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeTitle}
      value={textTitle}
      
      
    />

<Text>Tournament</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeTournament}
      value={textTournament}
      
      textContentType="number"
    /> 

<Text>Date</Text>
<DatePicker
style={styles.inputDate}
       mode="date" //The enum of date, datetime and time
           placeholder="select date"
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
      onChangeText={onChangeDate}
      date={textDate}
      
    /> 

<Text>Kick off</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeKick}
      value={textKick}
      
    />

<Text>Our Score</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeOur}
      value={textOur}
      
    />

<Text>Opponent Score</Text>   
<TextInput
      style={styles.textField}
      onChangeText={onChangeOpponent}
      value={textOpponent}
      
    />

<Text>Result</Text>  
<TextInput
      style={styles.textField}
      onChangeText={onChangeResult}
      value={textResult}
      
    />

<Text>Score Sheet</Text>    
<TextInput
      style={styles.textField}
      onChangeText={onChangeSheets}
      value={textSheets}
      
    />

<Text>Player of the Match</Text>
<TextInput
              style={styles.textField}
              onChangeText={onChangePom}
              value={textPom}
              
            />

<Text>Manager Ratings</Text>
<TextInput
              style={styles.textField}
              onChangeText={onChangeRating}
              value={textRating}
              
            />


      <Pressable
        style={styles.buttonUpdate}
        onPress={() => {
          updateMatch();
        }}
      >
        <Text>Update Match</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
};

export default DetailMatch;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },

  textField: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: "#000000",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },

  inputDate:{
    width: "100%",
    fontSize: 15,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: "#000000",
    backgroundColor: "#e0e0e0",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  
  buttonUpdate: {

    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: "#0de065",
  },
});
