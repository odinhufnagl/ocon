import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../common';
import { PostsList } from '../../components';
import { getDateFromTimestamp } from '../../utils';

const PostsScreen = ({ navigation, route }) => {
  const { data, initialScrollIndex, allowRefresh = true } = route.params;
  const [headerTime, setHeaderTime] = useState();

  const onViewableItemsChanged = (item) => {
    const { index, isViewable } = item.changed[0];
    if (isViewable) {
      const date = getDateFromTimestamp(data[index].createdAt);
      setHeaderTime(date);
    }
  };
  return (
    <View>
      <Header
        showGradient
        style={styles.header}
        leftItems={[
          {
            icon: 'back',
            variant: 'transparent',
            onPress: () => navigation.goBack(),
            iconSize: 'medium'
          },
          {
            title: headerTime,
            type: 'header'
          }
        ]}
      />
      <PostsList
        allowRefresh={allowRefresh}
        data={data}
        onViewableItemsChanged={onViewableItemsChanged}
        initialScrollIndex={initialScrollIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute'
  }
});

export default PostsScreen;
