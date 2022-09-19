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

const LIMIT = 15;
const OFFSET = 0;

const SearchScreen = ({ navigation }) => {
  const translateKey = 'searchScreen.';
  const [searchValue, setSearchValue] = useState();

  const getData = async (limit, offset) =>
    await getUsersBySearch({ searchPhrase: searchValue, limit, offset });
  const [results, fetchNewResults, loading, refreshResult] = usePagination(
    LIMIT,
    OFFSET,
    getData
  );

  useEffect(() => {
    refreshResult();
  }, [searchValue]);

  return (
    <>
      <Header
        header="Search"
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
        <View style={styles.inputContainer}>
          <Input
            autoCapitalize="none"
            style={styles.input}
            placeholder="Search for users"
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <Spacer orientation="horizontal" />
          <Icon variant="search" size="medium" />
        </View>
        <Spacer />

        {results?.length === 0 && searchValue ? (
          <View style={styles.noResultContainer}>
            <Spacer spacing="large" />
            <Text>No result</Text>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            <FlatList
              keyExtractor={(item, index) => item.id}
              onEndReached={fetchNewResults}
              showsVerticalScrollIndicator={false}
              data={results}
              renderItem={({ item }) => (
                <UserListItem
                  title={item.username}
                  image={item.profileImage}
                  onPress={() =>
                    navigation.navigate(PROFILE_STACK, {
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
    alignItems: 'center'
  }
});
export default SearchScreen;
