import { firebase } from '@react-native-firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { EMPTY } from '../api/graphql/constants';
import { createUser, getUser } from '../api/graphql/requests';
import { LoadingHeaderContainer } from '../components';

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
      if (user && lastUid !== user.uid) {
        lastUid = user.uid;
        let userFromDB = await getUser(user.uid);

        if (!userFromDB) {
          return;
        }
        if (userFromDB === EMPTY) {
          userFromDB = await createUser({
            email: user.email,
            id: user.uid,
            appState: 1
          });
          if (!userFromDB) {
            return;
          }
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

  const value = {
    currentUser,
    setCurrentUser,
    logIn,
    signUp,
    logOut
  };

  if (loading || !currentUser || !animationDone) {
    return (
      <LoadingHeaderContainer
        animate
        animateTime={500}
        animateOnFinish={() => setAnimationDone(true)}
      />
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
