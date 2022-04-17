import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getPosts } from '../../api/graphql/requests';
import { Header } from '../../common';
import { PostsList } from '../../components';
import { PROFILE_STACK, YESTERDAY_STACK } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import { getTimeFromTimestamp } from '../../utils';

const HomeScreen = ({ navigation }) => {
  const { currentUser } = useAuthContext();
  const [headerTime, setHeaderTime] = useState();
  const [posts, setPosts] = useState();

  const onViewableItemsChanged = (item) => {
    const { index, isViewable } = item.changed[0];
    if (isViewable) {
      const time = getTimeFromTimestamp(posts[index].createdAt);
      setHeaderTime(time);
    }
  };

  useEffect(() => {
    (async () => {
      const posts = await getPosts(
        { userId: { _neq: currentUser.id } },
        currentUser.id
      );
      setPosts(posts);
    })();
  }, []);
  if (!posts) {
    return <View></View>;
  }
  return (
    <View>
      <Header
        style={styles.header}
        leftItems={[
          {
            title: headerTime,
            type: 'heading'
          }
        ]}
        rightItems={[
          {
            icon: 'explore',
            onPress: () => navigation.navigate(YESTERDAY_STACK),
            variant: 'transparent'
          },
          {
            icon: 'profile',
            iconSize: 'medium',
            onPress: () => navigation.navigate(PROFILE_STACK),
            variant: 'transparent'
          }
        ]}
      />
      <PostsList data={posts} onViewableItemsChanged={onViewableItemsChanged} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 100
  }
});

export default HomeScreen;
