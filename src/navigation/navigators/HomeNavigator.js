import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { getLatestNotification } from '../../api/graphql/requests';
import { LoadingHeaderContainer } from '../../components';
import { CAMERA_TIMER } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { useAuthContext } from '../../providers/AuthProvider';
import { getSecondsSinceTimestamp } from '../../utils';
import { CAMERA_SCREEN, HOME_SCREEN } from '../constants/routes';
import { HomeStack } from '../constants/stacks/HomeStack';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  const { theme } = useTheme();

  const [latestNotification, setLatestNotification] = useState();
  const [initialRouteName, setInitialRouteName] = useState();
  const { currentUser } = useAuthContext();

  //here we find out if we should go to homescreen or to camerascreen
  useEffect(() => {
    (async () => {
      const lastNotification = await getLatestNotification(currentUser.id);
      setLatestNotification(lastNotification);
      const hasUserAlreadyPosted =
        lastNotification.currentUsersPosts.length > 0;
      if (hasUserAlreadyPosted) {
        setInitialRouteName(HOME_SCREEN);
        return;
      }
      const secondsSinceTimestamp = getSecondsSinceTimestamp(
        lastNotification.createdAt
      );
      if (secondsSinceTimestamp > CAMERA_TIMER) {
        setInitialRouteName(HOME_SCREEN);
        return;
      }
      setInitialRouteName(CAMERA_SCREEN);
    })();
  }, []);

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
