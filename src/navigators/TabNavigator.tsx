import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { MainStack } from '@src/navigators';
import { MapScreen } from '@src/screens';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { ScrollContext } from '../App';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomTabBar = (
  { state, descriptors, navigation }: BottomTabBarProps,
  scrollPosition: number,
) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const AnimatedBottom = new Animated.Value(scrollPosition);

  const bottom = AnimatedBottom.interpolate({
    inputRange: [-100, 0, 150],
    outputRange: [getBottomSpace(), getBottomSpace(), -getBottomSpace() + 20],
    extrapolate: 'clamp',
  });

  const opacity = AnimatedBottom.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
  });

  return (
    <Animated.View style={[styles.tabbar, { bottom, opacity }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.button}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Text>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const { scrollPosition } = React.useContext(ScrollContext);

  return (
    <Tab.Navigator
      tabBar={(originProp) => CustomTabBar(originProp, scrollPosition)}>
      <Tab.Screen name="List" component={MainStack} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    width: SCREEN_WIDTH - 32,
    height: getBottomSpace() + 44,
    flexDirection: 'row',
    right: 16,
    left: 16,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: (getBottomSpace() + 44) / 2,
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
