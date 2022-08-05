import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { getPostsLiked } from '../../api/graphql/requests';
import { Header } from '../../common';
import { PostsList } from '../../components';
import { PAGINATION } from '../../constants';
import { usePagination } from '../../hooks';
import { useAuthContext } from '../../providers/AuthProvider';

const LikedPostsScreen = ({ navigation }) => {
  const { currentUser } = useAuthContext();
  const getData = async (limit, offset) =>
    await getPostsLiked(currentUser.id, limit, offset);
  const [posts, fetchNewPosts, loading, refreshPosts, fetchInitialPosts] =
    usePagination(
      PAGINATION.POST_LIST.LIMIT,
      PAGINATION.POST_LIST.DEFAULT_OFFSET,
      getData
    );

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  return (
    <>
      <Header
        style={styles.header}
        showGradient
        header={'Photos you enjoy'}
        leftItems={[
          {
            icon: 'back',
            iconSize: 'medium',
            variant: 'transparent',
            onPress: () => navigation.goBack()
          }
        ]}
      />
      <PostsList
        data={posts}
        loading={loading}
        onRefresh={refreshPosts}
        onEndReached={fetchNewPosts}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    zIndex: 1000
  }
});

export default LikedPostsScreen;
