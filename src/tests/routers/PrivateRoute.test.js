import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../routers/PrivateRoute';

describe('tests on the <PrivateRoute /> component', () => {
  const props = {
    location: {
      pathname: '/dc',
    },
  };

  Storage.prototype.setItem = jest.fn();

  test('should display the component if it is authenticated and save the last path in the localstorage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <p>component</p>}
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find('p').exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/dc');
  });
  test('should block the component if it is not authenticated', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <p>component</p>}
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find('p').exists()).toBe(false);
  });
});
