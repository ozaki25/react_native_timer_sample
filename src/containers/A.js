import React, { Component } from 'react';
import { AppState, Text, TouchableOpacity } from 'react-native';
import Timer from '../utils/Timer';

const timeout = 60000;

class A extends Component {
  constructor(props) {
    super(props);
    this.appState = AppState.currentState;
    this.timer = new Timer(this.onTimeout, timeout);
    this.state = { timeout: '', forceTimeout: '' };
  }

  componentWillMount() {
    // アプリの foreground or background の変更監視スタート
    AppState.addEventListener('change', this.handleAppStateChange);
    // タイマースタートしつつタイムスタンプを記録
    this.timer.start(this.setStartTime);
  }

  onTimeout = () => this.setState({ timeout: new Date().toLocaleTimeString() });

  onForceTimeout = () => this.setState({ forceTimeout: new Date().toLocaleTimeString() });

  onForeground = () => {
    // 記録しておいたタイムスタンプと比較して、タイムアウトしてるべく時刻なら強制タイムアウト
    if (this.isTimeout()) {
      // this.timer.clear();
      this.onForceTimeout();
    }
  };

  setStartTime = () => {
    this.startTime = new Date().getTime();
  };

  isTimeout = () => {
    const now = new Date().getTime();
    return now - this.startTime > timeout;
  };

  handleAppStateChange = (nextAppState) => {
    if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
      // background -> foreground の移行の時だけ処理を実行
      this.onForeground();
    }
    this.appState = nextAppState;
  };

  render() {
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('B')}>
        <Text>Bへ</Text>
        <Text>StartTime: {new Date(this.startTime).toLocaleTimeString()}</Text>
        <Text>Timeout: {this.state.timeout}</Text>
        <Text>ForceTimeout: {this.state.forceTimeout}</Text>
      </TouchableOpacity>
    );
  }
}

A.navigationOptions = { title: 'A' };

export default A;
