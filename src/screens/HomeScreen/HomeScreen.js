import React, { useEffect, useRef, useState } from 'react';
import { Modal as RNModal, StyleSheet } from 'react-native';
import { getPopularPosts } from '../../api/graphql/requests';
import { Header } from '../../common';
import { LoadingContainer, MapModal, PostsList } from '../../components';
import { IMAGES, PAGINATION, SPACING } from '../../constants';
import { useCountries, usePagination } from '../../hooks';
import { translate } from '../../i18n';
import {
  PROFILE_SCREEN,
  PROFILE_STACK,
  SEARCH_SCREEN,
  YESTERDAY_STACK
} from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import { getCountryImage, getTimeFromTimestamp } from '../../utils';

const POSTS_VARIANT = {
  FOLLOWING: 'following',
  POPULAR: 'popular'
};

const POSTS_TABS = [
  {
    value: POSTS_VARIANT.FOLLOWING,
    title: translate('tabs.following')
  },
  {
    value: POSTS_VARIANT.POPULAR,
    title: translate('tabs.popular')
  }
];

const HomeScreen = ({ navigation, route }) => {
  const { currentUser } = useAuthContext();
  const [headerTime, setHeaderTime] = useState();
  const [countries, currentCountry, setCurrentCountry] = useCountries();
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [postsVariant, setPostsVariant] = useState(POSTS_VARIANT.FOLLOWING);

  const getData = async (limit, offset) =>
    await getPopularPosts({
      limit,
      offset,
      following: postsVariant === POSTS_VARIANT.FOLLOWING,
      country: currentCountry,
      currentUserId: currentUser.id
    });

  const [posts, fetchNewPosts, loading, refreshPosts, fetchInitialPosts] =
    usePagination(
      PAGINATION.POST_LIST.LIMIT,
      PAGINATION.POST_LIST.DEFAULT_OFFSET,
      getData
    );

  useEffect(() => {
    if (route?.params?.navigateTo) {
      setTimeout(() => {
        navigation.navigate(route?.params?.navigateTo);
      }, 300);
    }
  }, [route?.params?.navigateTo]);

  useEffect(() => {
    refreshPosts();
  }, [postsVariant]);

  useEffect(() => {
    console.log('currentCountry', currentCountry);
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

  return (
    <>
      <MapModal
        availableCountries={countries}
        visible={countryModalVisible}
        setVisible={setCountryModalVisible}
        setCurrentCountry={setCurrentCountry}
        currentCountry={currentCountry}
      />
      {/*<CountriesModal
        countries={countries}
        currentCountry={currentCountry}
        setCurrentCountry={setCurrentCountry}
        visible={countryModalVisible}
        setVisible={setCountryModalVisible}
  />*/}
      <Header
        showGradient
        style={styles.header}
        leftItems={[
          {
            icon: 'chevronDown',
            image: getCountryImage(currentCountry),
            variant: 'transparent',
            imageStyle: { position: 'relative', left: 3 },
            onPress: () => {
              setCountryModalVisible(true);
            }
          }
        ]}
        tabs={POSTS_TABS}
        tabValue={postsVariant}
        onTabPress={(value) => setPostsVariant(value)}
        rightItems={[
          {
            icon: 'explore',
            onPress: () => navigation.navigate(YESTERDAY_STACK),
            variant: 'transparent'
          },
          {
            icon: 'search',
            iconSize: 'medium',
            onPress: () => navigation.navigate(SEARCH_SCREEN),
            variant: 'transparent'
          },
          {
            icon: 'profile',
            iconSize: 'medium',
            onPress: () =>
              navigation.navigate(PROFILE_STACK, {
                screen: PROFILE_SCREEN,
                params: { userId: currentUser.id }
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
  },
  postsVariantText: {
    fontSize: 16
  }
});

export default HomeScreen;
