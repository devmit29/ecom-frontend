import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'


function App() {
  return (
    <DataProvider>
      <Router>
        {/* <div className="mih-h-screen bg-slate-200 mx-2 px-1 [box-shadow:0_0_35px_#eee] "> */}
        <Header />
        <MainPages />
      </Router>
    </DataProvider>
  );
}

export default App;
