import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const B = ({ navigation }) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('C')}>
    <Text>Cへ</Text>
  </TouchableOpacity>
);

B.navigationOptions = { title: 'B' };

export default B;
