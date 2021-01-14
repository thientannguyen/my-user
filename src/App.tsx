import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserPage from './UIControls/UserPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <UserPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
