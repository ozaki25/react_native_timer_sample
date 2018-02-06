import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const goBack = (navigation) => {
  const { state } = navigation;
  if (state.params && state.params.clearTimer) state.params.clearTimer();
  if (state.params && state.params.startTimer) state.params.startTimer();
  navigation.goBack();
};

const NavigationBack = ({ navigation }) => (
  <TouchableOpacity onPress={() => goBack(navigation)}>
    <Text>戻る</Text>
  </TouchableOpacity>
);

export default NavigationBack;
