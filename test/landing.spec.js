import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Landing from '../client/js/landing.js';

describe('<Landing/>', function () {
  it('should have an button to login', function () {
    const wrapper = shallow(<Landing/>);
    expect(wrapper.find('button')).to.be.defined;
  })
});
