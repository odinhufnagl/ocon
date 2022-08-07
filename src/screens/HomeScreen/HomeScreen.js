import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getLatestPostsWithoutCurrentUser } from '../../api/graphql/requests';
import { Header, Text } from '../../common';
import { CountriesModal, LoadingContainer, PostsList } from '../../components';
import { IMAGES, PAGINATION } from '../../constants';
import { useCountries, usePagination } from '../../hooks';
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
  const [countries, currentCountry, setCurrentCountry] = useCountries();
  const [countryModalVisible, setCountryModalVisible] = useState(false);

  const getData = async (limit, offset) =>
    await getLatestPostsWithoutCurrentUser(
      currentUser.id,
      currentCountry,
      limit,
      offset
    );

  const [posts, fetchNewPosts, loading, refreshPosts, fetchInitialPosts] =
    usePagination(
      PAGINATION.POST_LIST.LIMIT,
      PAGINATION.POST_LIST.DEFAULT_OFFSET,
      getData
    );

  useEffect(() => {
    if (!currentCountry) {
      return;
    }
    refreshPosts();
  }, [currentCountry]);

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

  if (!countries || countries.length === 0 || !currentCountry) {
    return <LoadingContainer />;
  }

  console.log(currentCountry, posts, loading);
  return (
    <>
      <CountriesModal
        countries={countries}
        currentCountry={currentCountry}
        setCurrentCountry={setCurrentCountry}
        visible={countryModalVisible}
        setVisible={setCountryModalVisible}
      />
      <Header
        showGradient
        style={styles.header}
        leftItems={[
          {
            icon: 'chevronDown',
            image: IMAGES[currentCountry?.code],
            variant: 'transparent',
            imageStyle: { position: 'relative', left: 3 },
            onPress: () => {
              setCountryModalVisible(true);
            }
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
        onEndReached={posts?.length > 0 && fetchNewPosts}
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
