import React from "react";
import Navigation from "./navigation/Navigation";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Groups from "./group/Groups";
import Teachers from "./teacher/Teachers";
import Students from "./student/Students";
import Courses from "./course/Courses";
import VerifyTasks from "./verifytask/VerifyTasks";
import LoginForm from "./security/LoginForm";
import {PrivateRoute} from "./security/PrivateRoute";
import RegistrationForm from "./security/RegistrationForm";

export default class HwTrackerApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {authenticated: false};
    }

    handleUpdateAuthStatus = (authStatus) => {
        this.setState(prevState => {
            return {authenticated: authStatus, teacherId: prevState.teacherId}
            }
        )
        if (!authStatus) {
            this.setState({teacherId: null})
        }
    }

    handleUpdateTeacherId = (teacherId) => {
        console.log(teacherId)
        this.setState(prevState => {
            return {teacherId: teacherId};
        });
    }

    render() {
        return (
            <Router>
                <Navigation authenticated={this.state.authenticated} onLogOut={this.handleUpdateAuthStatus}/>
                <Switch>
                    <Route exact path="/">
                        <LoginForm onLogin={this.handleUpdateAuthStatus} handleTeacherIdChange={this.handleUpdateTeacherId}/>
                    </Route>
                    <Route exact path="/register">
                        <RegistrationForm/>
                    </Route>
                    <PrivateRoute exact path="/groups" component={Groups} authenticated={this.state.authenticated}/>
                    <PrivateRoute exact path="/teachers" component={Teachers} authenticated={this.state.authenticated}/>
                    <PrivateRoute exact path="/students" component={Students} authenticated={this.state.authenticated}/>
                    <PrivateRoute exact path="/courses" component={Courses} authenticated={this.state.authenticated}/>
                    <PrivateRoute exact path="/opentasks" component={VerifyTasks}
                                  authenticated={this.state.authenticated} teacherId={this.state.teacherId}/>
                </Switch>
            </Router>
        );
    }


}
