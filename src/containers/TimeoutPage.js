import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class TimeoutPage extends Component {
  constructor(props) {
    super(props);
    //
  }

  componentWillMount() {
    //
  }

  render() {
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.goBack('A')}>
        <Text>タイムアウト</Text>
      </TouchableOpacity>
    );
  }
}

TimeoutPage.navigationOptions = { header: null };

export default TimeoutPage;
