import './App.css';
import GridBoard from './components/GridBoard';
import GridSquare from './components/GridSquare';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Tetris Redux</h1>
      </header>
      <GridBoard />
    </div>
  );
}

export default App;
