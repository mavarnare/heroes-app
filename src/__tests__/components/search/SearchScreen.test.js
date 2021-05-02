import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe('tests for <SearchScreen />', () => {

    it('should display successfully with default values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route exact path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text() ).toBe('Search a hero');
    });

    it('should display Batman data and input filled with queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route exact path="/search" component={ SearchScreen }/>
            </MemoryRouter>
        );
        expect( wrapper.find('input').prop('value') ).toBe('batman');
    });

    it('should display error message when search has no match', () => {
        const history = {
            push: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=asdasdads']}>
                <Route
                    path="/search"
                    component={ () => <SearchScreen history={ history } /> }
                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman',
            },
        });

        const event = { preventDefault: jest.fn() };
        wrapper.find('form').prop('onSubmit')(event);
        expect( history.push ).toHaveBeenCalledWith('?q=batman');
    });
    
});
