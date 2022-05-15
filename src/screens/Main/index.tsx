import React from 'react';
import {TextInput, View} from 'react-native';
import S from './styles';

export function Main() {
  return (
    <View>
      <View style={S.inputContainer}>
        <TextInput style={S.input} />
      </View>
      <View />
    </View>
  );
}
