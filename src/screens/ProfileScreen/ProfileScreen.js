import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getPosts } from '../../api/graphql/requests';
import { Header, Spacer, Text } from '../../common';
import { LoadingContainer, PostCard } from '../../components';
import { SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';
import { POSTS_SCREEN, SETTINGS_SCREEN } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
const WINDOW_WIDTH = Dimensions.get('window').width;
const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useAuthContext();
  const deviceHeight = useWindowDimensions().height;
  const imageHeight = deviceHeight * 0.43;
  const { theme } = useTheme();
  const [totalReactions, setTotalReactions] = useState(0);

  const [posts, setPosts] = useState();

  const getTotalReactions = (posts) => {
    let reactions = 0;
    posts.forEach((post) => {
      reactions += post.reactionsTotalCount;
    });
    return reactions;
  };
  useEffect(async () => {
    const posts = await getPosts(
      { userId: { _eq: currentUser.id } },
      currentUser.id
    );
    setTotalReactions(getTotalReactions(posts));

    posts.forEach((item, index) => {
      console.log(item.postType, index);
    });
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
    <View style={{ flex: 1 }}>
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
        rightItems={[
          { icon: 'heart', variant: 'secondary' },
          {
            icon: 'settings',
            variant: 'secondary',
            onPress: () => navigation.navigate(SETTINGS_SCREEN)
          }
        ]}
      />
      <ImageBackground
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          opacity: 0.6,
          height: imageHeight,
          justifyContent: 'flex-end'
        }}
        source={{ uri: posts[0].image }}
      >
        <LinearGradient
          colors={['#00000000', '#000']}
          style={{ width: '100%', height: 150 }}
        />
      </ImageBackground>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: imageHeight - 80 }}></View>
        <View style={{ marginHorizontal: (SPACING.tiny * 3) / 2 }}>
          <Text type="body" bold>
            {currentUser.email}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text type="small">{posts.length} images</Text>
            <Spacer spacing="tiny" orientation="horizontal" />
            <View
              style={{
                backgroundColor: theme.textMediumColor,
                width: 4,
                height: 4,
                borderRadius: 20
              }}
            ></View>
            <Spacer spacing="tiny" orientation="horizontal" />
            <Text type="small">{totalReactions} reactions</Text>
          </View>
        </View>
        <Spacer spacing="small" />

        <FlatList
          keyExtractor={(item, index) => item.id}
          data={posts}
          style={{ marginHorizontal: (SPACING.tiny * 3) / 2 }}
          renderItem={({ item, index }) => (
            <PostCard
              onPress={navigateToPost}
              post={item}
              type="small"
              style={{
                // marginHorizontal: (SPACING.tiny * 3) / 2,
                marginBottom: SPACING.tiny * 3,
                // flex: 1
                width: WINDOW_WIDTH / 3 - SPACING.tiny * 3
              }}
            />
          )}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </ScrollView>
    </View>
  );

  /*return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts.slice(2)}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={() => (
          <>
            <Spacer spacing="extraLarge" />
            <PostCard type="large" post={posts[0]} onPress={navigateToPost} />
            <Spacer spacing="medium" />
            <PostCard type="medium" post={posts[1]} onPress={navigateToPost} />
            <Spacer spacing="medium" />
          </>
        )}
        renderItem={({ item, index }) => (
          <PostCard
            onPress
            type={
              posts.slice(2).length % 2 !== 0 &&
              index === posts.slice(2).length - 1
                ? 'medium'
                : 'small'
            }
            post={item}
            onPress={navigateToPost}
            style={
              !(
                posts.slice(2) % 2 !== 0 && index === posts.slice(2).length - 1
              ) && index % 2 === 0
                ? {
                    flex: 1,
                    marginRight: SPACING.medium,
                    marginBottom: SPACING.medium
                  }
                : { flex: 1, marginBottom: SPACING.medium }
            }
          />
        )}
        numColumns={2}
      />
    </Container>
  );*/
};

export default ProfileScreen;
