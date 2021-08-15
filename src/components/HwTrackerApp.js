import React from "react";
import Navigation from "./navigation/Navigation";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Groups from "./group/Groups";
import Teachers from "./teacher/Teachers";
import Students from "./student/Students";
import Courses from "./course/Courses";

export default class HwTrackerApp extends React.Component {

    render() {
        return (
            <Router>
                <Navigation/>
                <Switch>
                    <Route exact path="/groups" component={Groups}/>
                    <Route exact path="/teachers" component={Teachers}/>
                    <Route exact path="/students" component={Students}/>
                    <Route exact path="/courses" component={Courses}/>
                </Switch>
            </Router>
        );
    }


}
