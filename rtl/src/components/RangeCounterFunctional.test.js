import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { toBeVisible } from "@testing-library/jest-dom/matchers";

import RangeCounterFunctional from "./RangeCounterFunctional";

expect.extend({ toBeVisible });

describe("RangeCounterFunctional", () => {
  afterEach(cleanup);

  it("does not show range reached alert on initial load", () => {
    const { queryByText } = render(<RangeCounterFunctional />);
    expect(queryByText("Range limit reached!")).toBeNull();
  });

  it("shows range reached alert when reached limit by clicking control buttons", () => {
    const { getByText } = render(<RangeCounterFunctional min={0} max={1} />);
    const incrementButton = getByText("+");
    fireEvent.click(incrementButton);
    expect(getByText("Range limit reached!")).toBeVisible();
  });

  describe("when incrementing counter is allowed", () => {
    it("updates the counter value", async () => {
      const { getByTestId, getByText } = render(<RangeCounterFunctional min={2} />);
      const incrementButton = getByText("+");
      fireEvent.click(incrementButton);
      expect(getByTestId("counter-value").innerHTML).toEqual("3");
    });
  });

  describe("when incrementing counter is not allowed", () => {
    it("does not update the counter value", async () => {
      const { getByTestId, getByText } = render(
        <RangeCounterFunctional min={0} max={0} />
      );
      const incrementButton = getByText("+");
      fireEvent.click(incrementButton);
      expect(getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });

  describe("when decrementing counter is allowed", () => {
    it("updates the counter value", async () => {
      const { getByTestId, getByText } = render(<RangeCounterFunctional />);
      const incrementButton = getByText("+");
      const decrementButton = getByText("-");
      fireEvent.click(incrementButton);
      fireEvent.click(decrementButton);
      expect(getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });

  describe("when decrementing counter is not allowed", () => {
    it("does not update the counter value", async () => {
      const { getByTestId, getByText } = render(<RangeCounterFunctional />);
      const incrementButton = getByText("-");
      fireEvent.click(incrementButton);
      expect(getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });
});
