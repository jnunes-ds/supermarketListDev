import React, {useState, useReducer} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import S from './styles';

interface DataProps {
  id: string;
  title: string;
  check: boolean;
}

type ActionType = 'ADD';

interface IAction {
  type: ActionType;
  item: DataProps;
}

export function Main() {
  const [item, setItem] = useState<string>('');
  const initialState: any[] = [];

  const reducer = (state: DataProps[], action: IAction) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.item];
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={S.container}>
      <View style={S.inputContainer}>
        <TextInput
          value={item}
          onChangeText={setItem}
          placeholder="Adicionar produto"
          style={S.input}
        />
        <TouchableOpacity
          style={S.addButton}
          onPress={() =>
            dispatch({
              type: 'ADD',
              item: {
                id: '1',
                title: item,
                check: false,
              },
            })
          }>
          <Text style={S.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={state}
          renderItem={({item}) => <Text style={S.listItem}>{item.title}</Text>}
        />
      </View>
    </View>
  );
}
