import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const DetailPlayers = ({ route }) => {
  const playerRef = firebase.firestore().collection("players");
  const [textPName, onChangePNameText] = useState(route.params.item.pName);
  const [textAge, onChangeAgeText] = useState(route.params.item.age);
  const [textHeight, onChangeHeightText] = useState(route.params.item.height);
  const [textFoot, onChangeFootText] = useState(route.params.item.foot);
  const [textPosition, onChangePositionText] = useState(route.params.item.position);
  const [textGoals, onChangeGoalsText] = useState(route.params.item.goals);
  const [textAssists, onChangeAssistsText] = useState(route.params.item.assists);
  const [textSheets, onChangeSheetsText] = useState(route.params.item.sheets);
  const [textAttacking, onChangeAttackingText] = useState(route.params.item.attacking);
  const [textDribbling, onChangeDribblingText] = useState(route.params.item.dribbling);
  const [textDefending, onChangeDefendingText] = useState(route.params.item.defending);
  const [textPassing, onChangePassingText] = useState(route.params.item.passing);
  const [textPhysical, onChangePhysicalText] = useState(route.params.item.physical);
  const navigation = useNavigation();

  const updatePlayer = () => {
    if (textPName && textPName.length > 0) {
      playerRef
        .doc(route.params.item.id)
        .update({
          pName: textPName,
          age:textAge,
        height:textHeight,
        foot:textFoot,
        position:textPosition,
        goals:textGoals,
        assists:textAssists,
        sheets:textSheets,
        attacking:textAttacking,
        dribbling:textDribbling,
        defending:textDefending,
        passing:textPassing,
       physical:textPhysical,
        })
        .then(() => {
          navigation.navigate("PlayersHome");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
     

<Text style={styles.title}>Update Players</Text>

<Text style={styles.title}>Personal Info</Text>

<TextInput
      style={styles.textField}
      onChangeText={onChangePNameText}
      value={textPName}
      readOnly
      
    />

<TextInput
      style={styles.textField}
      onChangeText={onChangeAgeText}
      value={textAge}
      
      textContentType="number"
    /> 

<TextInput
      style={styles.textField}
      onChangeText={onChangeHeightText}
      value={textHeight}
      
    /> 

<TextInput
      style={styles.textField}
      onChangeText={onChangeFootText}
      value={textFoot}
      
    />

<TextInput
      style={styles.textField}
      onChangeText={onChangePositionText}
      value={textPosition}
      
    />

<Text style={styles.title}>Stats</Text>

<TextInput
              style={styles.textField}
              onChangeText={onChangeGoalsText}
              value={textGoals}
              
            />

<TextInput
              style={styles.textField}
              onChangeText={onChangeAssistsText}
              value={textAssists}
              
            />

<TextInput
              style={styles.textField}
              onChangeText={onChangeSheetsText}
              value={textSheets}
              
            />

<Text style={styles.title}>Skills</Text>

<TextInput
              style={styles.textField}
              onChangeText={onChangeAttackingText}
              value={textAttacking}
              
            />

<TextInput
              style={styles.textField}
              onChangeText={onChangeDefendingText}
              value={textDefending}
              
            />

<TextInput
              style={styles.textField}
              onChangeText={onChangeDribblingText}
              value={textDribbling}
              
            />

<TextInput
              style={styles.textField}
              onChangeText={onChangePassingText}
              value={textPassing}
              
            />

<TextInput
              style={styles.textField}
              onChangeText={onChangePhysicalText}
              value={textPhysical}
              
            />

      <Pressable
        style={styles.buttonUpdate}
        onPress={() => {
          updatePlayer();
        }}
      >
        <Text>Update Player</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
};

export default DetailPlayers;

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
