import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Main} from '../../screens/Main';

describe(':::::Main screen:::::', () => {
  it('Input exists', () => {
    const {getByTestId} = render(<Main />);
    const inputElemente = getByTestId('input');
    expect(inputElemente).toBeTruthy();
  });

  it('Should render new task', async () => {
    const {getByTestId, getByText} = render(<Main />);
    const inputElemente = getByTestId('input');
    const plusButtonElement = getByTestId('plus-button');

    await fireEvent.changeText(inputElemente, 'React Native');
    await fireEvent.press(plusButtonElement);
    const reactNativeText = await getByText('React Native');

    expect(reactNativeText).toBeTruthy();
  });
});
