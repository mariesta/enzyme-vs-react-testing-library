import React, { Component } from "react";
import PropTypes from "prop-types";

class RangeCounterA extends Component {
  constructor(props) {
    super(props);
    const { min } = props;
    this.state = {
      counter: min,
      hasEdited: false
    };

    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.hasEdited) {
      this.setState({ hasEdited: !this.state.hasEdited });
    }
  }

  incrementCounter() {
    const { counter } = this.state;
    const { max } = this.props;
    if (counter === max) {
      return;
    }
    this.setState({ counter: counter + 1 });
  }

  decrementCounter() {
    const { counter } = this.state;
    const { min } = this.props;
    if (counter === min) {
      return;
    }
    this.setState({ counter: counter - 1 });
  }

  render() {
    const { max, min } = this.props;
    return (
      <div className="RangeCounter">
        <span className="RangeCounter__title">Class RangeCounter</span>
        <div className="RangeCounter__controls">
          <button
            disabled={this.state.counter <= min}
            onClick={this.decrementCounter}
          >
            -
          </button>
          <span>{this.state.counter}</span>
          <button
            disabled={this.state.counter >= max}
            onClick={this.incrementCounter}
          >
            +
          </button>
        </div>
        {(this.state.counter >= max || this.state.counter <= min) &&
          this.state.hasEdited && (
            <span className="RangeCounter__alert">Range limit reached!</span>
          )}
      </div>
    );
  }
}

RangeCounterA.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};

RangeCounterA.defaultProps = {
  min: 0,
  max: 10
};

export default RangeCounterA;
