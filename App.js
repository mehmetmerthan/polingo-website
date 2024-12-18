import RootRouter from "./src/routers/RootRouter";
import * as Device from "expo-device";
import { React } from "react";
import { View, Text, StyleSheet } from "react-native";
export default function App() {
  if (Device.deviceType !== 3) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          This app is not supported on this device
        </Text>
      </View>
    );
  }

  return <RootRouter />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(18, 18, 18)",
  },
  text: {
    color: "rgb(229, 229, 231)",
    fontSize: 20,
  },
});
