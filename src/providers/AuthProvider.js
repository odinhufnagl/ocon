import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/messaging";
import React, { useContext, useEffect, useState } from "react";
import { EMPTY } from "../api/graphql/constants";
import {
  createUser,
  getUser,
  getUserByUsername,
  updateUser,
} from "../api/graphql/requests";
import { LoadingHeaderContainer } from "../components";
import * as RNLocalize from "react-native-localize";
import { translate } from "../i18n";

const AuthContext = React.createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [animationDone, setAnimationDone] = useState(false);

  //prevents bug where multiple onAuthStateChanged
  //are run at the same time
  let lastUid;

  const handleAuthStateChanged = async (user, dbUserNewlyCreated) => {
    if (user && lastUid !== user.uid) {
      lastUid = user.uid;
      let userFromDB =
        dbUserNewlyCreated ||
        (await getUser({ id: user.uid, currentUserId: user.uid }));
      console.log(userFromDB);
      if (!userFromDB) {
        return;
      }
      const currentTimeZone = RNLocalize.getTimeZone();
      if (userFromDB.timeZone !== currentTimeZone) {
        updateUser(user.uid, { timeZone: currentTimeZone });
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
  };

  useEffect(() => {
    const unsubsribe = firebase.auth().onAuthStateChanged(async (user) => {
      handleAuthStateChanged(user);
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

  const signUp = async (email, username, password) => {
    try {
      const userWithusername = await getUserByUsername(username);
      if (userWithusername !== EMPTY) {
        return { error: translate("snackbar.usernameInUse") };
      }
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password);
      if (!res) {
        return;
      }
      const userFromDB = await createUser({
        username,
        email,
        id: res.user.uid,
      });
      if (!userFromDB) {
        return;
      }
      handleAuthStateChanged(res.user, userFromDB);
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const updateCurrentUser = async () => {
    const res = await getUser({
      id: currentUser.id,
      currentUserId: currentUser.id,
    });
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
    forgotPassword,
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
