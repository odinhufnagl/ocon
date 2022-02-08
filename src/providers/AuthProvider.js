import { firebase } from '@react-native-firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

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

  useEffect(() => {
    const unsubsribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
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
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="black" />
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
