import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';

export const PublicRoute = ({ isAuthenticated, ...rest }) => {

    return (
        isAuthenticated ? <Redirect to="/search" /> : <Route { ...rest } />
    )
}
