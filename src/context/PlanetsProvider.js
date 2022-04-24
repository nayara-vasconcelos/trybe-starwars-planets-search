import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchStarWarsAPI from '../services/getStarWarsAPI';

const COLUMN_ENTRIES_INITIAL_STATE = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const NUMBER_BASE = 10;

const ORDER_INITIAL_STATE = { column: 'population', sort: 'ASC', initial: 'name' };

const sortByKey = (arrayOfObj, key, order) => {
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  const GREATER_THAN = 1;
  const LESS_THAN = -1;
  const EQUAL = 0;
  const knownValues = (key === 'name') ? arrayOfObj : [];
  const unknownValues = [];

  if (key !== 'name') {
    arrayOfObj.forEach((e) => {
      if (e[key].includes('unknown')) {
        unknownValues.push(e);
      } else {
        knownValues.push(e);
      }
    });
  }

  const sortedArray = knownValues.sort((a, b) => {
    const [numberA, numberB] = key === 'name'
      ? [a[key], b[key]]
      : [parseInt(a[key], 10), parseInt(b[key], 10)];

    if (numberA > numberB) {
      return GREATER_THAN;
    }
    if (numberA < numberB) {
      return LESS_THAN;
    }
    return EQUAL;
  });

  if (order === 'DESC') {
    sortedArray.reverse();
  }

  return [...sortedArray, ...unknownValues];
};

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState({ filterByName: { name: '' } });
  const [numericFilter, setNumericFilter] = useState({ filterByNumericValues: [] });
  const [columnEntries, setColumnEntries] = useState(COLUMN_ENTRIES_INITIAL_STATE);
  const [order, setOrder] = useState(ORDER_INITIAL_STATE);
  const [sortedPlanets, setSortedPlanets] = useState([]);

  const verifyElement = (keyValueStr, operator, valueStr) => {
    const keyNumber = parseFloat(keyValueStr, NUMBER_BASE);
    const number = parseFloat(valueStr);

    if (operator === 'maior que') {
      return (keyNumber > number);
    } if (operator === 'menor que') {
      return (keyNumber < number);
    }
    return (keyNumber === number);
  };

  useEffect(() => {
    const getPlanets = async () => {
      setLoading(true);
      const results = await fetchStarWarsAPI();
      if (!Array.isArray(results)) {
        setError(results);
      } else {
        const defaultData = results.map((planet) => {
          // Ref: https://www.w3schools.com/howto/howto_js_remove_property_object.asp
          delete planet.residents;
          return planet;
        });
        const sortedData = sortByKey(defaultData, 'name', 'ASC');

        setData(sortedData);
        setError('');
        setLoading(false);
      }
    };

    getPlanets();
  }, []);

  useEffect(() => {
    const filterPlanetsByName = (array) => {
      const formattedName = new RegExp(nameFilter.filterByName.name, 'i');
      const planetsFilteredByName = array
        .filter((planet) => planet.name.match(formattedName));
      return planetsFilteredByName;
    };

    const newPlanetsList = filterPlanetsByName(data);
    setFilteredPlanets(newPlanetsList);
  }, [data, nameFilter]);

  useEffect(() => {
    const numericFilterByValues = numericFilter.filterByNumericValues;

    const filterPlanetsByNumericValues = () => {
      const newPlanetsList = data
        .filter((planet) => {
          const isPlanetFiltered = numericFilterByValues.every((e) => {
            const { column, comparison, value } = e;
            return (verifyElement(planet[column], comparison, value));
          });

          return isPlanetFiltered;
        });

      return newPlanetsList;
    };

    if (numericFilterByValues.length > 0) {
      setFilteredPlanets(filterPlanetsByNumericValues());
    } else {
      setFilteredPlanets(data);
    }
  }, [data, numericFilter]);

  useEffect(() => {
    const [key, type] = (order.initial === 'name')
      ? [order.initial, 'ASC']
      : [order.column, order.sort];

    const sortedList = sortByKey(filteredPlanets, key, type);
    setSortedPlanets(sortedList);
  }, [order, filteredPlanets]);

  return (
    <PlanetsContext.Provider
      value={ {
        sortedPlanets,
        error,
        loading,
        numericFilter,
        setNameFilter,
        columnEntries,
        setColumnEntries,
        setNumericFilter,
        setOrder,
        order,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
