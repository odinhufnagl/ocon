import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Spacer, Text } from '../../common';
import { LoadingContainer } from '../../components';
import { SPACING } from '../../constants';
import { usePagination, useTheme } from '../../hooks';
import { PROFILE_SCREEN, PROFILE_STACK } from '../../navigation';

const UserListItem = ({ title, image, onPress, key }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} key={key}>
      <View style={styles.resultContainer(theme)}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMethod="resize"
          />
        </View>
        <Spacer orientation="horizontal" spacing="medium" />
        <Text bold>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 200
  },
  resultContainer: (theme) => ({
    paddingVertical: SPACING.small,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: theme.dp3,
    borderBottomWidth: 1,
    borderStyle: 'solid'
  }),
  imageContainer: {
    width: 50,
    height: 50,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 200
  }
});

export default UserListItem;
