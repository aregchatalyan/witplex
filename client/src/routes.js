import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./pages/AuthPage";
import {ProfilePage} from "./pages/ProfilePage";
import {ProfileEditPage} from "./pages/ProfileEditPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage/>
                </Route>
                <Route path="/edit" exact>
                    <ProfileEditPage/>
                </Route>
                <Redirect to="/profile"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/">
                <AuthPage/>
            </Route>
        </Switch>
    )
}