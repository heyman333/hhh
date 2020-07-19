import React from 'react';
import { View, Text, Button } from 'react-native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { MapScreen } from '@src/screens';

const HomeScreen: React.SFC<StackScreenProps<RootStackParamList, 'Home'>> = ({
  navigation,
}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Map')} title="맵으로 이동" />
    </View>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;
