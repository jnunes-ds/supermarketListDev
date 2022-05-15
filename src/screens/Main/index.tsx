import React, {useState, useReducer} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import S from './styles';
import uuid from 'react-native-uuid';

interface DataProps {
  id: string;
  title: string;
  check: boolean;
}

enum ActionsEnum {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  CHECK = 'CHECK',
}

interface IAction {
  type: ActionsEnum;
  item: DataProps;
}

export function Main() {
  const [product, setProduct] = useState<string>('');
  const initialState: any[] = [];

  const reducer = (state: DataProps[], action: IAction) => {
    switch (action.type) {
      case ActionsEnum.ADD:
        return [...state, action.item];
      case ActionsEnum.CHECK:
        return state.map(item => {
          if (item.id === action.item.id) {
            return {...item, check: !item.check};
          } else {
            return item;
          }
        });
      case ActionsEnum.REMOVE:
        return state.filter(item => {
          return item.id !== action.item.id;
        });
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={S.container}>
      <View style={S.inputContainer}>
        <TextInput
          value={product}
          onChangeText={setProduct}
          placeholder="Adicionar produto"
          style={S.input}
        />
        <TouchableOpacity
          style={S.addButton}
          onPress={async () => {
            const newId = await uuid.v4(product);
            try {
              dispatch({
                type: ActionsEnum.ADD,
                item: {
                  id: newId as string,
                  title: product,
                  check: false,
                },
              });
              setProduct('');
            } catch (error) {
              console.error(error);
            }
          }}>
          <Text style={S.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={state}
          renderItem={({item}) => (
            <View style={S.itemsContainer}>
              <TouchableOpacity
                onPress={() => {
                  dispatch({type: ActionsEnum.CHECK, item});
                }}>
                <Text style={[S.listItem, item.check && S.listItemChecked]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch({type: ActionsEnum.REMOVE, item});
                }}
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
