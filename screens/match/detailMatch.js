import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable,ScrollView } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const DetailMatch = ({ route }) => {
  const matchRef = firebase.firestore().collection("matches");
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
     

<Text style={styles.title}>Update Matches</Text>


<TextInput
      style={styles.textField}
      onChangeText={onChangeTitle}
      value={textTitle}
      
      
    />

<TextInput
      style={styles.textField}
      onChangeText={onChangeTournament}
      value={textTournament}
      
      textContentType="number"
    /> 

<TextInput
      style={styles.textField}
      onChangeText={onChangeDate}
      value={textDate}
      
    /> 

<TextInput
      style={styles.textField}
      onChangeText={onChangeKick}
      value={textKick}
      
    />

<TextInput
      style={styles.textField}
      onChangeText={onChangeOur}
      value={textOur}
      
    />

<TextInput
      style={styles.textField}
      onChangeText={onChangeOpponent}
      value={textOpponent}
      
    />

<TextInput
      style={styles.textField}
      onChangeText={onChangeResult}
      value={textResult}
      
    />

<TextInput
      style={styles.textField}
      onChangeText={onChangeSheets}
      value={textSheets}
      
    />

<TextInput
              style={styles.textField}
              onChangeText={onChangePom}
              value={textPom}
              
            />

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
