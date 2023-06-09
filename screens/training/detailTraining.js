import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable,ScrollView } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const DetailTraining = ({ route }) => {
  const trainingRef = firebase.firestore().collection("training");
  const [textTDate, onChangeTDateText] = useState(route.params.item.tDate);
  const [textTTime, onChangeTTimeText] = useState(route.params.item.tTime);
  const [textFocus, onChangeFocusText] = useState(route.params.item.focus);
  const [textSession, onChangeSessionText] = useState(route.params.item.session);
  const [textStriker, onChangeStrikerText] = useState(route.params.item.striker);
  const [textMidfielder, onChangeMidfielderText] = useState(route.params.item.midfielder);
  const [textDefender, onChangeDefenderText] = useState(route.params.item.defender);
  const [textGoalkeeper, onChangeGoalkeeperText] = useState(route.params.item.goalkeeper);
  const [textRating, onChangeRatingText] = useState(route.params.item.rating);
  
  const navigation = useNavigation();

  const updateTraining = () => {
    if (textTDate && textTDate.length > 0) {
      trainingRef
        .doc(route.params.item.id)
        .update({
          tDate: textTDate,
          tTime:textTTime,
          focus:textFocus,
          session:textSession,
          striker:textStriker,
          midfielder:textMidfielder,
          defender:textDefender,
          goalkeeper:textGoalkeeper,
          rating:textRating,
        })
        .then(() => {
          navigation.navigate("TrainingHome");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <ScrollView>
      
    <View style={styles.container}>
    <Text style={[{ fontWeight: 'bold' }, styles]}>Date</Text>
      <TextInput
      style={styles.textField}
      onChangeText={onChangeTDateText}
      value={textTDate}
      editable={false}
      
    />

<Text style={[{ fontWeight: 'bold' }, styles]}>Session Time</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeTTimeText}
      value={textTTime}
      editable={false}
      textContentType="number"
    /> 

<Text style={[{ fontWeight: 'bold' }, styles]}>Focus on</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeFocusText}
      value={textFocus}
      
      textContentType="number"
    /> 


<Text style={[{ fontWeight: 'bold' }, styles]}>Striker</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeStrikerText}
      value={textStriker}
      
      textContentType="number"
    /> 
<Text style={[{ fontWeight: 'bold' }, styles]}>Midfielder</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeMidfielderText}
      value={textMidfielder}
      
    /> 
<Text style={[{ fontWeight: 'bold' }, styles]}>Defender</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeDefenderText}
      value={textDefender}
      
      
    />
<Text style={[{ fontWeight: 'bold' }, styles]}>Goalkeeper</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeGoalkeeperText}
      value={textGoalkeeper}
      
      textContentType="number"
    /> 
<Text style={[{ fontWeight: 'bold' }, styles]}>Manager rating for the session</Text>
<TextInput
      style={styles.textField}
      onChangeText={onChangeRatingText}
      value={textRating}
      
    /> 

      <Pressable
        style={styles.buttonUpdate}
        onPress={() => {
          updateTraining();
        }}
      >
        <Text>Update Training </Text>
      </Pressable>
    </View>
    </ScrollView>
  );
};

export default DetailTraining;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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
