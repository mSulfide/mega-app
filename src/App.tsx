import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Esse from './components/Esse/Esse';
import StudentSimulator from './components/StudentSimulator/StudentSimulator';

export enum EPages {
  graph2D = 'graph2D',
  graph3D = 'graph3D',
  calculator = 'UniCalculator',
  studentSimulator = 'studentSimulator',
  esse = 'esse'

}

const App: React.FC = () => {
  const [pageName, setPageName] = useState<EPages>(EPages.graph3D);

  return (
    <div className="app">
      <Header setPageName={setPageName} />

      {pageName === EPages.esse && <Esse />}
      {pageName === EPages.studentSimulator && <StudentSimulator />}
    </div>
  );
}

export default App;
