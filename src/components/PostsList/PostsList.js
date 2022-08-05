import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { LoadingContainer, Post } from '..';
import { Text } from '../../common';
import { DIMENS } from '../../constants';
import { translate } from '../../i18n';

const PostsList = React.forwardRef(
  (
    {
      data,
      onViewableItemsChanged = () => {},
      initialScrollIndex,
      showPlace,
      onRefresh: onRefreshCallback,
      loading,
      onEndReached
    },
    ref
  ) => {
    const [refreshing, setRefreshing] = useState(false);
    const [layoutHeight, setLayoutHeight] = useState(
      Dimensions.get('window').height
    );

    const _onViewableItemsChanged = useRef((item) => {
      onViewableItemsChanged(item);
    });

    const getItemLayout = (data, index) => ({
      length: layoutHeight,
      offset: layoutHeight * index,
      index
    });

    const onRefresh = async () => {
      if (!onRefresh) {
        return;
      }
      setRefreshing(true);
      await onRefreshCallback();
      setRefreshing(false);
    };

    if (!layoutHeight) {
      return <View></View>;
    }

    if (loading) {
      return <LoadingContainer />;
    }

    if (!data) {
      <>Something went wrong</>;
    }

    if (data?.length === 0) {
      return (
        <View style={styles.noImagesContainer}>
          <Text>{translate('postsList.emptyText')}</Text>
        </View>
      );
    }
    return (
      <FlatList
        onEndReached={onEndReached}
        ref={ref}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={(item, index) => item.id}
        onViewableItemsChanged={_onViewableItemsChanged.current}
        onLayout={(e) => {
          setLayoutHeight(e.nativeEvent.layout.height);
        }}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={getItemLayout}
        style={{ flexGrow: 0 }}
        data={data}
        renderItem={({ item, index }) => (
          <View style={{ height: layoutHeight, width: '100%' }}>
            <Post post={item} index={index} showPlace={showPlace} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        pagingEnabled
        initialNumToRender={3}
        windowSize={3}
        maxToRenderPerBatch={3}
        removeClippedSubviews={false}
      />
    );
  }
);

const styles = StyleSheet.create({
  noImagesContainer: {
    width: '100%',
    height: '100%',
    ...DIMENS.common.centering
  }
});

export default PostsList;
