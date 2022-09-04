import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Modal, Spacer, Text } from '../../common';
import { IMAGES, SPACING } from '../../constants';

const QuestionModal = ({
  visible,
  setVisible,
  title,
  buttonClose,
  buttonAction
}) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <View style={styles.questionModal}>
        <Spacer />
        <Text bold>{title}</Text>
        <Spacer spacing={50} />
        <View
          style={{
            width: '100%',
            alignItems: 'center'
          }}
        >
          <Button
            title={buttonAction.title}
            onPress={() => {
              buttonAction.onPress();
              setVisible(false);
            }}
          />
          <Spacer />
          <Button
            title={buttonClose.title}
            onPress={() => {
              setVisible(false);
              buttonClose.onPress && buttonClose?.onPress();
            }}
            variant="fourth"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  questionModal: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default QuestionModal;
