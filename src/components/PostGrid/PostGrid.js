import React from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Icon, Spacer, Text } from '../../common';
import { DIMENS, SPACING } from '../../constants';
import { translate } from '../../i18n';
import PostCard from '../PostCard/PostCard';

const WINDOW_WIDTH = Dimensions.get('window').width;

const PostGrid = ({ data, onPostPress }) => {
  if (data.length === 0 || (data.length === 1 && data[0].length === 0)) {
    return (
      <View style={styles.noImagesContainer}>
        <View style={styles.noImagesIconContainer}>
          <Icon variant="image" size="extraLarge" />
        </View>
        <Spacer />
        <Text style={{ color: 'white' }}>
          {translate('profileScreen.emptyImageList')}
        </Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {data.map((item) => {
        if (typeof item === 'string') {
          return (
            <>
              <Text type="small" bold style={styles.text}>
                {item}
              </Text>
              <Spacer spacing="small" />
            </>
          );
        }
        const items = [...item];
        if (items.length > 0) {
          return (
            <>
              <FlatList
                keyExtractor={(item, index) => item.id}
                data={items}
                style={{ marginHorizontal: (SPACING.tiny * 3) / 2 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <PostCard
                    onPress={onPostPress}
                    post={item}
                    type="small"
                    style={{
                      marginHorizontal: (SPACING.tiny * 3) / 2,
                      marginBottom: SPACING.tiny * 3,
                      // flex: 1
                      width: WINDOW_WIDTH / 3 - SPACING.tiny * 4
                    }}
                  />
                )}
                numColumns={3}
              />
              <Spacer spacing="medium" />
            </>
          );
        }
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noImagesContainer: {
    ...DIMENS.common.centering,
    flex: 1,
    width: '100%'
  },
  noImagesIconContainer: {
    borderRadius: 200,
    padding: SPACING.medium,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white'
  },
  text: { marginHorizontal: SPACING.tiny * 3 }
});

export default PostGrid;
