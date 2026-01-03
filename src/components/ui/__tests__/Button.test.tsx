import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

test('Button renders and responds to press', () => {
  const onPressMock = jest.fn();
  const { getByText } = render(<Button title="Test Button" onPress={onPressMock} />);
  
  const button = getByText('Test Button');
  fireEvent.press(button);
  
  expect(onPressMock).toHaveBeenCalled();
});

test('Button is disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Disabled Button" onPress={onPressMock} disabled />);
    
    const button = getByText('Disabled Button');
    fireEvent.press(button);
    
    expect(onPressMock).not.toHaveBeenCalled();
});
