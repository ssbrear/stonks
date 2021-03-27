import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <div id="title">Stonks</div>
      </header>
      <main>
        <p>
          Test yourself in a stonk market that is interpreted as being
          completely random!
        </p>
        <p>Are you able to come out on top?</p>
        <img alt="Game dashboard" src="https://via.placeholder.com/450"></img>
        <p>There will be 5 total stocks that change share value every second.</p>
        <p>You will be given $100 to begin, with each stock starting at $1 per share.</p>
        <button>Begin</button>
      </main>
    </div>
  );
}

export default App;
