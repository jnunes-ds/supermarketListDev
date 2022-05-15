import {Platform, StyleSheet} from 'react-native';
import Colors from '../../styles/colors';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 7,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
    marginTop: Platform.OS === 'ios' ? 100 : 10,
  },
  input: {
    flex: 1,
    width: '80%',
    fontSize: 30,
    color: Colors.carbonDark,
  },
  addButton: {
    marginHorizontal: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    textAlign: 'left',
    color: Colors.danger,
    fontSize: 60,
  },
  listItem: {
    fontSize: 22,
    marginVertical: 3,
    padding: 10,
  },
  listItemChecked: {
    textDecorationLine: 'line-through',
  },
  itemsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  removeItemText: {
    fontSize: 12,
    color: Colors.danger,
  },
});

export default Style;
