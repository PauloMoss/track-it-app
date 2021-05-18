import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from '../contexts/UserContext';

import Login from './Login/Login';
import SignUp from './SingIn/SignUp';
import Habtis from "./Habits/Habits";
import Today from "./Today/Today";
import History from "./History/History";

export default function App() {

    const [userProfile, setUserProfile] = useState(null);

    return(
        <UserContext.Provider value={{userProfile, setUserProfile}}>
            <Router>
                <Switch>
                    <Route exact path= "/">
                        <Login />
                    </Route>
                    <Route path= "/cadastro">
                        <SignUp />
                    </Route>
                    <Route path= "/habitos">
                        <Habtis />
                    </Route>
                    <Route path= "/hoje">
                        <Today />
                    </Route>
                    <Route path= "/historico">
                        <History />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
        
    );
}