import { shallow } from "enzyme";
import { mount } from "enzyme/build";
import { MemoryRouter } from "react-router";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe('Tests for <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel',
        }
    }

    Storage.prototype.setItem = jest.fn();

    it('should render the component only if authenticated and save in localStorage', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ true }
                    component={ () => <span>Dummy</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe( true );
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    })

    it('should disable the component if not authenticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ false }
                    component={ () => <span>Dummy</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe( false );
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    });
    
    
});
