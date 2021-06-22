import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';
import { Navbar } from '../../../components/ui/Navbar';

describe('test on the <Navbar /> component', () => {
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  };
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'fernando',
    },
  };
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should display the component correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe(
      contextValue.user.name
    );
  });
  test('should call the logout and use history', () => {
    wrapper.find('.btn').prop('onClick')();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout,
    });
    expect(historyMock.replace).toHaveBeenCalledWith('/login');
  });
});
