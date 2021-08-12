import React from "react";
import Navigation from "./navigation/Navigation";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Groups from "./group/Groups";

export default class HwTrackerApp extends React.Component {

    render() {
        return (
            <Router>
                <Navigation/>
                <Switch>
                    <Route exact path="/groups" component={Groups}/>
                </Switch>
            </Router>
        );
    }


}
