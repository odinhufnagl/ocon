import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  getCountries,
  getPostsYesterday,
  getScoreboardPosts
} from '../../api/graphql/requests';
import { Header, Modal, Spacer, Text } from '../../common';
import {
  CountriesModal,
  LoadingContainer,
  MapModal,
  PostsList
} from '../../components';
import { COUNTRIES, IMAGES, PAGINATION, SPACING } from '../../constants';
import { useCountries, usePagination } from '../../hooks';
import { translate } from '../../i18n';
import { HOME_SCREEN } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import { getCountryImage } from '../../utils';

const POSTS_VARIANT = {
  FOLLOWING: 'following',
  SCORE_BOARD: 'scoreboard'
};

const POSTS_TABS = [
  {
    value: POSTS_VARIANT.SCORE_BOARD,
    title: translate('tabs.scoreboard')
  },
  {
    value: POSTS_VARIANT.FOLLOWING,
    title: translate('tabs.following')
  }
];

const YesterdayScreen = ({ navigation }) => {
  const { currentUser } = useAuthContext();
  const [modalCountryVisible, setModalCountryVisible] = useState(false);
  const [countries, currentCountry, setCurrentCountry] = useCountries();
  const [postsVariant, setPostsVariant] = useState(POSTS_VARIANT.SCORE_BOARD);
  const getData = async (limit, offset) =>
    await getScoreboardPosts({
      limit,
      offset,
      following: postsVariant === POSTS_VARIANT.FOLLOWING,
      country: currentCountry,
      currentUserId: currentUser.id
    });

  const [posts, fetchNewPosts, loading, refreshPosts] = usePagination(
    PAGINATION.POST_LIST.LIMIT,
    PAGINATION.POST_LIST.DEFAULT_OFFSET,
    getData
  );

  useEffect(() => {
    refreshPosts();
  }, [postsVariant]);

  const listRef = useRef();

  useEffect(() => {
    if (!currentCountry) {
      return;
    }
    refreshPosts();
  }, [currentCountry]);

  const handleRefresh = async () => {
    refreshPosts();
  };

  const scrollToTop = () => {
    listRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  if (!countries || countries.length === 0 || !currentCountry) {
    return <LoadingContainer />;
  }

  return (
    <>
      <MapModal
        availableCountries={countries}
        visible={modalCountryVisible}
        setVisible={setModalCountryVisible}
        currentCountry={currentCountry}
        setCurrentCountry={setCurrentCountry}
      />
      <Header
        showGradient
        headerOnClick={scrollToTop}
        style={styles.header}
        header={translate('headers.yesterdayScreen')}
        leftItems={[
          {
            icon: 'back',
            iconSize: 'medium',
            variant: 'transparent',
            onPress: () => navigation.goBack()
          }
        ]}
        rightItems={[
          {
            icon: 'chevronDown',
            image: getCountryImage(currentCountry),
            variant: 'transparent',
            imageStyle: { position: 'relative', left: 3 },
            onPress: () => {
              setModalCountryVisible(true);
            }
          }
        ]}
        tabValue={postsVariant}
        onTabPress={(value) => setPostsVariant(value)}
        tabs={POSTS_TABS}
      />
      <PostsList
        loading={loading}
        ref={listRef}
        data={posts}
        showPlace={postsVariant === POSTS_VARIANT.SCORE_BOARD}
        onRefresh={handleRefresh}
        onEndReached={fetchNewPosts}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute'
  },
  countryModal: {
    marginHorizontal: SPACING.extraLarge,
    marginVertical: SPACING.extraLarge - SPACING.medium
  },
  countryModalItemContainer: {
    flexDirection: 'row',
    paddingVertical: SPACING.medium,
    alignItems: 'center'
  },
  countryModalItemImage: {
    width: 25,
    height: 25
  }
});

export default YesterdayScreen;
