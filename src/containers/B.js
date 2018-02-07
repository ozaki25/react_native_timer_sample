import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ConvertLine from '../utils/ConvertLine';
import License from '../constants/OSSLicense';

const B = ({ navigation }) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('C')}>
    <Text>Cへ</Text>
    <Text>{'aaaa\nbbb'}</Text>
    <Text>{ConvertLine(License)}</Text>
  </TouchableOpacity>
);

B.navigationOptions = { title: 'B' };

export default B;
