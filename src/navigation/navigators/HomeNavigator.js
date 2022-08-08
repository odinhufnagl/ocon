import { firebase } from '@react-native-firebase/messaging';
import { CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { getLatestNotification } from '../../api/graphql/requests';
import { Text } from '../../common';
import { LoadingHeaderContainer } from '../../components';
import { CAMERA_TIMER } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { useAuthContext } from '../../providers/AuthProvider';
import { getSecondsSinceTimestamp, shouldShowCamera } from '../../utils';
import {
  CAMERA_SCREEN,
  HOME_SCREEN,
  INTRO_STACK,
  PROFILE_STACK
} from '../constants/routes';
import { HomeStack } from '../constants/stacks/HomeStack';

const Stack = createStackNavigator();

const HomeNavigator = ({ navigationRef }) => {
  const { theme } = useTheme();

  const [latestNotification, setLatestNotification] = useState();
  const [initialRouteName, setInitialRouteName] = useState();
  const { currentUser } = useAuthContext();
  const [rerender, setRerender] = useState(0);

  useEffect(() => {
    return (async () => {
      await requestUserPermission();
      firebase
        .messaging()
        .setBackgroundMessageHandler(async (remoteMessage) => {
          console.log('hello world');
          if (currentUser && remoteMessage.data.type === 'openCamera') {
            setRerender((prev) => prev + 1);
          }
          console.log('Message handled in the background!', remoteMessage);
        });

      const unsubscribe = firebase
        .messaging()
        .onMessage(async (remoteMessage) => {
          if (currentUser && remoteMessage.data.type === 'openCamera') {
            setRerender((prev) => prev + 1);
          }
          console.log(
            'A new FCM message arrived!',
            JSON.stringify(remoteMessage),
            remoteMessage.data
          );
        });
      return unsubscribe;
    })();
  }, []);

  useEffect(() => {
    (async () => {
      //here we find out if we should go to homescreen or to camerascreen
      const lastNotification = await getLatestNotification(currentUser.id);

      if (!lastNotification) {
        setInitialRouteName(HOME_SCREEN);
        setLatestNotification({});
        return;
      }

      setLatestNotification(lastNotification);

      const hasUserAlreadyPosted =
        lastNotification?.currentUsersPosts?.length > 0;

      if (!currentUser.avatar?.id) {
        setInitialRouteName(INTRO_STACK);
        return;
      }

      if (hasUserAlreadyPosted) {
        setInitialRouteName(HOME_SCREEN);
        return;
      }

      if (!shouldShowCamera(latestNotification?.createdAt)) {
        if (rerender > 0 && navigationRef.current.isReady()) {
          navigationRef.current.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: HOME_SCREEN }]
            })
          );
          return;
        }
        setInitialRouteName(HOME_SCREEN);
        return;
      }
      console.log('2');
      if (rerender > 0 && navigationRef.current.isReady()) {
        navigationRef.current.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: CAMERA_SCREEN }]
          })
        );
        return;
      }
      setInitialRouteName(CAMERA_SCREEN);
    })();
  }, [rerender]);

  const requestUserPermission = async () => {
    const authStatus = await firebase.messaging().requestPermission();
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  if (!initialRouteName || !latestNotification) {
    return <LoadingHeaderContainer />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        header: () => {},
        headerMode: 'float',
        cardStyle: { backgroundColor: theme.backgroundColor }
      }}
    >
      {HomeStack.map((screen) => (
        <Stack.Screen
          initialParams={
            initialRouteName === CAMERA_SCREEN && {
              latestNotification
            }
          }
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
