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
import { LoadingContainer, PostsList } from '../../components';
import { COUNTRIES, IMAGES, PAGINATION, SPACING } from '../../constants';
import { usePagination } from '../../hooks';
import { translate } from '../../i18n';
import { useAuthContext } from '../../providers/AuthProvider';

const CountryModalItem = ({
  image,
  title,
  onPress,
  currentCountry,
  country
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.countryModalItemContainer}
    >
      <Image
        source={getCountryImage(image)}
        style={styles.countryModalItemImage}
      />
      <Spacer orientation="horizontal" />
      <Text type="body" bold={currentCountry.code === country}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getCountryImage = (countryCode) => IMAGES[countryCode];

const YesterdayScreen = ({ navigation }) => {
  const { currentUser } = useAuthContext();
  //const [posts, setPosts] = useState();
  const [modalCountryVisible, setModalCountryVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(countries[0]);
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
    (async () => {
      let countries = await getCountries();
      countries.unshift({ name: 'World', code: 'world' });
      setCountries(countries);
      setCurrentCountry(countries[0]);
    })();
  }, []);

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

  if (!countries || countries.length === 0) {
    return <LoadingContainer />;
  }

  return (
    <>
      <Modal visible={modalCountryVisible} setVisible={setModalCountryVisible}>
        <View style={styles.countryModal}>
          <FlatList
            keyExtractor={(item, index) => item.id}
            style={{ flexGrow: 0 }}
            data={countries}
            renderItem={({ item, index }) => (
              <CountryModalItem
                image={item.code}
                title={item.name}
                country={item.code}
                currentCountry={currentCountry}
                onPress={() => {
                  setCurrentCountry(item);
                  setModalCountryVisible(false);
                }}
              />
            )}
          />
        </View>
      </Modal>
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
            image: getCountryImage(currentCountry?.code),
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
