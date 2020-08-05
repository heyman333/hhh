import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { ScrollContext } from '../App';

const HomeScreen: React.SFC<StackScreenProps<RootStackParamList, 'Home'>> = ({
  navigation,
}) => {
  const { setScrollPosition } = React.useContext(ScrollContext);
  // const [offset, setOffset] = React.useState(0);

  const setScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    // const dif = currentOffset - offset;
    setScrollPosition(currentOffset);
    // if (dif > 0) {
    // } else {
    //   setScrollPosition(e.nativeEvent.contentOffset.y - 350);
    // }
    // setOffset(currentOffset);
  };

  return (
    <SafeAreaView>
      <ScrollView
        onScroll={setScroll}
        scrollEventThrottle={1}
        onMomentumScrollEnd={() => {
          setTimeout(() => {
            setScrollPosition(0);
          }, 0);
        }}
        // onScrollAnimationEnd={() => {
        //   setTimeout(() => {
        //     setScrollPosition(0);
        //   }, 10);
        // }}
        onScrollEndDrag={() => {
          setTimeout(() => {
            setScrollPosition(0);
          }, 0);
        }}>
        <Text style={{ fontSize: 50 }}>또리또리</Text>
        <Text style={{ fontSize: 150 }}>또리또리</Text>
        <Text style={{ fontSize: 150 }}>또리또리</Text>
        <Text style={{ fontSize: 170 }}>또리또리</Text>
        <Text style={{ fontSize: 170 }}>또리또리</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
