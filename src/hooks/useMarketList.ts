import {useReducer} from 'react';
import uuid from 'react-native-uuid';
import SInfo from 'react-native-sensitive-info';

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

interface IReducerActions {
  addItem(item: DataProps, state: DataProps[]): DataProps[];
  checkItem(item: DataProps, state: DataProps[]): DataProps[];
  removeItem(item: DataProps, state: DataProps[]): DataProps[];
}

class ReducerActions implements IReducerActions {
  // Declaring Methods
  addItem(_item: DataProps, _state: DataProps[]): DataProps[] {
    throw new Error('Method not implemented.');
  }
  checkItem(_item: DataProps, _state: DataProps[]): DataProps[] {
    throw new Error('Method not implemented.');
  }
  removeItem(_item: DataProps, _state: DataProps[]): DataProps[] {
    throw new Error('Method not implemented.');
  }

  // Implementing Methods
  public static addItem(item: DataProps, state: DataProps[]): DataProps[] {
    return [...state, item];
  }
  public static checkItem(item: DataProps, state: DataProps[]): DataProps[] {
    return state.map(itm => {
      if (itm.id === item.id) {
        return {...itm, check: !itm.check};
      } else {
        return itm;
      }
    });
  }
  public static removeItem(item: DataProps, state: DataProps[]): DataProps[] {
    return state.filter(itm => {
      return itm.id !== item.id;
    });
  }
}

const initialState: any[] = [];

const reducer = (state: DataProps[], action: IAction) => {
  switch (action.type) {
    case ActionsEnum.ADD:
      return ReducerActions.addItem(action.item, state);
    case ActionsEnum.CHECK:
      return ReducerActions.checkItem(action.item, state);
    case ActionsEnum.REMOVE:
      return ReducerActions.removeItem(action.item, state);
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
