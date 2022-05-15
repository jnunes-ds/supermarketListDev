import {useReducer} from 'react';
import uuid from 'react-native-uuid';

export interface DataProps {
  id: string;
  title: string;
  check: boolean;
}

export enum ActionsEnum {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  CHECK = 'CHECK',
}

export interface IAction {
  type: ActionsEnum;
  item: DataProps;
}

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

function useMarketList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = async (title: string) => {
    const newId = uuid.v4(title);
    dispatch({
      type: ActionsEnum.ADD,
      item: {
        id: newId as string,
        title,
        check: false,
      },
    });
  };

  const checkItem = (item: DataProps) => {
    dispatch({
      type: ActionsEnum.CHECK,
      item,
    });
  };

  const removeItem = (item: DataProps) => {
    dispatch({
      type: ActionsEnum.REMOVE,
      item,
    });
  };

  return [state, addItem, checkItem, removeItem];
}

export default useMarketList;
