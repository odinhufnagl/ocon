import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createFollowing, deleteFollowings } from '../../api/graphql/requests';
import { Button } from '../../common';

import { DIMENS, SPACING } from '../../constants';

const FollowButton = ({
  style,
  isAlreadyFollowing,
  followerId,
  followedUserId,
  setFollowersCount
}) => {
  const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing);

  const handleDeleteFollowing = async () => {
    const res = await deleteFollowings(followedUserId, followerId);
    if (!res) {
      console.log('deletion went wrong');
    }
    setIsFollowing((prev) => !prev);
    setFollowersCount((prev) => prev - 1);
  };
  const handleCreateFollowing = async () => {
    const res = await createFollowing({
      followedId: followedUserId,
      followerId
    });
    if (!res) {
      console.log('couldnt follow');
    }
    setIsFollowing((prev) => !prev);
    setFollowersCount((prev) => prev + 1);
  };
  const handlePress = async () => {
    if (isFollowing) {
      await handleDeleteFollowing();
      return;
    }
    await handleCreateFollowing();
  };
  const getTitle = () => (isFollowing ? 'Following' : 'Follow');
  const getIcon = () => (isFollowing ? 'userCheck' : 'userAdd');
  const getButtonVariant = () => isFollowing && 'secondary';
  return (
    <View>
      <Button
        variant={getButtonVariant()}
        onPress={handlePress}
        title={getTitle()}
        style={styles.container}
        icon={getIcon()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: SPACING.medium }
});
export default FollowButton;
