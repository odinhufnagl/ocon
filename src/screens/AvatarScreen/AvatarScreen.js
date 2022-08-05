import React, { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { Button, Container, Spacer, Text } from '../../common';
import useTheme from '../../hooks/useTheme';
import { useAuthContext } from '../../providers/AuthProvider';
import { Carousel, LoadingContainer } from '../../components';
import { getAvatars, updateUser } from '../../api/graphql/requests';
import { SvgUri } from 'react-native-svg';
import { HOME_SCREEN, HOME_STACK, INFO_SCREEN } from '../../navigation';
import { SPACING } from '../../constants';
import { translate } from '../../i18n';
import { infoScreensData } from '../InfoScreen/InfoScreen';

const AvatarCarousel = ({
  setCurrentItem,
  currentItem,
  items,
  firstItem = 0
}) => {
  const { theme } = useTheme();

  const ITEM_HEIGHT = 200;

  const onSnapToItem = (item, index) => {
    setCurrentItem(item);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.avatarItemContainer(ITEM_HEIGHT)}>
        <View View style={{ aspectRatio: 1 }}>
          <SvgUri width="100%" height="100%" uri={item.image} />
        </View>
      </View>
    );
  };

  return (
    <Carousel
      renderItem={renderItem}
      data={items}
      onSnapToItem={onSnapToItem}
      firstItem={firstItem}
    />
  );
};

const AvatarScreen = ({ navigation }) => {
  const { currentUser, updateCurrentUser } = useAuthContext();
  const [avatar, setAvatar] = useState();
  const [avatars, setAvatars] = useState();
  const [loading, setLoading] = useState();
  const translateKey = 'avatarScreen.';

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchedAvatars = await getAvatars();
      setAvatars(fetchedAvatars);
      setAvatar(fetchedAvatars[0]);
      setLoading(false);
    })();
  }, []);

  const handleButtonPress = async () => {
    setLoading(true);
    const res = await updateUser(currentUser.id, { avatarId: avatar.id });

    if (!res) {
      console.log('something went wrong');
      setLoading(false);
      return;
    }
    await updateCurrentUser();
    navigation.navigate(INFO_SCREEN, { ...infoScreensData(navigation)[0] });
    setLoading(false);
  };

  if (!avatars || !avatar) {
    return <LoadingContainer />;
  }
  return (
    <Container style={styles.container}>
      <View style={styles.middleContainer}>
        <Spacer spacing={80} />
        <Text type="header">{translate(translateKey + 'header')}</Text>
        <Spacer spacing="extraLarge" />
        <View style={styles.carouselContainer}>
          <AvatarCarousel
            firstItem={0}
            currentItem={avatar}
            setCurrentItem={setAvatar}
            items={avatars}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Button
            loading={loading}
            title="Add avatar"
            shadow={false}
            style={styles.button}
            onPress={handleButtonPress}
            icon="chevronRight"
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '90%'
  },
  avatarItemContainer: (height) => ({
    height,
    justifyContent: 'center',
    alignItems: 'center'
  }),
  button: {
    paddingHorizontal: SPACING.medium
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselContainer: {
    height: 200,
    width: '100%'
  }
});
export default AvatarScreen;
