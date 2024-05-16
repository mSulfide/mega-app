import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';

export enum EPAGES {
  GRAPH_2D = 'graph2D',
  GRAPH_3D = 'graph3D',
  UNICALCULATOR = 'UniCalculator',
  STUDENT_SIMULATOR = 'studentSimulator',
  ESSE = 'esse'

}

const App: React.FC = () => {
  const [pageName, setPageName] = useState<EPAGES>(EPAGES.GRAPH_3D);

  return (
    <div className="app">
      <Header setPageName={setPageName} />
    </div>
  );
}

export default App;
