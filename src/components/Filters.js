import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import PropTypes from 'prop-types';

const Filters = () => {
  const [inputName, setInputName] = useState('');
  const { setNameFilter, columnEntries } = useContext(PlanetsContext);
  const [selectColumn, setSelectColumn] = useState(columnEntries[0]);

  useEffect(() => { setNameFilter({ filterByName: { name: inputName } }); },
    [inputName, setNameFilter]);

  const renderColumnSelect = () => {
    const options = columnEntries.map((entry) => (
      <option
        key={ entry }
        value={ entry }
        data-testid={ entry }
      >
        { entry }
      </option>
    ));

    return (
      <label htmlFor="column-filter">
        <select
          id="column-filter"
          data-testid="column-filter"
          value={ selectColumn }
          onChange={ (e) => setSelectColumn(e.target.value) }
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
      </section>
    </section>
  );
};

// Filters.propTypes = {};

export default Filters;
