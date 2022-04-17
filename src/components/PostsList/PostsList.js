import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { LoadingContainer, Post } from '..';

const PostsList = ({
  data,
  onViewableItemsChanged = () => {},
  initialScrollIndex,
  showPlace
}) => {
  if (!data) {
    return <LoadingContainer />;
  }
  const [layoutHeight, setLayoutHeight] = useState(
    Dimensions.get('window').height
  );

  if (!layoutHeight) {
    return <View></View>;
  }

  const _onViewableItemsChanged = useRef((item) => {
    onViewableItemsChanged(item);
  });

  if (data.length === 0) {
    return <View></View>;
  }

  const getItemLayout = (data, index) => ({
    length: layoutHeight,
    offset: layoutHeight * index,
    index
  });

  return (
    <FlatList
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
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
    />
  );
};

export default PostsList;
