import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe('tests for <AppRouter />', () => {

    it('should show <LoginScreen /> if not authenticated', () => {
        
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        }
    };
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('LoginScreen').exists() ).toBe( true );
        expect( wrapper.find('DashboardRoutes').exists() ).toBe( false );
    });

    it('should show <DashboardRoutes /> if authenticated', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Mavarnare',
            }
        };
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('LoginScreen').exists() ).toBe( false );
        expect( wrapper.find('DashboardRoutes').exists() ).toBe( true );
    });
    
});
