import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const D = ({ navigation }) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('E')}>
    <Text>Eへ</Text>
  </TouchableOpacity>
);

D.navigationOptions = { title: 'D' };

export default D;
