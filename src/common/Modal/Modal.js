import React from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Button, Text } from '..';

const getContent = (variant, header, button1, button2) => {
  return (
    <View style={{ width: '80%', backgroundColor: 'blue' }}>
      <Text style={{ color: 'black' }}>{header}</Text>
      <Button title={button1.title} onPress={button1.onPress} />
      <Button title={button2.title} onPress={button2.onPress} />
    </View>
  );
};

const Modal = ({ variant, header, button1, button2, visible, setVisible }) => {
  return (
    <RNModal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="fade"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            {getContent(variant, header, button1, button2)}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default Modal;
