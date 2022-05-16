import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import S from './styles';
import useMarketList from '../../hooks/useMarketList';

export function Main() {
  const [product, setProduct] = useState<string>('');
  const [state, addItem, checkItem, removeItem, rescueItems] = useMarketList();

  useEffect(() => {
    rescueItems();
  }, []);

  return (
    <View style={S.container}>
      <View style={S.inputContainer}>
        <TextInput
          testID="input"
          value={product}
          onChangeText={setProduct}
          placeholder="Adicionar produto"
          style={S.input}
        />
        <TouchableOpacity
          testID="plus-button"
          style={S.addButton}
          onPress={async () => {
            addItem(product);
            setProduct('');
          }}>
          <Text style={S.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={state}
          renderItem={({item}) => (
            <View style={S.itemsContainer}>
              <TouchableOpacity onPress={() => checkItem(item)}>
                <Text style={[S.listItem, item.check && S.listItemChecked]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeItem(item)}
                style={S.removeItem}>
                <Text style={S.removeItemText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
