import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Container, Spacer, Text } from '../../common';
import { SPACING } from '../../constants';
import { translate } from '../../i18n';
import curiousImage from '../../../assets/images/curiousEmoji/curiousEmoji.png';
import cameraImage from '../../../assets/images/cameraEmoji/cameraEmoji.png';
import worldImage from '../../../assets/images/worldEmoji/worldEmoji.png';
import clockImage from '../../../assets/images/clockEmoji/clockEmoji.png';
import { HOME_SCREEN, INFO_SCREEN } from '../../navigation';

export const infoScreensData = (navigation) => [
  {
    header: 'How it works',
    body: 'Before using CaptureIt, maybe you want to know a little bit of how it works?',
    secondaryButtonText: "I'm fine",
    buttonText: 'Tell me!',
    image: curiousImage,
    handleButtonClick: () =>
      navigation.navigate(INFO_SCREEN, { ...infoScreensData(navigation)[1] }),
    handleSecondaryButtonClick: () => navigation.navigate(HOME_SCREEN)
  },
  {
    header: 'Capture the moment',
    body: 'Everyday at a random time, you will get a notification telling you you have 10 minutes to capture what you are doing at the moment.',
    secondaryButtonText: 'Skip',
    buttonText: 'Next',
    image: cameraImage,
    handleButtonClick: () =>
      navigation.navigate(INFO_SCREEN, { ...infoScreensData(navigation)[2] }),
    handleSecondaryButtonClick: () => navigation.navigate(HOME_SCREEN)
  },
  {
    header: 'Explore the world',
    body: 'After posting your image, you can see what other people around the world has been up to, right at this moment',
    secondaryButtonText: 'Skip',
    buttonText: 'Next',
    image: worldImage,
    handleButtonClick: () =>
      navigation.navigate(INFO_SCREEN, { ...infoScreensData(navigation)[3] }),
    handleSecondaryButtonClick: () => navigation.navigate(HOME_SCREEN)
  },
  {
    header: 'Relive yesterday',
    body: 'The day after, you can relive all the worlds moments from yesterday, and we also show you which posts have gotten the most reactions! Hopefully you can take place on the scoreboard someday!',
    buttonText: "I'm ready!",
    image: clockImage,
    handleButtonClick: () => navigation.navigate(HOME_SCREEN),
    handleSecondaryButtonClick: () => navigation.navigate(HOME_SCREEN)
  }
];

const InfoScreen = ({ route }) => {
  const {
    header,
    body,
    image,
    buttonText,
    handleButtonClick,
    secondaryButtonText,
    handleSecondaryButtonClick
  } = route.params;
  return (
    <Container style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleSecondaryButtonClick}>
          <Text>{secondaryButtonText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <Image source={image} style={styles.image} />

        <Spacer spacing={100} />
        <Text type="header" style={styles.text}>
          {header}
        </Text>
        <Spacer spacing="medium" />
        <Text style={styles.text}>{body}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Button
            onPress={handleButtonClick}
            title={buttonText}
            shadow={false}
            style={styles.button}
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
    alignItems: 'flex-end'
  },

  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    maxWidth: '90%'
  },

  skipButton: {
    position: 'relative',
    top: 2
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: SPACING.medium
  },
  image: { width: 150, height: 150 }
});

export default InfoScreen;
