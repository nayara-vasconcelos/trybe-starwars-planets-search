import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';

import './App.css';

import Table from './components/Table';

// Provider deve estar no App.js

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
