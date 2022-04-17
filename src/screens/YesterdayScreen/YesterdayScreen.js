import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { getPostsYesterday } from '../../api/graphql/requests';
import { Header, Modal, Spacer, Text } from '../../common';
import { PostsList } from '../../components';
import { COUNTRIES, IMAGES, SPACING } from '../../constants';
import { translate } from '../../i18n';
import { useAuthContext } from '../../providers/AuthProvider';

/*const { width: windowWidth } = Dimensions.get('window');
const LeaderBoardCarousel = ({ header, data }) => {
  const { theme } = useTheme();
  return (
    <>
      <PostsHeader
        header={header}
        button={{ title: 'Show all' }}
        style={styles.postsHeader}
      />
      <Spacer spacing="medium" />

      <PostCardsCarousel data={data} />
    </>
  );
};

const YesterdayScreen = () => {
  const { currentUser } = useAuthContext();
  const [posts, setPosts] = useState();
  useEffect(async () => {
    const posts = await getPosts({ userId: { _eq: currentUser.id } });

    posts.forEach((item, index) => {
      console.log(item.postType, index);
    });
    setPosts(posts);
  }, []);

  if (!posts) {
    return <LoadingContainer />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Spacer spacing="extraLarge" />
      <LeaderBoardCarousel data={posts} header="Sweden" />
      <Spacer spacing="extraLarge" />
      <Spacer spacing="medium" />
      <PostsHeader
        header={'Random picks'}
        button={{ title: 'Show all' }}
        style={styles.postsHeader}
      />
      <Spacer spacing="medium" />
      <View style={styles.mediumPostCard}>
        <PostCard type="medium" post={posts[0]} />
      </View>
      <Spacer spacing="extraLarge" />
      <Spacer spacing="medium" />
      <LeaderBoardCarousel data={posts} header="The world" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  postsHeader: {
    paddingHorizontal: SPACING.medium
  },
  mediumPostCard: {
    paddingHorizontal: SPACING.medium,
    width: '100%'
  },
  line: (theme) => ({ width: '100%', height: 1, backgroundColor: theme.dp3 })
});*/

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
      <Image source={image} style={styles.countryModalItemImage} />
      <Spacer orientation="horizontal" />
      <Text type="body" bold={currentCountry === country}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getCountryImage = (country) => {
  switch (country) {
    case COUNTRIES.SWEDEN:
      return 'sweden';
    case COUNTRIES.WORLD:
      return 'world';
    default:
      break;
  }
};

const modalCountriesData = [
  { image: IMAGES.sweden, title: 'Sweden', country: COUNTRIES.SWEDEN },
  { image: IMAGES.world, title: 'The World', country: COUNTRIES.WORLD }
];

const YesterdayScreen = ({ navigation }) => {
  const { currentUser } = useAuthContext();
  const [posts, setPosts] = useState();
  const [modalCountryVisible, setModalCountryVisible] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(COUNTRIES.SWEDEN);

  useEffect(() => {
    (async () => {
      setPosts();
      const posts = await getPostsYesterday(currentCountry, currentUser.id);
      console.log('posts', posts);
      posts?.forEach((item, index) => {
        console.log(item.postType, index);
      });
      setPosts(posts);
    })();
  }, [currentCountry]);

  return (
    <>
      <Modal visible={modalCountryVisible} setVisible={setModalCountryVisible}>
        <View style={styles.countryModal}>
          <FlatList
            keyExtractor={(item, index) => item.id}
            style={{ flexGrow: 0 }}
            data={modalCountriesData}
            renderItem={({ item, index }) => (
              <CountryModalItem
                image={item.image}
                title={item.title}
                country={item.country}
                currentCountry={currentCountry}
                onPress={() => {
                  setCurrentCountry(item.country);
                  setModalCountryVisible(false);
                }}
              />
            )}
          />
        </View>
      </Modal>
      <Header
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
      <PostsList data={posts} showPlace />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    zIndex: 1000
  },
  countryModal: {
    marginHorizontal: 20
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
