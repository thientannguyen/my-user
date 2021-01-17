import React from 'react';
import './App.css';
import UserPage from './UIControls/UserPage';

function App() {
    return (
        <div className="App">
            <h2>User List</h2>
            <UserPage maxWidth="250px" maxHeight="240px" />
        </div>
    );
}

export default App;
