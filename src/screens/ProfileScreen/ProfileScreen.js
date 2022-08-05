import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View
} from 'react-native';
import { getPosts } from '../../api/graphql/requests';
import { Header, Icon, Spacer, Text } from '../../common';
import { LoadingContainer, PostCard } from '../../components';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';
import {
  LIKED_POSTS_SCREEN,
  POSTS_SCREEN,
  SETTINGS_SCREEN
} from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import { SvgUri } from 'react-native-svg';

const DEFAULT_BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80';
const WINDOW_WIDTH = Dimensions.get('window').width;

const ProfileScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const { currentUser } = useAuthContext();

  const isCurrentUser = user?.id === currentUser?.id;
  const { logOut } = useAuthContext();
  const deviceHeight = useWindowDimensions().height;
  const imageHeight = deviceHeight * 0.3;
  const { theme } = useTheme();
  const [totalReactions, setTotalReactions] = useState(0);

  const [posts, setPosts] = useState();

  const getTotalReactions = (posts) => {
    let reactions = 0;
    posts?.forEach((post) => {
      reactions += post.reactionsTotalCount;
    });
    return reactions;
  };
  useEffect(async () => {
    const posts = await getPosts(
      { userId: { _eq: user.id } },
      user.id,
      undefined,
      999999,
      0
    );
    setTotalReactions(getTotalReactions(posts));
    setPosts(posts);
  }, []);

  const navigateToPost = (item) => {
    navigation.navigate(POSTS_SCREEN, {
      data: posts,
      initialScrollIndex: posts.indexOf(item)
    });
  };

  if (!posts) {
    return <LoadingContainer />;
  }

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <Header
        showGradient
        style={{ position: 'absolute', zIndex: 20000 }}
        header={translate('headers.profileScreen')}
        leftItems={[
          {
            icon: 'back',
            iconSize: 'medium',
            variant: 'secondary',
            onPress: () => navigation.goBack()
          }
        ]}
        rightItems={
          isCurrentUser
            ? [
                {
                  icon: 'heart',
                  variant: 'secondary',
                  onPress: () => navigation.navigate(LIKED_POSTS_SCREEN)
                },
                {
                  icon: 'logOut',
                  variant: 'secondary',
                  onPress: logOut
                }
              ]
            : []
        }
      />
      <ImageBackground
        blurRadius={6}
        style={styles.imageBackground(imageHeight)}
        source={{
          uri: posts[0]?.image || DEFAULT_BACKGROUND_IMAGE
        }}
        resizeMethod="resize"
      ></ImageBackground>
      <ScrollView
        style={{ height: '100%', flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={posts.length === 0 && { height: '100%' }}
      >
        <View style={{ height: imageHeight - 20 }}></View>
        <View style={styles.scrollContainer(theme)}>
          <View style={styles.contentContainer}>
            <View style={styles.scrollUpperContainer}>
              <View style={styles.avatarContainer(theme)}>
                <SvgUri uri={user.avatar.image} width="100%" height="100%" />
              </View>
              <Spacer spacing="medium" />

              <Text type="body" bold>
                {isCurrentUser ? user.email : '*********'}
              </Text>
              <View style={styles.captionContainer}>
                <Text type="small">{posts.length} images</Text>
                <Spacer spacing="tiny" orientation="horizontal" />
                <View style={styles.bulletin(theme)} />
                <Spacer spacing="tiny" orientation="horizontal" />
                <Text type="small">{totalReactions} reactions</Text>
              </View>
              <Spacer spacing="large" />
            </View>
            {posts.length > 0 ? (
              <FlatList
                keyExtractor={(item, index) => item.id}
                data={posts}
                style={{ marginHorizontal: (SPACING.tiny * 3) / 2 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <PostCard
                    onPress={navigateToPost}
                    post={item}
                    type="small"
                    style={{
                      marginHorizontal: (SPACING.tiny * 3) / 2,
                      marginBottom: SPACING.tiny * 3,
                      // flex: 1
                      width: WINDOW_WIDTH / 3 - SPACING.tiny * 3
                    }}
                  />
                )}
                numColumns={3}
              />
            ) : (
              <View style={styles.noImagesContainer}>
                <View style={styles.noImagesIconContainer}>
                  <Icon variant="image" size="extraLarge" />
                </View>
                <Spacer />
                <Text style={{ color: 'white' }}>
                  {translate('profileScreen.emptyImageList')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: (theme) => ({
    borderRadius: 100,
    backgroundColor: theme.backgroundColor,
    width: 100,
    height: 100,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid'
  }),
  imageBackground: (height) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    opacity: 0.5,
    height
  }),
  scrollContainer: (theme) => ({
    backgroundColor: theme.backgroundColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1
  }),
  scrollUpperContainer: {
    alignItems: 'center'
  },
  contentContainer: {
    position: 'relative',
    top: -50,
    height: '100%',
    width: '100%'
  },
  bulletin: (theme) => ({
    backgroundColor: theme.textMediumColor,
    width: 4,
    height: 4,
    borderRadius: 20
  }),
  noImagesContainer: {
    ...DIMENS.common.centering,
    flex: 1,
    width: '100%'
  },
  noImagesIconContainer: {
    borderRadius: 200,
    padding: SPACING.medium,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white'
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  }
});

export default ProfileScreen;
