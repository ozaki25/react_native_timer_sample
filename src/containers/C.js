import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const C = ({ navigation }) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('D')}>
    <Text>Dへ</Text>
  </TouchableOpacity>
);

C.navigationOptions = { title: 'C' };

export default C;
