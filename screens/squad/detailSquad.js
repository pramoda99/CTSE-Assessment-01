import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const DetailSquad = ({ route }) => {
  const squadRef = firebase.firestore().collection("squad");
  const [textSName, onChangeSNameText] = useState(route.params.item.sName);
  const [textFormation, onChangeFormationText] = useState(route.params.item.formation);
  const [textFSquad, onChangeFSquadText] = useState(route.params.item.fSquad);
  const [textAttacking, onChangeAttackingText] = useState(route.params.item.attacking);
  const [textDefending, onChangeDefendingText] = useState(route.params.item.defending);
  const [textCaptain, onChangeCaptainText] = useState(route.params.item.captain);
  const [textFTaker, onChangeFTakerText] = useState(route.params.item.fTaker);
  const [textPTaker, onChangePTakerText] = useState(route.params.item.pTaker);
  const [textLCTaker, onChangeLCTakerText] = useState(route.params.item.leftTaker);
  const [textRCTaker, onChangeRCTakerText] = useState(route.params.item.rightTaker);
  const navigation = useNavigation();

  const updateSquad = () => {
    if (textSName && textSName.length > 0) {
      squadRef
        .doc(route.params.item.id)
        .update({
          sName: textSName,
          formation: textFormation,
          fSquad: textFSquad,
          attacking: textAttacking,
          defending: textDefending,
          captain: textCaptain,
          fTaker: textFTaker,
          pTaker: textPTaker,
          leftTaker: textLCTaker,
          rightTaker: textRCTaker,
        })
        .then(() => {
          navigation.navigate("SquadHome");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[{ fontWeight: 'bold' }, styles]}>Squad Name</Text>
        <TextInput
          style={styles.textField}
          onChangeText={onChangeSNameText}
          value={textSName}
          editable={false}


        />
        <Text style={[{ fontWeight: 'bold' }, styles]}>Formation</Text>
        <TextInput
          style={styles.textField}
          onChangeText={onChangeFormationText}
          value={textFormation}

          textContentType="number"
        />
        <Text style={[{ fontWeight: 'bold' }, styles]}>Captain (jersey no)</Text>
        <TextInput
          style={styles.textField}
          onChangeText={onChangeCaptainText}
          value={textCaptain}

        />
        <Text style={[{ fontWeight: 'bold' }, styles]}>Free-Kick Taker (jersey no)</Text>
        <TextInput
          style={styles.textField}
          onChangeText={onChangeFTakerText}
          value={textFTaker}

        />
        <Text style={[{ fontWeight: 'bold' }, styles]}>Penalty Taker (jersey no)</Text>
        <TextInput
          style={styles.textField}
          onChangeText={onChangePTakerText}
          value={textPTaker}

        />
        <Text style={[{ fontWeight: 'bold' }, styles]}>Left Corner Taker (jersey no)</Text>
        <TextInput
          style={styles.textField}
          onChangeText={onChangeLCTakerText}
          value={textLCTaker}

        />
        <Text style={[{ fontWeight: 'bold' }, styles]}>Right Corner Taker (jersey no)</Text>
        <TextInput
          style={styles.textField}
          onChangeText={onChangeRCTakerText}
          value={textRCTaker}

        />

        <Pressable
          style={styles.buttonUpdate}
          onPress={() => {
            updateSquad();
          }}
        >
          <Text>Update Squad</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default DetailSquad;

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
