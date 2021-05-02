import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

describe('Tests for <HeroScreen />', () => {

    const history = {
        push: jest.fn(),
        goBack: jest.fn(),
        length: 10,
    };

    it('should render <Redirect /> if URL has no parameters', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ history } />
            </MemoryRouter>
        );
        expect( wrapper.find('Redirect').exists() ).toBe( true );
    });
    

    it('should display a hero info if the parameter value is valid and exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route exact path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.row').exists() ).toBe( true );
    });

    it('should go back to previous screen using PUSH when history.length <= 2', () => {
        const history = {
            push: jest.fn(),
            goBack: jest.fn(),
            length: 1,
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={ history } /> }
                />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();
        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();
    });

    it('should go back to previous screen using POP when history.length > 2', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={ history } /> }
                />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();
        expect( history.goBack ).toHaveBeenCalledTimes(1);
        expect( history.push ).not.toHaveBeenCalled();
    });

    it('should render <Redirect /> when URL parameters are not valid', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123']}>
                <Route
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={ history } /> }
                />
            </MemoryRouter>
        );
        expect( wrapper.find('.row').exists() ).toBe( false );
        expect( wrapper.text() ).toBe('');
    });
})
