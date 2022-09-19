import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { RESULTS } from 'react-native-permissions';
import { SvgUri } from 'react-native-svg';
import {
  getUser,
  getUsers,
  getUsersBySearch
} from '../../api/graphql/requests';
import {
  Button,
  Container,
  Header,
  Icon,
  Input,
  Spacer,
  Text
} from '../../common';
import { LoadingContainer, UserListItem } from '../../components';
import { SPACING } from '../../constants';
import { usePagination, useTheme } from '../../hooks';
import { PROFILE_SCREEN, PROFILE_STACK } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';

const LIMIT = 15;
const OFFSET = 0;

const UsersListScreen = ({ navigation, route }) => {
  const { header, where } = route.params;
  const { currentUser } = useAuthContext();

  const getData = async (limit, offset) =>
    await getUsers({
      where: where,
      limit,
      offset,
      currentUserId: currentUser.id
    });
  const [users, fetchNewResults, loading, refreshUsers, fetchInitialUsers] =
    usePagination(LIMIT, OFFSET, getData);

  useEffect(() => {
    fetchInitialUsers();
  }, []);
  if (loading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <Header
        header={header}
        leftItems={[
          {
            icon: 'back',
            onPress: () => navigation.goBack(),
            variant: 'transparent',
            iconSize: 'medium'
          }
        ]}
      />
      <Container style={styles.container}>
        {!users || users.length === 0 ? (
          <View style={styles.noResultContainer}>
            <Text>No result</Text>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            <FlatList
              keyExtractor={(item, index) => item.id}
              onEndReached={fetchNewResults}
              showsVerticalScrollIndicator={false}
              data={users}
              renderItem={({ item }) => (
                <UserListItem
                  title={item.username}
                  image={item.profileImage}
                  onPress={() =>
                    navigation.push(PROFILE_STACK, {
                      screen: PROFILE_SCREEN,
                      params: { userId: item.id }
                    })
                  }
                />
              )}
            />
          </View>
        )}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    flex: 1
  },
  resultsContainer: {
    flex: 1
  },
  noResultContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default UsersListScreen;
