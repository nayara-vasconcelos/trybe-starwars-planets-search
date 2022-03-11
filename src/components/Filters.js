import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const COLUMN_ENTRIES_INITIAL_STATE = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const Filters = () => {
  const {
    setNameFilter, columnEntries, setColumnEntries, setNumericFilter, numericFilter,
  } = useContext(PlanetsContext);
  const [inputName, setInputName] = useState('');
  const [column, setColumn] = useState(columnEntries[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  useEffect(() => { setNameFilter({ filterByName: { name: inputName } }); },
    [inputName, setNameFilter]);

  useEffect(() => { setColumn(columnEntries[0]); }, [columnEntries]);

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
    const newObj = { column, comparison, value };
    setNumericFilter((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, newObj],
    }));
    // console.log(column);
    setColumnEntries(columnEntries.filter((entry) => entry !== column));
    setValue('0');
  };

  const handleRemoveFilter = ({ target }) => {
    const filters = numericFilter.filterByNumericValues;
    const newNumericFilter = filters
      .filter((filter) => filter.column !== target.name);
    setNumericFilter({ filterByNumericValues: newNumericFilter });
    setColumnEntries((prevState) => [...prevState, target.name]);
  };

  const handleRemoveAllFilters = () => {
    if (numericFilter.filterByNumericValues.length > 0) {
      setNumericFilter({ filterByNumericValues: [] });
      setColumnEntries(COLUMN_ENTRIES_INITIAL_STATE);
    }
  };

  const renderFiltersList = () => {
    const filters = numericFilter.filterByNumericValues;
    const filtersList = filters.map((filter, index) => (
      <span data-testid="filter" key={ `${filter.column}${index}` }>
        { /* const { column, comparison, value } = filter */ }
        { `${Object.values(filter).toString().replace(/,/g, ' ')}` }
        <button
          type="button"
          name={ `${filter.column}` }
          value={ index }
          onClick={ handleRemoveFilter }
        >
          X
        </button>
      </span>
    ));

    return filtersList;
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
        { (numericFilter.filterByNumericValues.length > 0) && renderFiltersList()}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemoveAllFilters }
        >
          REMOVER FILTROS
        </button>
      </section>
    </section>
  );
};

export default Filters;
