import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const A = ({ navigation }) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('B')}>
    <Text>Bへ</Text>
  </TouchableOpacity>
);

A.navigationOptions = { title: 'A' };

export default A;
