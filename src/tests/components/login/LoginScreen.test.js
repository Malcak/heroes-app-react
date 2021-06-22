import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('test on the <LoginScreen /> component', () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'fernando',
    },
  };
  const historyMock = {
    replace: jest.fn(),
  };
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );

  test('should display the component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should call the dispatch function and perform the navigation', () => {
    const handleClick = wrapper.find('button').prop('onClick');
    handleClick();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: 'fernando' },
    });
    expect(historyMock.replace).toHaveBeenCalledWith('/');

    localStorage.setItem('lastPath', '/dc');
    handleClick();

    expect(historyMock.replace).toHaveBeenCalledWith('/dc');
  });
});
