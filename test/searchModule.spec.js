import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Landing from '../client/js/searchModule.js';

describe('<SearchModule/>', function () {
  it('contains a <searchInput/> component', function () {
    const wrapper = mount(<searchModule/>);
    expect(wrapper.find(<searchInput />)).to.have.length(0);
  });
});

it('contains a <searchResults/> component', function () {
  const wrapper = mount(<searchModule/>);
  expect(wrapper.find(<searchResults />)).to.have.length(0);
  });
