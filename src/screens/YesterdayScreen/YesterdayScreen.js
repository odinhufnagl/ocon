import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { getCountries, getPostsYesterday } from '../../api/graphql/requests';
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
import { useAuthContext } from '../../providers/AuthProvider';
import { getCountryImage } from '../../utils';

const YesterdayScreen = ({ navigation }) => {
  const { currentUser } = useAuthContext();
  //const [posts, setPosts] = useState();
  const [modalCountryVisible, setModalCountryVisible] = useState(false);
  const [countries, currentCountry, setCurrentCountry] = useCountries();
  // const [loadingPosts, setLoadingPosts] = useState(false);
  const getData = async (limit, offset) =>
    await getPostsYesterday(currentCountry, currentUser.id, limit, offset);
  const [posts, fetchNewPosts, loading, refreshPosts] = usePagination(
    PAGINATION.POST_LIST.LIMIT,
    PAGINATION.POST_LIST.DEFAULT_OFFSET,
    getData
  );

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
      />
      <PostsList
        loading={loading}
        ref={listRef}
        data={posts}
        showPlace
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
