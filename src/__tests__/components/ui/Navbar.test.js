import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/type";

describe('tests for <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Mavarnare',
            logged: true,
        }
    };

    const wrapper = mount(
        
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
            <Router history={ historyMock }>
                <Navbar />
            </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render successfully', () => {
        expect( wrapper.find('span.nav-item.nav-link.text-info').text().trim() ).toBe( 'Mavarnare' );
        expect( wrapper ).toMatchSnapshot();
    });

    it('should logout and use history', () => {
        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/login');
    });
    
    
});
