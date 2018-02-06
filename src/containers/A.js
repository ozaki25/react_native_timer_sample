import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Timer from '../utils/Timer';
import DeepSleepTimer from '../utils/DeepSleepTimer';

const timeout = 20000;

class A extends Component {
  constructor(props) {
    super(props);
    this.timer = new Timer(this.onTimeout, timeout);
    this.deepSleepTimer = new DeepSleepTimer(this.onForceTimeout, timeout);
    this.state = { startTime: '', timeout: '', forceTimeout: '' };
  }

  componentWillMount() {
    this.timer.start(this.onStart);
    this.deepSleepTimer.start(this.onStart);
  }

  onStart = () => this.setState({ startTime: new Date().toLocaleTimeString() });

  onTimeout = () => this.setState({ timeout: new Date().toLocaleTimeString() });

  onForceTimeout = () => this.setState({ forceTimeout: new Date().toLocaleTimeString() });

  onPress = () => {
    this.timer.clear();
    this.deepSleepTimer.clear();
    this.props.navigation.navigate('B');
  };

  render() {
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={this.onPress}>
        <Text>Bへ</Text>
        <Text>StartTime: {this.state.startTime}</Text>
        <Text>Timeout: {this.state.timeout}</Text>
        <Text>ForceTimeout: {this.state.forceTimeout}</Text>
      </TouchableOpacity>
    );
  }
}

A.navigationOptions = { title: 'A' };

export default A;
