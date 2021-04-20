import { shallow } from "enzyme";
import { DcScreen } from "../../components/dc/DcScreen";

describe('Tests for <DcScreen />', () => {
    const wrapper = shallow(<DcScreen />);
    test('should match snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    })
    
});
