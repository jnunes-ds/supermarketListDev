import {Platform, StyleSheet} from 'react-native';
import Colors from '../../styles/colors';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
    marginTop: Platform.OS === 'ios' ? 100 : 10,
  },
  input: {
    width: '80%',
    fontSize: 30,
    color: Colors.carbonDark,
  },
  addButton: {
    flex: 1,
    width: '20%',
    marginLeft: 2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    textAlign: 'center',
    color: Colors.danger,
    fontSize: 60,
  },
});

export default Style;
