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
  RESCUE = 'RESCUE',
}

export interface IAction {
  type: ActionsEnum;
  item: DataProps;
}

interface IReducerActions {
  addItem(item: DataProps, state: DataProps[]): Promise<DataProps[]>;
  checkItem(item: DataProps, state: DataProps[]): DataProps[];
  removeItem(item: DataProps, state: DataProps[]): DataProps[];
  rescueItems(): Promise<string>;
}

const SaveStateOnDB = async (newState: DataProps[]) => {
  return SInfo.setItem('key1', JSON.stringify(newState), {
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain',
  });
};

class ReducerActions implements IReducerActions {
  // Declaring Methods
  addItem(_item: DataProps, _state: DataProps[]): Promise<DataProps[]> {
    throw new Error('Method not implemented.');
  }
  checkItem(_item: DataProps, _state: DataProps[]): DataProps[] {
    throw new Error('Method not implemented.');
  }
  removeItem(_item: DataProps, _state: DataProps[]): DataProps[] {
    throw new Error('Method not implemented.');
  }
  rescueItems(): Promise<string> {
    throw new Error('Method not implemented.');
  }

  // Implementing Methods
  public static addItem(item: DataProps, state: DataProps[]): DataProps[] {
    const newState = state && state.length ? [...state, item] : [item];
    SaveStateOnDB(newState);
    return newState;
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

  public static async rescueItems(): Promise<string> {
    return await SInfo.getItem('key1', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
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
    case ActionsEnum.RESCUE:
      return ReducerActions.rescueItems();
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

  const rescueItems = () => {
    dispatch({
      type: ActionsEnum.RESCUE,
    });
  };

  return [state, addItem, checkItem, removeItem, rescueItems];
}

export default useMarketList;
