import React from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { DIMENS, SPACING } from '../../constants';
import Typography from '../../constants/typography';
import useTheme from '../../hooks/useTheme';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';

const Tabs = ({ tabs, value, onTabPress }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      {tabs.map(({ value: v, title }, index) => (
        <>
          {index !== 0 && <Spacer spacing="large" orientation="horizontal" />}
          <TouchableOpacity onPress={() => onTabPress(v)} style={styles.tab}>
            <Text style={styles.text} bold={v === value}>
              {title}
            </Text>
            <Spacer spacing="tiny" />
            {v === value && <View style={styles.underline} />}
          </TouchableOpacity>
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 16
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  underline: {
    width: 30,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 20
  }
});
export default Tabs;
