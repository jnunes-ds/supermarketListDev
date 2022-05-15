import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import S from './styles';

export function Main() {
  return (
    <View>
      <View style={S.inputContainer}>
        <TextInput placeholder="Adicionar produto" style={S.input} />
        <TouchableOpacity style={S.addButton}>
          <Text style={S.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View />
    </View>
  );
}
