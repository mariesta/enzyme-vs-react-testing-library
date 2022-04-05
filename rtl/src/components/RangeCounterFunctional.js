import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RangeCounterB = (props) => {
  const { max, min } = props;
  const [counter, setCounter] = useState(min);
  const [hasEdited, setHasEdited] = useState(false);

  useEffect(() => {
    if (counter !== min && !hasEdited) {
      setHasEdited(true);
    }
  }, [counter, hasEdited, min]);

  return (
    <div className="RangeCounter">
      <span className="RangeCounter__title">Functional RangeCounter</span>
      <div className="RangeCounter__controls">
        <button
          disabled={counter <= min}
          onClick={() => setCounter(counter - 1)}
        >
          -
        </button>
        <span data-testid="counter-value">{counter}</span>
        <button
          disabled={counter >= max}
          onClick={() => setCounter(counter + 1)}
        >
          +
        </button>
      </div>
      {(counter >= max || counter <= min) && hasEdited && (
        <span className="RangeCounter__alert">Range limit reached!</span>
      )}
    </div>
  );
};

RangeCounterB.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};

RangeCounterB.defaultProps = {
  min: 0,
  max: 10
};

export default RangeCounterB;
