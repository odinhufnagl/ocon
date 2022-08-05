import React from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { DIMENS } from '../../constants';
import useTheme from '../../hooks/useTheme';

const Modal = ({ visible, setVisible, children }) => {
  const { theme } = useTheme();
  return (
    <RNModal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="fade"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.container(theme)}>
          <TouchableWithoutFeedback>
            <View style={styles.innerContainer(theme)}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }),
  innerContainer: (theme) => ({
    backgroundColor: theme.backgroundColor,
    borderRadius: DIMENS.common.borderRadiusMedium
  })
});
export default Modal;
