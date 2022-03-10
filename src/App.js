import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';

import './App.css';

import Table from './components/Table';
import Filters from './components/Filters';

// Provider deve estar no App.js

function App() {
  return (
    <PlanetsProvider>
      <Filters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
