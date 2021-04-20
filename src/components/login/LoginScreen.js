import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/type';

export const LoginScreen = ({ history }) => {
    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        
        const lastPath = localStorage.getItem('lastPath') || '/';

        history.replace(lastPath);
        const action = {
            type: types.login,
            payload: {
                name: 'Mavarnare',
            }
        };
        dispatch(action);
    }
    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}
