import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import PropTypes from 'prop-types';

const Filters = () => {
  const { setNameFilter, columnEntries, setNumericFilter } = useContext(PlanetsContext);
  const [inputName, setInputName] = useState('');
  const [column, setColumn] = useState(columnEntries[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  useEffect(() => { setNameFilter({ filterByName: { name: inputName } }); },
    [inputName, setNameFilter]);

  const renderColumnSelect = () => {
    const options = columnEntries.map((entry) => (
      <option
        key={ entry }
        value={ entry }
      >
        { entry }
      </option>
    ));

    return (
      <label htmlFor="column-filter">
        Coluna
        <select
          name="coluna"
          id="column-filter"
          data-testid="column-filter"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          { options }
        </select>
      </label>
    );
  };

  const handleFilterBtn = () => {
    const numericFilter = { column, comparison, value };
    // console.log(numericFilter);
    setNumericFilter((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, numericFilter],
    }));
  };

  return (
    <section>
      <section>
        <label htmlFor="name-filter">
          <input
            type="text"
            data-testid="name-filter"
            value={ inputName }
            onChange={ (e) => setInputName(e.target.value) }
          />
        </label>
      </section>
      <section>
        { renderColumnSelect() }
        <label htmlFor="comparison-filter">
          Operador
          <select
            name="operador"
            id="comparison-filter"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ (e) => setComparison(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            type="number"
            data-testid="value-filter"
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterBtn }
        >
          FILTRAR
        </button>
      </section>
    </section>
  );
};

// Filters.propTypes = {};

export default Filters;
