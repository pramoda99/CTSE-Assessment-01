import { View, Text } from "react-native";
import React from "react";

const Footer = (props) => {
  return (
    <View style={{ marginLeft: 15 }}>
      <Text style={{ fontWeight: "bold", fontSize: 28 }}>{props.name}</Text>
    </View>
  );
};

export default Footer;