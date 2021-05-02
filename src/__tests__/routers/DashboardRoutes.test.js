import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { DcScreen } from "../../components/dc/DcScreen";
import { HeroScreen } from "../../components/heroes/HeroScreen";
import { MarvelScreen } from "../../components/marvel/MarvelScreen";
import { SearchScreen } from "../../components/search/SearchScreen";
import { Navbar } from "../../components/ui/Navbar";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('tests for <DashboardRoutes />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Mavarnare',
            logged: true,
        },
        
    }
    it('should match the snapshot', () => {
        const wrapper = mount(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <DashboardRoutes />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('Navbar').exists() ).toMatchSnapshot();
        expect( wrapper.find('MarvelScreen').exists() ).toMatchSnapshot();
        expect( wrapper.find('HeroScreen').exists() ).toMatchSnapshot();
        expect( wrapper.find('DcScreen').exists() ).toMatchSnapshot();
        expect( wrapper.find(SearchScreen).exists() ).toMatchSnapshot();
    });
    
});
