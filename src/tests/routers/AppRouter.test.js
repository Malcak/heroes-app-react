import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { AppRouter } from '../../routers/AppRouter';

describe('test on the <AppRouter /> component', () => {
  const contextValue = {
    dispath: jest.fn(),
    user: {
      logged: false,
    },
  };

  test('should display the loginScreen if not authenticated', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('should display the <DCScreen /> if it is authenticated', () => {
    const contextValue = {
      dispath: jest.fn(),
      user: {
        logged: true,
        name: 'fernando',
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper.find('.navbar').exists()).toBe(true);
  });
});
