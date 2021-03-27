import React from "react";

function Dashboard() {
  // Initialized stock value
  let stocks = [1, 1, 1, 1, 1];

  // Game loop only enters when a boolean is equal to true
  const loop = () => {
    if (playing === true) {
      let changes = [];
      for (let i = 0; i < 5; i++) {
        changes.push(Math.random() - Math.random());
      }
      stocks = stocks.map((x, i) => {
        let newX = x + changes[i];
        if (newX < 0.1) return 0.1;
        if (newX > 1.9) return 1.9;
        return newX;
      });
      changeBars();
    }
  };
  // CSS control based on stock value
  const changeBars = () => {
    const barList = document.getElementById("stock-bars").children;
    for (let i = 0; i < 5; i++) {
      const value = stocks[i];
      barList[i].style.height = String(355.56 * value + 4.444) + "px";
    }
  };
  // Logic to determine state of game
  let playing = false;
  setInterval(loop, 1000);
  const startGame = () => {
    playing = true;
    document.getElementById("play-button").disabled = true;
  };
  const pauseGame = () => {
    if (playing === true) playing = false;
    else playing = true;
  };
  const stopGame = () => {
    playing = false;
    document.getElementById("pause-button").disabled = true;
    document.getElementById("stop-button").disabled = true;
  };
  return (
    <main id="dashboard-main">
      <section id="time-control">
        <button id="play-button" onClick={startGame}>
          Play
        </button>
        <button id="pause-button" onClick={pauseGame}>
          Pause
        </button>
        <button id="stop-button" onClick={stopGame}>
          Stop
        </button>
      </section>
      <section id="player-info">
        <p>Wallet</p>
        <p>
          Cash on hand: $<span id="player-cash">100</span>
        </p>
        <p>
          Cash invested: $<span id="player-invested">0</span>
        </p>
        <p>
          Cash total: $<span id="player-total">100</span>
        </p>
      </section>
      <section id="stock-info">
        <aside id="y-axis">
          <div>2.00</div>
          <div>1.50</div>
          <div>0.50</div>
          <div>0.00</div>
        </aside>
        <div id="stock-bars">
          <div id="stock-1-bar"></div>
          <div id="stock-2-bar"></div>
          <div id="stock-3-bar"></div>
          <div id="stock-4-bar"></div>
          <div id="stock-5-bar"></div>
        </div>
        <div id="stock-graph">
          <div>Stonk 1</div>
          <div>Stonk 2</div>
          <div>Stonk 3</div>
          <div>Stonk 4</div>
          <div>Stonk 5</div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
