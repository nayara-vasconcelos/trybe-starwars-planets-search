import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchStarWarsAPI from '../services/getStarWarsAPI';

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState({ filterByName: { name: '' } });

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
        setData(defaultData);
        setFilteredPlanets(defaultData);
        setError('');
        setLoading(false);
      }
    };

    getPlanets();
  }, []);

  useEffect(() => {
    const filterPlanetsByName = (array) => {
      const formattedName = new RegExp(nameFilter.filterByName.name, 'i');
      // console.log(formattedName);
      const planetsFilteredByName = array
        .filter((planet) => planet.name.match(formattedName));
      // console.log(planetsFilteredByName);
      return planetsFilteredByName;
    };

    const newPlanetsList = filterPlanetsByName(data);
    setFilteredPlanets(newPlanetsList);
  }, [data, nameFilter]);

  return (
    <PlanetsContext.Provider
      value={ { filteredPlanets, error, loading, setNameFilter } }
    >
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
