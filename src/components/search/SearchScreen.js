import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);
  const [formValues, handleInputChange] = useForm({
    searchedHero: q,
  });
  const { searchedHero } = formValues;
  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?q=${searchedHero}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-4">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="searchedHero"
              value={searchedHero}
              placeholder="your hero..."
              autoComplete="off"
              className="form-control"
              onChange={handleInputChange}
            />
            <div className="d-grid gap-1">
              <button type="submit" className="btn btn-primary mt-2">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="col-8 animate__animated animate__fadeIn">
          <h4>Results</h4>
          <hr />
          {heroesFiltered.length === 0 && (
            <div className="alert alert-info">No hero found</div>
          )}
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
