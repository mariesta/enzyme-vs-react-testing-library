import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { shallow } from 'enzyme';

import RangeCounterClass from "./RangeCounterClass";

const adapter = new Adapter();
configure({ adapter });

describe("RangeCounterClass", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RangeCounterClass />);
  });

  it("does not show range reached alert on initial load", () => {
    const alert = wrapper.find(".RangeCounter__alert");
    expect(alert).toHaveLength(0);
  });

  it("shows range reached alert when reached limit by clicking control buttons", () => {
    wrapper = shallow(<RangeCounterClass min={0} max={1} />);
    wrapper.instance().incrementCounter();
    wrapper.update();
    const alert = wrapper.find(".RangeCounter__alert");
    expect(alert.text()).toEqual("Range limit reached!");
  });

  describe("when incrementing counter is allowed", () => {
    it("updates counter value correctly", () => {
      wrapper.instance().incrementCounter();
      expect(wrapper.state().counter).toEqual(1);
      expect(wrapper.state().hasEdited).toEqual(true);
    });
  });

  describe("when incrementing counter is not allowed", () => {
    it("does not update counter value", () => {
      const instance = wrapper.instance();
      instance.setState({ counter: 10 });
      instance.incrementCounter();
      expect(wrapper.state().counter).toEqual(10);
      expect(wrapper.state().hasEdited).toEqual(true);
    });
  });

  describe("when decrementing counter is allowed", () => {
    it("updates counter value correctly", () => {
      const instance = wrapper.instance();
      instance.setState({ counter: 10 });
      instance.decrementCounter();
      expect(wrapper.state().counter).toEqual(9);
      expect(wrapper.state().hasEdited).toEqual(true);
    });
  });

  describe("when decrementing counter is not allowed", () => {
    it("does not update counter value", () => {
      const instance = wrapper.instance();
      instance.decrementCounter();
      expect(wrapper.state().counter).toEqual(0);
      expect(wrapper.state().hasEdited).toEqual(false);
    });
  });
});
