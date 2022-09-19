import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import {
  createUserReport,
  getPosts,
  getPostsByUserId,
  getUser
} from '../../api/graphql/requests';
import { Button, ConditionalWrapper, Header, Spacer, Text } from '../../common';
import {
  FollowButton,
  LoadingContainer,
  PostGrid,
  QuestionModal
} from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';
import {
  LIKED_POSTS_SCREEN,
  POSTS_SCREEN,
  PROFILE_IMAGE_SCREEN,
  SETTINGS_STACK,
  USERS_LIST_SCREEN
} from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import { SvgUri } from 'react-native-svg';
import { showSnackbar } from '../../utils';

const DEFAULT_BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80';

const getPostGridData = (posts) => {
  let data = [];
  let currentMonthId;
  let currentYear;
  let currentPosts = [];
  posts.forEach((post) => {
    const d = new Date(post.createdAt);
    const monthId = d.getMonth();
    const year = d.getFullYear();
    if (currentMonthId !== monthId || currentYear !== year) {
      currentMonthId = monthId;
      currentYear = year;
      currentPosts.length > 0 && data.push(currentPosts);
      data.push(`${translate('months.' + monthId)} ${year}`);
      currentPosts = [];
    }
    currentPosts.push(post);
  });
  data.push(currentPosts);
  return data;
};

const ProfileScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { userId } = route.params;
  const [user, setUser] = useState();
  const { currentUser } = useAuthContext();
  const translateKey = 'profileScreen.';
  const isCurrentUser = userId === currentUser?.id;
  const deviceHeight = useWindowDimensions().height;
  const imageHeight = deviceHeight * 0.3;
  const { theme } = useTheme();
  const [totalReactions, setTotalReactions] = useState(0);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [followersCount, setFollowersCount] = useState();

  const [posts, setPosts] = useState();

  const getTotalReactions = (posts) => {
    let reactions = 0;
    posts?.forEach((post) => {
      reactions += post.reactionsTotalCount;
    });
    return reactions;
  };

  useEffect(() => {
    setTotalReactions(getTotalReactions(posts));
  }, [posts]);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        await fetchUser();
        await fetchPosts();
      }
    })();
  }, [isFocused]);

  const fetchUser = async () => {
    const res = await getUser({ id: userId, currentUserId: currentUser.id });
    if (res) {
      setUser(res);
      setFollowersCount(res.followersCount);
    }
  };

  const getUsersPosts = async () =>
    await getPostsByUserId({
      userId,
      currentUserId: currentUser.id
    });

  const fetchPosts = async () => {
    const posts = await getUsersPosts();
    setPosts(posts);
  };

  const navigateToPost = async (item) => {
    const updatedPosts = await getUsersPosts();

    navigation.navigate(POSTS_SCREEN, {
      data: updatedPosts,
      initialScrollIndex: posts.indexOf(item),
      allowRefresh: false
    });
  };
  const handleReportUser = async () => {
    const res = await createUserReport({
      reportedByUserId: currentUser.id,
      reportedUserId: user.id
    });
    if (!res) {
      showSnackbar(translate('snackbar.error'), 'error');
      return;
    }
    showSnackbar(translate('modals.report.success'));
  };

  const handleChangeProfileImage = () => {
    navigation.navigate(PROFILE_IMAGE_SCREEN, { isUpdating: true });
  };

  if (!posts || !user) {
    return <LoadingContainer />;
  }

  const getHeader = () => {
    if (isCurrentUser) {
      return 'You';
    }
    return user.username;
  };

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <QuestionModal
        visible={reportModalVisible}
        setVisible={setReportModalVisible}
        title={translate('modals.report.title')}
        buttonClose={{
          title: translate('modals.report.buttonClose')
        }}
        buttonAction={{
          title: translate('modals.report.buttonAction'),
          onPress: handleReportUser
        }}
      />
      <Header
        showGradient
        style={{ position: 'absolute' }}
        header={getHeader()}
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
                  icon: 'settings',
                  variant: 'secondary',
                  onPress: () => navigation.navigate(SETTINGS_STACK)
                }
              ]
            : [
                {
                  icon: 'warning',
                  variant: 'secondary',
                  onPress: () => setReportModalVisible(true),
                  color: theme.errorColor
                }
              ]
        }
      />
      <ImageBackground
        blurRadius={6}
        style={styles.imageBackground(imageHeight)}
        source={{
          uri:
            posts[0]?.image || posts[0]?.thumbnail || DEFAULT_BACKGROUND_IMAGE
        }}
        resizeMethod="resize"
      />
      <ScrollView
        style={{
          height: '100%',
          flex: 1
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={posts.length === 0 && { height: '100%' }}
      >
        <View style={{ height: imageHeight - 20 }}></View>
        <View style={styles.scrollContainer(theme)}>
          <View style={styles.contentContainer}>
            <View style={styles.scrollUpperContainer}>
              <ConditionalWrapper
                condition={isCurrentUser}
                wrapper={(children) => (
                  <TouchableOpacity onPress={handleChangeProfileImage}>
                    {children}
                  </TouchableOpacity>
                )}
              >
                <View style={styles.profileImageContainer(theme)}>
                  <Image
                    source={{ uri: user.profileImage }}
                    style={styles.profileImage}
                  />
                </View>
              </ConditionalWrapper>

              <Spacer spacing="medium" />

              <Text type="body" bold>
                {user.username}
              </Text>
              <View style={styles.captionContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(USERS_LIST_SCREEN, {
                      header: translate('headers.followers'),
                      where: { following: { followedId: { _eq: user.id } } }
                    })
                  }
                >
                  <Text type="small">
                    {followersCount} {translate(translateKey + 'followers')}
                  </Text>
                </TouchableOpacity>
                <Spacer spacing="tiny" orientation="horizontal" />
                <View style={styles.bulletin(theme)} />
                <Spacer spacing="tiny" orientation="horizontal" />
                {/*<Text type="small">
                  {totalReactions} {translate(translateKey + 'reactions')}
      </Text>*/}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(USERS_LIST_SCREEN, {
                      header: translate('headers.following'),
                      where: { followers: { followerId: { _eq: user.id } } }
                    })
                  }
                >
                  <Text type="small">
                    {translate(translateKey + 'following')}{' '}
                    {user.followingCount}
                  </Text>
                </TouchableOpacity>
              </View>
              <Spacer />
              {!isCurrentUser && (
                <FollowButton
                  setFollowersCount={setFollowersCount}
                  isAlreadyFollowing={user.isAlreadyFollowing}
                  followedUserId={user.id}
                  followerId={currentUser.id}
                />
              )}

              <Spacer spacing="large" />
            </View>
            <PostGrid
              data={getPostGridData(posts)}
              onPostPress={navigateToPost}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: (theme) => ({
    borderRadius: 100,
    backgroundColor: theme.backgroundColor,
    width: 100,
    height: 100,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid'
  }),
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 200
  },
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
