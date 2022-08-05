import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getLatestPostsWithoutCurrentUser } from '../../api/graphql/requests';
import { Header, Text } from '../../common';
import { PostsList } from '../../components';
import { PAGINATION } from '../../constants';
import { usePagination } from '../../hooks';
import {
  PROFILE_SCREEN,
  PROFILE_STACK,
  YESTERDAY_STACK
} from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import { getTimeFromTimestamp } from '../../utils';

const HomeScreen = ({ navigation }) => {
  const { currentUser } = useAuthContext();
  const [headerTime, setHeaderTime] = useState();

  const getData = async (limit, offset) =>
    await getLatestPostsWithoutCurrentUser(currentUser.id, limit, offset);

  const [posts, fetchNewPosts, loading, refreshPosts, fetchInitialPosts] =
    usePagination(
      PAGINATION.POST_LIST.LIMIT,
      PAGINATION.POST_LIST.DEFAULT_OFFSET,
      getData
    );

  useEffect(() => {
    console.log('fetchin initial');
    fetchInitialPosts();
  }, []);

  const onViewableItemsChanged = (item) => {
    if (!posts || posts.length === 0) {
      return;
    }
    const { index, isViewable } = item.changed[0];
    if (isViewable) {
      const time = getTimeFromTimestamp(posts[index].createdAt);
      setHeaderTime(time);
    }
  };
  const handleRefresh = async () => {
    console.log('refreshing');
    await refreshPosts();
  };

  return (
    <>
      <Header
        showGradient
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
            onPress: () =>
              navigation.navigate(PROFILE_STACK, {
                screen: PROFILE_SCREEN,
                params: { user: currentUser }
              }),
            variant: 'transparent'
          }
        ]}
      />
      <PostsList
        loading={loading}
        onRefresh={handleRefresh}
        data={posts}
        onViewableItemsChanged={onViewableItemsChanged}
        onEndReached={posts.length > 0 && fetchNewPosts}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute'
  }
});

export default HomeScreen;
