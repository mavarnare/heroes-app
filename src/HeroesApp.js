import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'

const init = (initialState) => {
    return JSON.parse(localStorage.getItem('user')) || initialState;
}

export const HeroesApp = () => {
    const [user, dispatch] = useReducer(authReducer, { logged: false }, init)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify( user ));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}
