import { StyleSheet, Text, View, Modal, Image, Pressable } from "react-native";
import React from "react";
import { JumpingTransition } from "react-native-reanimated";

export const PopUpModal = (props) => {

  const hasCancel = props.state.hasCancel;

  const renderKeyValues = (key, value) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
      <Text style={styles.keys}>{key}</Text>
      <Text style={styles.values}>{value}</Text>   
    </View>
  );

  function handleVisibility() {
    
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.state.visible}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          {/* TO-DO: Text pretendard로 바꾸기 */}
          <Text style={styles.title}>{props.state.title}</Text>
          <Image source={props.state.image} style={{ marginTop: 10, marginBottom: -8 }}/>
          {props.state.modalType === "description" ?
            <View style={{ flex: 1 }}>
              <Text style={styles.description}>
                {props.state.description1}
              </Text>
              <Text style={[styles.description, styles.boldText]}>
                {props.state.boldText}
                <Text style={styles.description}>{props.state.description2}</Text>
              </Text>
            </View>:
            <View>
              {props.state.pairs.map((pair) => {
                return renderKeyValues(pair.key, pair.value);
              })}
            </View>
          }
          <View style={styles.buttons}>
            <Pressable 
              style={[styles.button, customSytles(hasCancel).leftButton]}
              onPress={() => props.setDeleteRoutineConfirm((state) => {
                return { ...state, visible: true };
              })}>
              <Text style={customSytles(hasCancel).buttonText}>{props.state.leftButtonText}</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.rightButton]}>
              <Text style={styles.buttonText}>{props.state.rightButtonText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    width: 270,
    height: 357,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#EEE",
    borderStyle: "solid",
    borderWidth: 1.5,
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    color: "#222222",
    marginTop: 30,
    // marginBottom: 10,
  },
  description: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 14,
    color: "#4C4C4C"
  },
  boldText: {
    fontWeight: 900,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    width: 134,
    height: 68,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3CE3AC",
  },
  rightButton: {
    borderBottomRightRadius: 8,
  },
  buttonText: {
    fontWeight: 700,
    fontSize: 14
  },
  keys: {
    fontWeight: 400,
    fontSize: 14,
    color: "#808080",
    marginRight: 30,
  },
  values: {
    fontWeight: 700,
    fontSize: 14,
    color: "#4C4C4C",
    textAlign: "right"
  },
});

const customSytles = (hasCancel) => StyleSheet.create({
  leftButton: {
    backgroundColor: !hasCancel ? "#CAF4E6" : "#EEEEEE",
    borderBottomLeftRadius: 8,
  },
  buttonText: {
    fontWeight: 700,
    fontSize: 14,
    color: !hasCancel ? "#595959" : "#FF6056",
  },
});