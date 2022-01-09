import { StatusBar } from "expo-status-bar";
import reactDom from "react-dom";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 48,
          color: "rgba(125, 0, 255, 0.5),",
        }}
      >
        Hello World! (ㅋㅋㅋ 프로그래머들 첫 단어로 RN 배우는중)
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  //StyleSheet.create =auto자동완성기능 때문에 사용
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontSize: 28,
  },
});
