import React from 'react';
import { mount } from 'enzyme';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('test on the <SearchScreen /> component', () => {
  test('should display the component correctly with default values', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('should display a hero and the text box with the value of the queryString', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=Batman']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find('input').prop('value')).toBe('Batman');
    expect(wrapper).toMatchSnapshot();
  });
  test('should display an error if no results are found', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=random']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find('.alert').exists()).toBe(true);
  });
  test('should call the push function of the history', () => {
    const historyMock = {
      push: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=random']}>
        <Route
          path="/search"
          component={() => <SearchScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchedHero',
        value: 'Batman',
      },
    });
    wrapper.find('form').prop('onSubmit')({
      preventDefault() {},
    });
    expect(historyMock.push).toHaveBeenLastCalledWith(`?q=Batman`);
  });
});
