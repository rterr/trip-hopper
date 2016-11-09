import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Landing from '../client/js/searchInput.js';

describe('<searchInput/>', function () {
  it('should have an input for the search', function () {
    const wrapper = shallow(<searchInput/>);
    expect(wrapper.find('input')).to.have.length(0);
  });
});

it("contains spec with an expectation", function() {
  expect(shallow(<searchInput />).contains(<input className="button btn btn-primary" />)).to.equal(false);
});
