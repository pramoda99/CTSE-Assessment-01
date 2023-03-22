import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const DetailStaff = ({ route }) => {
  const staffRef = firebase.firestore().collection("staff");
  const [textHeading, onChangeHeadingText] = useState(route.params.item.heading);
  const navigation = useNavigation();

  const updateStaff = () => {
    if (textHeading && textHeading.length > 0) {
      staffRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
        })
        .then(() => {
          navigation.navigate("StaffHome");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        onChangeText={onChangeHeadingText}
        value={textHeading}
        // placeholder="Update "
      />

      <Pressable
        style={styles.buttonUpdate}
        onPress={() => {
          updateStaff();
        }}
      >
        <Text>Update Staff </Text>
      </Pressable>
    </View>
  );
};

export default DetailStaff;

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
