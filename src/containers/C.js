import React, { Component } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DeepSleepTimer from '../utils/DeepSleepTimer';
import Timer from '../utils/Timer';

const timeout = 10000;

class C extends Component {
  constructor(props) {
    super(props);
    this.Timer =
      Platform.OS === 'ios'
        ? new Timer(this.onTimeout, timeout)
        : new DeepSleepTimer(this.onTimeout, timeout);
  }

  componentWillMount() {
    this.Timer.start(this.onStart);
  }

  onStart = () => {
    alert('start');
    // 前のページに戻った時にここでセットしたclearTimerが実行されてタイマーが止まる
    this.props.navigation.setParams({ clearTimer: () => this.Timer.clear(this.onClear) });
  };

  onClear = () => alert('clear');

  onTimeout = () =>
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'TimeoutPage' })],
    }));

  onPress = () => {
    // 次のページに遷移する前にタイマーを止めておく
    this.Timer.clear(this.onClear);
    // 次のページからこのページへ戻ってきた時にここで渡したstartTimerが実行されタイマーが起動する
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
