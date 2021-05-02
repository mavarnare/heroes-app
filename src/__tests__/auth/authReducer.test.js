import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/type";

describe('Tests for authReducer', () => {
    it('should return default state', () => {
        const initialState = { logged: false };
        const defaultState = authReducer(initialState, { type: null });
        expect( defaultState ).toEqual(initialState);
    })
    it('should authenticate and set user name', () => {
        const username = 'mavarnare';
        const action = {
            type: types.login,
            payload: {
                name: username
            }
        };
        const newState = authReducer({}, action);

        expect( newState ).toEqual({
            name: username,
            logged: true,
        });
    })
    it('should delete name and set logged to false', () => {
        const userLoggedState = {
            name: 'mavarnare',
            logged: true,
        };

        const newState = authReducer(userLoggedState, { type: types.logout });

        expect( newState.name ).toBeUndefined();
        expect( newState.logged ).toBe( false );
    });
    
});
