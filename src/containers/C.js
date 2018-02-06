import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Timer from '../utils/DeepSleepTimer';
// import Timer from '../utils/Timer';

const timeout = 10000;

class C extends Component {
  constructor(props) {
    super(props);
    this.Timer = new Timer(this.onTimeout, timeout);
  }

  componentWillMount() {
    this.Timer.start(this.onStart);
  }

  onStart = () => {
    alert('start');
    this.props.navigation.setParams({ clearTimer: () => this.Timer.clear(this.onClear) });
  };

  onClear = () => alert('clear');

  onTimeout = () =>
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'A' })],
    }));

  onPress = () => {
    this.Timer.clear(this.onClear);
    this.props.navigation.navigate('D', { startTimer: () => this.Timer.start(this.onStart) });
  };

  render() {
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={this.onPress}>
        <Text>Dへ</Text>
      </TouchableOpacity>
    );
  }
}

C.navigationOptions = { title: 'C' };

export default C;
