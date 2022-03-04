const API_ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchStarWarsAPI = () => {
  const results = fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => `Error: ${error}`);

  return results;
};

export default fetchStarWarsAPI;
