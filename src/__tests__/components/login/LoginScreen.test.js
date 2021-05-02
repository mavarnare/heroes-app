import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";

describe('tests for <LoginScreen />', () => {
    const history = {
        replace: jest.fn(),
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        },
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ history } />
        </AuthContext.Provider>
    );

    it('should display correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    it('should perform the dispatch and navigation', () => {
        wrapper.find('button').prop('onClick')();
        expect( contextValue.dispatch ).toHaveBeenCalledTimes(1);
        expect( history.replace ).toHaveBeenCalledTimes(1);
    });

    it('should try to retrieve "lastPath" key from localStorage', () => {
        const getKeyMock = jest.fn();
        Storage.prototype.getItem = getKeyMock;
        
        wrapper.find('button').prop('onClick')();

        expect( getKeyMock ).toHaveBeenCalledWith('lastPath');
    });
})
