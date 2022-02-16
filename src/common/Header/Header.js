import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, View, ViewPropTypes } from 'react-native';
import { IconButton, Spacer, Text } from '../';
import { SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';

const Header = ({ leftItems, rightItems, header, style, headerTextStyle }) => {
  const { theme } = useTheme();
  const renderAllItems = (directionOfItems) =>
    directionOfItems?.map((item) => {
      if (item.icon) {
        return (
          <>
            <Spacer orientation="horizontal" />
            <IconButton
              key={item.icon}
              clickable={false}
              style={[
                styles.iconButton,
                item.buttonStyle,
                directionOfItems === leftItems
                  ? styles.iconButtonsLeft
                  : styles.iconButtonsRight
              ]}
              {...item}
            />
          </>
        );
      }
      if (item.title) {
        return (
          <>
            <Text {...item}>{item.title}</Text>
          </>
        );
      }
    });

  return (
    <View style={[styles.container(theme), style]}>
      <View style={styles.centerContainer}>
        <View style={styles.leftContainer}>{renderAllItems(leftItems)}</View>
        {header && (
          <>
            <Spacer spacing="medium" orientation="horizontal" />
            <Text type="header" style={[styles.header, headerTextStyle]}>
              {header}
            </Text>
          </>
        )}
      </View>
      <View style={styles.rightContainer}>{renderAllItems(rightItems)}</View>
    </View>
  );
};

const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    icon: PropTypes.string,
    onPress: PropTypes.func,
    color: PropTypes.string,
    title: PropTypes.string,
    showDot: PropTypes.bool,
    variant: PropTypes.oneOf(['flatten']),
    tooltipItems: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string,
        onPress: PropTypes.func
      })
    ),
    iconSize: PropTypes.string
  }),
  PropTypes.shape({
    buttonTitle: PropTypes.string,
    buttonVariant: PropTypes.oneOf(['secondary', 'third', 'fourth']),
    buttonStyle: ViewPropTypes.style
  })
);

Header.propTypes = {
  leftItems: itemsPropType,
  rightItems: itemsPropType,
  style: ViewPropTypes.style
};

const styles = StyleSheet.create({
  container: (theme) => ({
    marginTop: Platform.OS === 'ios' ? SPACING.extraLarge + 20 : 0,
    paddingHorizontal: SPACING.medium,
    flexDirection: 'row',
    width: '100%'
  }),
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    position: 'relative',
    top: 2
  },
  iconButtonsLeft: {},
  iconButtonsRight: {},
  iconButton: {
    marginVertical: SPACING.medium
  }
});

export default Header;
