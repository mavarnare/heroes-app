import { types } from "../types/type";

// const state = {
//     name: 'Fernando',
//     logged: true,
// }

export const authReducer = (state = {}, action) => {
    console.log('reducer - state:', state);
    console.log('reducer - action:', action);
    switch ( action.type ) {
        case types.login:
            return {
                ...action.payload,
                logged: true,
            };

        case types.logout:
            return {
                logged: false,
            };
    
        default:
            return state;;
    }
}