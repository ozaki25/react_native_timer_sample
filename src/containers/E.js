import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const E = ({ navigation }) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('A')}>
    <Text>Aへ</Text>
  </TouchableOpacity>
);

E.navigationOptions = { title: 'E' };

export default E;
