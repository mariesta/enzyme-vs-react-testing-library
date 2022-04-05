import './App.css';

import ClassCounter from "./components/RangeCounterClass";

function App() {
  return (
    <div className="App">
      <ClassCounter min={0} max={8} />
    </div>
  );
}

export default App;
