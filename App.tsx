import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';

function App(): React.JSX.Element {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomTabNavigation />
    </SafeAreaView>
  );
}

export default App;
