import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HwTrackerApp from "./components/HwTrackerApp";

ReactDOM.render(
    <React.StrictMode>
        <HwTrackerApp/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
