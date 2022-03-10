import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import PropTypes from 'prop-types';

const Filters = () => {
  const [inputName, setInputName] = useState('');
  const { setNameFilter, columnEntries } = useContext(PlanetsContext);
  const [selectedColumn, setSelectedColumn] = useState(columnEntries[0]);
  const [selectedComparison, setSelectedComparison] = useState('maior que');

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
          value={ selectedColumn }
          onChange={ (e) => setSelectedColumn(e.target.value) }
        >
          { options }
        </select>
      </label>
    );
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
            value={ selectedComparison }
            onChange={ (e) => setSelectedComparison(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
      </section>
    </section>
  );
};

// Filters.propTypes = {};

export default Filters;
