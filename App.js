import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import AppNavigator, { onNavigationStateChange } from './src/navigators/AppNavigator';

class App extends Component {
  componentWillMount() {
    Orientation.lockToPortrait();
  }

  render() {
    return <AppNavigator onNavigationStateChange={onNavigationStateChange} />;
  }
}

export default App;
