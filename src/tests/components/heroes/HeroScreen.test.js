import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('test on the <HeroScreen /> component', () => {
  const historyMock = {
    length: 10,
    push: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  };

  test('should display the redirect component if there are no arguments in the URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );
    expect(wrapper.find('Redirect').exists()).toBe(true);
  });
  test('should display the hero information if the parameter exists', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/dc-batman']}>
        <Route path="/hero/:heroId" component={HeroScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find('.row').exists()).toBe(true);
  });
  test('should return to the previous Screen with push function', () => {
    const historyMock = {
      length: 1,
      push: jest.fn(),
      replace: jest.fn(),
      goBack: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/dc-batman']}>
        <Route
          path="/hero/:heroId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    wrapper.find('button').prop('onClick')();
    expect(historyMock.push).toHaveBeenCalled();
    expect(historyMock.goBack).not.toHaveBeenCalled();
  });
  test('should return to the previous Screen with goBack function', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/dc-batman']}>
        <Route
          path="/hero/:heroId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    wrapper.find('button').prop('onClick')();
    expect(historyMock.push).not.toHaveBeenCalled();
    expect(historyMock.goBack).toHaveBeenCalled();
  });
});
