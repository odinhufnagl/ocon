import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Image } from 'react-native';
import { Button, Container, Header, Spacer, Text } from '../../common';
import useTheme from '../../hooks/useTheme';
import { useAuthContext } from '../../providers/AuthProvider';
import { Carousel, LoadingContainer } from '../../components';
import { getAvatars, updateUser } from '../../api/graphql/requests';
import { SvgUri } from 'react-native-svg';
import { HOME_SCREEN, HOME_STACK, INFO_SCREEN } from '../../navigation';
import { PERMISSIONS, SPACING } from '../../constants';
import { translate } from '../../i18n';
import { infoScreensData } from '../InfoScreen/InfoScreen';
import * as ImagePicker from 'react-native-image-picker';
import { hasPermission, showSnackbar } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { getFile, saveFile } from '../../api/firebase';

const getDefaultSource = (name) =>
  `https://ui-avatars.com/api/?size=512&name=${name}&length=1&background=random&format=jpg`;

const ProfileImage = ({ source }) => {
  return <Image source={{ uri: source }} style={styles.profileImage} />;
};

const ProfileImageScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const isUpdating = route?.params?.isUpdating;
  const { currentUser, updateCurrentUser } = useAuthContext();
  const [loading, setLoading] = useState();
  const translateKey = 'profileImageScreen.';
  const [source, setSource] = useState(
    currentUser.profileImage || getDefaultSource(currentUser.username)
  );
  const [sourceIsLocal, setSourceIsLocal] = useState();
  console.log(currentUser);
  const handleAddImage = async () => {
    setLoading(true);
    let imagePath = source;
    if (sourceIsLocal) {
      const randomFileName = uuidv4();
      const resImage = await saveFile({
        uri: source,
        fileName: randomFileName
      });

      if (!resImage) {
        showSnackbar(translate('snackbar.error'), 'error');
        setLoading(false);
        return;
      }
      imagePath = await getFile({ fileName: randomFileName });
    }

    const res = await updateUser(currentUser.id, {
      profileImage: imagePath
    });

    if (!res) {
      console.log('something went wrong');
      setLoading(false);
      return;
    }
    await updateCurrentUser();

    isUpdating
      ? navigation.goBack()
      : navigation.replace(INFO_SCREEN, { ...infoScreensData(navigation)[0] });
    setLoading(false);
  };

  const handleOpenLibrary = async () => {
    await hasPermission(PERMISSIONS.WRITE_PHOTOS);
    ImagePicker.launchImageLibrary({}, (res) => {
      if (res.errorMessage || res.didCancel) {
        return;
      }
      setSourceIsLocal(true);
      setSource(res.assets[0].uri);
    });
  };
  const handleOpenCamera = async () => {
    await hasPermission(PERMISSIONS.CAMERA);
    ImagePicker.launchCamera({}, (res) => {
      console.log(res);
      if (res.errorMessage || res.didCancel) {
        return;
      }
      setSourceIsLocal(true);
      setSource(res.assets[0].uri);
    });
  };

  return (
    <>
      {isUpdating && (
        <Header
          style={{ position: 'absolute' }}
          leftItems={[
            {
              icon: 'back',
              variant: 'transparent',
              iconSize: 'medium',
              onPress: navigation.goBack
            }
          ]}
          header="Update image"
        />
      )}

      <Container style={styles.container}>
        <View style={styles.middleContainer}>
          <Spacer spacing={80} />
          {!isUpdating && (
            <Text type="header">{translate(translateKey + 'header')}</Text>
          )}
          <Spacer spacing="extraLarge" />
          <ProfileImage source={source} />
          <Spacer spacing="extraLarge" />
          <View style={styles.buttonsContainer}>
            <Button
              title="Choose from library"
              shadow={false}
              variant="third"
              style={styles.button(theme)}
              onPress={handleOpenLibrary}
            />

            <Spacer spacing="medium" />
            <Button
              variant="third"
              title="Take an image"
              shadow={false}
              style={styles.button(theme)}
              onPress={handleOpenCamera}
            />
          </View>
        </View>
        <Spacer spacing="large" />
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          <View>
            <Button
              loading={loading}
              title={isUpdating ? 'Update image' : 'Add image'}
              shadow={false}
              style={styles.addImageButton}
              onPress={handleAddImage}
              icon="chevronRight"
            />
          </View>
        </View>
      </Container>
    </>
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
  button: (theme) => ({
    width: 200
  }),
  addImageButton: {
    paddingHorizontal: SPACING.medium
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'column'
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselContainer: {
    height: 200,
    width: '100%'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid'
  }
});
export default ProfileImageScreen;
