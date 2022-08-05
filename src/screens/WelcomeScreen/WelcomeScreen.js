import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import image from '../../../assets/images/welcomeScreenImageBackground.jpg';
import logoImage from '../../../assets/images/logo/logo.png';
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
          colors={['rgba(0, 0, 0, 0.7)', '#00000000']}
          style={styles.linearGradientTop}
        />
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          style={styles.linearGradientBottom}
        />
        <Container style={styles.contentContainer}>
          <View style={styles.header}>
            <Spacer spacing="medium" />
            <Image source={logoImage} style={styles.logoImage} />
          </View>
          <View style={styles.bottomContainer}>
            <Button
              title={translate(translateKey + 'signUp')}
              onPress={() => navigation.navigate(SIGN_UP_SCREEN)}
            />
            <Spacer spacing="large" />
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(LOGIN_SCREEN)}
            >
              <Text type="small" bold>
                {translate(translateKey + 'logIn')}
              </Text>
            </TouchableWithoutFeedback>
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
    height: '40%'
  },
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  logoImage: {
    width: 45,
    height: 45
  },
  header: {
    display: 'flex',
    width: '100%'
  }
});
export default WelcomeScreen;
