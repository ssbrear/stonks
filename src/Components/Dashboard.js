import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  let stocks = [1, 1, 1, 1, 1];
  useEffect(() => {
    setInterval(loop, 1000);
  });
  const loop = () => {
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
  };
  const changeBars = () => {
    const barList = document.getElementById("stock-bars").children;
    for (let i = 0; i < 5; i++) {
      const value = stocks[i];
      barList[i].style.height = String(355.56 * value + 4.444) + "px";
    }
  };
  return (
    <main id="dashboard-main">
      <section id="time-control">
        <button id="play-button">Play</button>
        <button id="pause-button">Pause</button>
        <button id="stop-button">Stop</button>
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
          <div id="y-label">Value</div>
          <div id="y-values">
            <div>2.00</div>
            <div>1.50</div>
            <div>0.50</div>
            <div>0.00</div>
          </div>
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
