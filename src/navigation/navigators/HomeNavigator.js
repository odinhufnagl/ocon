import { firebase } from '@react-native-firebase/messaging';
import { CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { EMPTY } from '../../api/graphql/constants';
import { getLatestNotification } from '../../api/graphql/requests';
import { LoadingHeaderContainer } from '../../components';
import useTheme from '../../hooks/useTheme';
import { useAuthContext } from '../../providers/AuthProvider';
import { hasTimestampHappened, shouldShowCamera } from '../../utils';
import {
  CAMERA_SCREEN,
  HOME_SCREEN,
  INTRO_STACK,
  YESTERDAY_STACK
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
        setLatestNotification(EMPTY);
        return;
      }
      setLatestNotification(lastNotification);
      if (!currentUser.profileImage) {
        setInitialRouteName(INTRO_STACK);
        return;
      }

      const hasUserAlreadyPosted =
        lastNotification?.currentUsersPosts?.length > 0;

      if (hasUserAlreadyPosted) {
        setInitialRouteName(HOME_SCREEN);
        return;
      }

      if (!shouldShowCamera(lastNotification?.createdAt)) {
        if (rerender > 0 && navigationRef?.isReady()) {
          navigationRef?.dispatch(
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
      if (rerender > 0 && navigationRef?.isReady()) {
        navigationRef?.dispatch(
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

  /*useEffect(() => {
    if (!navigationRef?.isReady() || !initialRouteName || !latestNotification) {
      return;
    }
    if (latestNotification === EMPTY) {
      navigationRef?.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: HOME_SCREEN }, { name: YESTERDAY_STACK }]
        })
      );
    }
  }, [navigationRef, initialRouteName, latestNotification]);*/

  const requestUserPermission = async () => {
    const authStatus = await firebase.messaging().requestPermission();
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getInitialParams = () => {
    switch (initialRouteName) {
      case HOME_SCREEN:
        if (!hasTimestampHappened(latestNotification.createdAt)) {
          return { navigateTo: YESTERDAY_STACK };
        }
        break;
      default:
        break;
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
          initialParams={getInitialParams()}
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
