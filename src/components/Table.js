import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const FILMS_INDEX = 9;

// https://masteringjs.io/tutorials/fundamentals/capitalize-first-letter
const capitalizeFirstLetter = (string) => {
  const newStr = string.charAt(0).toUpperCase() + string.slice(1);
  return newStr;
};

const Table = () => {
  const { sortedPlanets } = useContext(PlanetsContext);

  const renderTableHeader = () => {
    const tableHeader = Object.keys(sortedPlanets[0])
      .map((planetKey) => {
        const title = planetKey.replace('_', ' ').split(' ')
          .map(capitalizeFirstLetter).join(' ');
        return (<th scope="col" id={ planetKey } key={ planetKey }>{ title }</th>);
      });

    return tableHeader;
  };

  const renderTableRows = () => {
    const tableRows = sortedPlanets.map((planet, index) => {
      const filmsLinks = planet.films.map((film) => (
        <a
          key={ film }
          href={ film }
          target="_blank"
          rel="noopener noreferrer"
        >
          { film }
        </a>));

      const planetValues = Object.values(planet);
      const cells = [...planetValues.slice(0, FILMS_INDEX),
        filmsLinks,
        ...planetValues.slice(FILMS_INDEX + 1)];

      const row = cells.map((cell, i) => {
        if (i === 0) {
          return (<td data-testid="planet-name" key={ cell }>{ cell }</td>);
        }
        return (<td key={ cell }>{ cell }</td>);
      });

      return (
        <tr
          key={ `${index}_${planet.name}` }
          id={ planet.name }
        >
          { row }
        </tr>
      );
    });

    return tableRows;
  };

  return (
    <main>
      <table>
        <thead>
          <tr>
            { (sortedPlanets.length > 0) && renderTableHeader() }
          </tr>
        </thead>
        <tbody>
          { (sortedPlanets.length > 0) && renderTableRows() }
        </tbody>
      </table>
    </main>
  );
};

export default Table;
