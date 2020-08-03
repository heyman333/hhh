import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from '@src/navigators';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Props {
  children?: React.ReactElement;
}

export const ScrollContext = React.createContext({
  scrollPosition: 0,
  setScrollPosition: (position: number) => {},
});

function ScrollProvider(props: Props) {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const value = { scrollPosition, setScrollPosition };

  return (
    <ScrollContext.Provider value={value}>
      {props.children}
    </ScrollContext.Provider>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <ScrollProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ScrollProvider>
    </SafeAreaProvider>
  );
};

export default App;
