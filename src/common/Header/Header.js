import PropTypes from 'prop-types';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Touchable,
  View,
  ViewPropTypes
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { ConditionalWrapper, IconButton, Spacer, Text } from '../';
import { SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';

const Header = ({
  leftItems,
  rightItems,
  header,
  style,
  headerTextStyle,
  showGradient,
  headerOnClick
}) => {
  const { theme } = useTheme();
  const renderAllItems = (directionOfItems) =>
    directionOfItems?.map((item, index) => {
      if (item.icon) {
        return (
          <>
            {directionOfItems === rightItems && index !== 0 && (
              <Spacer orientation="horizontal" spacing="medium" />
            )}
            <IconButton
              key={item.icon}
              clickable={false}
              style={[styles.iconButton, item.buttonStyle]}
              {...item}
            />
            {directionOfItems === leftItems &&
              index !== directionOfItems.length - 1 && (
                <Spacer orientation="horizontal" spacing="medium" />
              )}
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
    <>
      {showGradient && (
        <LinearGradient
          pointerEvents="none"
          style={styles.gradient}
          colors={['rgba(0, 0, 0, 0.4)', '#00000000']}
        />
      )}

      <View style={[styles.container(theme), style]}>
        <View style={styles.centerContainer}>
          <View style={styles.leftContainer}>{renderAllItems(leftItems)}</View>
          {header && (
            <>
              <Spacer spacing="medium" orientation="horizontal" />
              <TouchableWithoutFeedback onPress={headerOnClick}>
                <Text type="header" style={[styles.header, headerTextStyle]}>
                  {header}
                </Text>
              </TouchableWithoutFeedback>
            </>
          )}
        </View>
        <View style={styles.rightContainer}>{renderAllItems(rightItems)}</View>
      </View>
    </>
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
    marginTop: Platform.OS === 'ios' ? SPACING.medium + 20 : 0,
    paddingHorizontal: SPACING.medium,
    flexDirection: 'row',
    width: '100%',
    zIndex: 1000
  }),
  gradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 300,
    zIndex: 101
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    position: 'relative',
    top: 2
  },

  iconButton: {
    marginVertical: SPACING.medium
  }
});

export default Header;
