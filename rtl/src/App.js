import './App.css';

import FunctionalCounter from "./components/RangeCounterFunctional";

function App() {
  return (
    <div className="App">
      <FunctionalCounter min={0} max={10} />
    </div>
  );
}

export default App;
