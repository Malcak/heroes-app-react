import { types } from '../../types/types';
import { authReducer } from '../../auth/authReducer';

describe('test on authReducer', () => {
  const loggedState = {
    name: 'fernando',
    logged: true,
  };
  const unloggedState = {
    logged: false,
  };
  test('should return the default state', () => {
    const state = authReducer(unloggedState, {});
    expect(state).toEqual(unloggedState);
  });
  test('should authenticate and set the user name', () => {
    const state = authReducer(unloggedState, {
      type: types.login,
      payload: { name: 'fernando' },
    });
    expect(state).toEqual(loggedState);
  });
  test('should delete the user name and log out', () => {
    const state = authReducer(loggedState, {
      type: types.logout,
    });
    expect(state).toEqual(unloggedState);
  });
});
