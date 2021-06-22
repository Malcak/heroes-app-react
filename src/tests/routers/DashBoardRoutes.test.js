import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { DashBoardRoutes } from '../../routers/DashBoardRoutes';

describe('test on the <DashBoardRoutes /> component', () => {
  const contextValue = {
    dispath: jest.fn(),
    user: {
      logged: true,
      name: 'fernando',
    },
  };

  test('should display the component correctly', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashBoardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe(
      contextValue.user.name
    );
  });
});
