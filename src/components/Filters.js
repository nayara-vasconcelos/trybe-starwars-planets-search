import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import PropTypes from 'prop-types';

const Filters = () => {
  const [inputName, setInputName] = useState('');
  const { setNameFilter } = useContext(PlanetsContext);

  useEffect(() => { setNameFilter({ filterByName: { name: inputName } }); },
    [inputName, setNameFilter]);

  return (
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
  );
};

// Filters.propTypes = {};

export default Filters;
