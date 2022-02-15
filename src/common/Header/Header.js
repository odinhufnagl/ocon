import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, View, ViewPropTypes } from 'react-native';
import { IconButton, Spacer, Text } from '../';
import { SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';

const Header = ({ leftItems, rightItems, header, style }) => {
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
    });

  return (
    <View style={[styles.container(theme), style]}>
      <View style={styles.leftContainer}>{renderAllItems(leftItems)}</View>
      {header && <Text type="heading">{header}</Text>}
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
    paddingHorizontal: '5%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: SPACING.large
  }),
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '-10%'
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconButtonsLeft: {},
  iconButtonsRight: {}
});

export default Header;
