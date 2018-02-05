import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Timer from '../utils/Timer';

const timeout = 10000; // 10s

class A extends Component {
  componentWillMount() {
    this.timer = new Timer(this.onTimeout, timeout);
    this.timer.start();
  }

  onTimeout = () => {
    alert('Timeout!');
  };

  render() {
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('B')}>
        <Text>Bへ</Text>
      </TouchableOpacity>
    );
  }
}

A.navigationOptions = { title: 'A' };

export default A;
