import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import image from '../../../assets/images/welcomeScreenImageBackground.jpg';
import { Button, Container, Spacer, Text } from '../../common';
import { translate } from '../../i18n/translate';
import {
  LOGIN_SCREEN,
  SIGN_UP_SCREEN
} from '../../navigation/constants/routes';

const WelcomeScreen = ({ navigation }) => {
  const translateKey = 'welcomeScreen.';
  return (
    <View>
      <ImageBackground source={image} style={styles.imageBackground}>
        <LinearGradient
          colors={['#000', '#00000000']}
          style={styles.linearGradientTop}
        />
        <LinearGradient
          colors={['#00000000', '#000']}
          style={styles.linearGradientBottom}
        />
        <Container style={styles.contentContainer}>
          <View>
            <Spacer spacing="large" />
            <Text type="heading">{translate(translateKey + 'header')}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Button
              title={translate(translateKey + 'button1')}
              onPress={() => navigation.navigate(LOGIN_SCREEN)}
            />
            <Spacer spacing="large" />
            <Button
              title={translate(translateKey + 'button2')}
              variant="secondary"
              onPress={() => navigation.navigate(SIGN_UP_SCREEN)}
              shadow={false}
            />
          </View>
        </Container>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  linearGradientTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '25%'
  },
  linearGradientBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%'
  },
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomContainer: {
    width: '100%'
  }
});
export default WelcomeScreen;
