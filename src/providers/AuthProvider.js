import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/messaging';
import React, { useContext, useEffect, useState } from 'react';
import { EMPTY } from '../api/graphql/constants';
import { createUser, getUser, updateUser } from '../api/graphql/requests';
import { LoadingHeaderContainer } from '../components';
import * as RNLocalize from 'react-native-localize';

export const ONBOARDING_DATA = Object.freeze({
  SSN: 'ssn',
  NAME: 'name',
  PHONE_NUMBER: 'phoneNumber',
  USER_DETAILS: 'userDetails',
  EMAIL: 'email'
});

const AuthContext = React.createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [animationDone, setAnimationDone] = useState(false);

  //prevents bug where multiple onAuthStateChanged
  //are run at the same time
  let lastUid;

  useEffect(() => {
    const unsubsribe = firebase.auth().onAuthStateChanged(async (user) => {
      console.log('user', user);
      if (user && lastUid !== user.uid) {
        await updateUser(user.uid, { timeZone: RNLocalize.getTimeZone() });
        lastUid = user.uid;
        let userFromDB = await getUser(user.uid);

        if (!userFromDB) {
          return;
        }
        if (userFromDB === EMPTY) {
          userFromDB = await createUser({
            email: user.email,
            id: user.uid
          });
          if (!userFromDB) {
            return;
          }
        }
        const fcmToken = await firebase.messaging().getToken();
        if (userFromDB.notificationToken !== fcmToken) {
          updateUser(user.uid, { notificationToken: fcmToken });
        }
        setCurrentUser(userFromDB);
        lastUid = null;
      }
      if (!user) {
        setCurrentUser(EMPTY);
      }
      setLoading(false);
    });
    return unsubsribe;
  }, []);

  const logOut = async () => {
    await firebase.auth().signOut();
  };

  const logIn = async (email, password) => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password);

      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const forgotPassword = async (email) => {
    try {
      if (email.length === 0) {
        return;
      }
      await firebase.auth().sendPasswordResetEmail(email.trim());
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async (email, password) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password);
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const updateCurrentUser = async () => {
    const res = await getUser(currentUser.id);
    if (!res) {
      return;
    }
    setCurrentUser(res);
    return true;
  };

  const value = {
    currentUser,
    setCurrentUser,
    logIn,
    signUp,
    logOut,
    updateCurrentUser,
    forgotPassword
  };

  if (loading || !currentUser || !animationDone) {
    return (
      <LoadingHeaderContainer
        animate
        animateTime={1000}
        animateOnFinish={() => setAnimationDone(true)}
      />
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
