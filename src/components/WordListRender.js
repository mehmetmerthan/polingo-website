import { React } from "react";
import { CheckBox, Button, Icon } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { changeWord, removeWord } from "../services/wordService";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function WordListRender({
  item,
  fetchData,
  setLoading,
  loading,
}) {
  async function handleStatusChange() {
    setLoading(true);
    const result = await changeWord({
      wordId: item.id,
      isLearned: !item.isLearned,
    });
    if (result) {
      await fetchData();
    }
    setLoading(false);
  }
  const handleDelete = async () => {
    setLoading(true);
    const result = await removeWord(item.id);
    if (result) {
      await fetchData();
    }
    setLoading(false);
  };
  async function playSound(text) {
    if (text === "" || loading) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Speech.speak(text);
    setLoading(false);
  }
  const openGlish = ({ text }) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://youglish.com/pronounce/${encodedText}/english`;
    window.open(url, "_blank");
  };
  const openInfo = async ({ text }) => {
    const langCodeThree = await AsyncStorage.getItem("langCodeThree");
    if (!langCodeThree) {
      alert("Please select a language from settings.");
      return;
    }
    const encodedText = encodeURIComponent(text);
    const url = `https://tatoeba.org/en/sentences/search?from=eng&query=${encodedText}&to=${langCodeThree}`;
    window.open(url, "_blank");
  };
  return (
    <View style={styles.listItem}>
      <CheckBox
        containerStyle={{ backgroundColor: "transparent" }}
        checked={item.isLearned}
        onPress={handleStatusChange}
        disabled={loading}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={styles.textContainer}>
          <Text style={styles.word}>{item.word}</Text>
          <Text style={styles.side}>{"-"}</Text>
          <Text style={styles.meaning}>{item.translation}</Text>
        </View>
      </View>
      <View style={styles.listButtonGroup}>
        <Button
          type="clear"
          icon={
            <Icon
              name="play-circle"
              type="font-awesome"
              color={"white"}
              size={32}
            />
          }
          onPress={() => playSound(item.word)}
          disabled={loading}
        />
        <Button
          type="clear"
          icon={
            <Icon
              name="info-circle"
              type="font-awesome"
              color={"white"}
              size={32}
            />
          }
          onPress={() => openInfo({ text: item.word })}
        />
        <Button
          type="clear"
          icon={
            <Icon
              name="youtube-play"
              type="font-awesome"
              color={"white"}
              size={32}
            />
          }
          onPress={() => openGlish({ text: item.word })}
        />
        <Button
          type="clear"
          icon={
            <Icon
              name="delete"
              type="material-comunity-icons"
              color={"white"}
              size={32}
            />
          }
          onPress={handleDelete}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    flexWrap: "wrap",
    backgroundColor: "rgb(1, 1, 1)",
  },
  listButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#393e42",
    marginHorizontal: 8,
    marginLeft: 30,
    borderRadius: 8,
    borderColor: "rgb(39, 39, 41)",
    borderWidth: 1,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    color: "rgb(229, 229, 231)",
    fontSize: 30,
  },
  meaning: {
    color: "rgb(229, 229, 231)",
    marginLeft: 15,
    fontSize: 22,
    fontWeight: "300",
  },
  side: {
    color: "rgb(229, 229, 231)",
    marginLeft: 15,
    fontSize: 30,
    fontWeight: "bold",
  },
});
