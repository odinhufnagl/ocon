import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '../../common';
import { SPACING } from '../../constants';

const PostsHeader = ({ header, button, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text type="header" style={styles.header}>
        {header}
      </Text>
      <Button variant="third" {...button} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    width: 'auto',
    paddingHorizontal: SPACING.large
  },
  header: {
    position: 'relative',
    top: 5
  }
});
export default PostsHeader;
