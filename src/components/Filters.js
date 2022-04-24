import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const COLUMN_ENTRIES_INITIAL_STATE = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const Filters = () => {
  const {
    setNameFilter,
    columnEntries,
    setColumnEntries,
    setNumericFilter,
    numericFilter,
    setOrder,
    order,
  } = useContext(PlanetsContext);
  const [inputName, setInputName] = useState('');
  const [column, setColumn] = useState(columnEntries[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [orderOption, setOrderOption] = useState('population');
  const [orderType, setOrderType] = useState('ASC');

  useEffect(() => {
    if (inputName.length > 0 && order.initial !== 'name') {
      setOrder((prevState) => ({ ...prevState, initial: 'name' }));
    }
    setNameFilter({ filterByName: { name: inputName } });
  }, [inputName, setNameFilter, order, setOrder]);

  useEffect(() => { setColumn(columnEntries[0]); }, [columnEntries]);

  const renderColumnSelect = (name, testId, selectValue, callback) => {
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
        { name.toUpperCase() }
        <select
          name={ name }
          id={ testId }
          data-testid={ testId }
          value={ selectValue }
          onChange={ (e) => callback(e.target.value) }
        >
          { options }
        </select>
      </label>
    );
  };

  const handleFilterBtn = () => {
    const newObj = { column, comparison, value };
    if (inputName.length > 0) { setInputName(''); }
    setNumericFilter((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, newObj],
    }));

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

  const handleOrderBtn = () => {
    setOrder((prevState) => (
      { ...prevState, column: orderOption, sort: orderType, initial: '' }
    ));
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
        { renderColumnSelect('coluna', 'column-filter', column, setColumn) }
        <label htmlFor="comparison-filter">
          OPERADOR
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
      <section>
        { renderColumnSelect('ordenar', 'column-sort', orderOption, setOrderOption) }
        <label htmlFor="column-sort-input-asc">
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            id="column-sort-input-asc"
            name="order-input"
            value="ASC"
            onChange={ (e) => setOrderType(e.target.value) }
          />
          ASCENDENTE
        </label>
        <label htmlFor="column-sort-input-desc">
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            id="column-sort-input-desc"
            name="order-input"
            value="DESC"
            onChange={ (e) => setOrderType(e.target.value) }
          />
          DESCENDENTE
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleOrderBtn }
        >
          ORDENAR
        </button>
      </section>
    </section>
  );
};

export default Filters;
