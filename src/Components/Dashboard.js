import React, { useEffect, useState } from "react";

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
        if (newX < 0.01) return 0.01;
        if (newX > 1.99) return 1.99;
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
      barList[i].style.height = String(346.67 * value - 3.333) + "px";
    }
  };
  // Logic to determine state of game
  let playing = false;
  setInterval(loop, 1000);
  useEffect(() => {
    const pauseButton = document.getElementById("pause-button");
    const stopButton = document.getElementById("stop-button");
    const playButton = document.getElementById("play-button");
    const buyButton = document.getElementById("buy-button");
    playButton.addEventListener("click", () => {
      playing = true;
      playButton.disabled = true;
      pauseButton.disabled = false;
      stopButton.disabled = false;
      buyButton.disabled = false;
    });
    pauseButton.addEventListener("click", () => {
      if (playing === true) {
        playing = false;
        pauseButton.textContent = "Continue";
      } else {
        playing = true;
        pauseButton.textContent = "Pause";
      }
    });
    stopButton.addEventListener("click", () => {
      playing = false;
      pauseButton.disabled = true;
      stopButton.disabled = true;
    });
    let buying = false;
    buyButton.addEventListener("click", () => {
      const barList = document.getElementById("stock-bars").children;
      if (buying === false) {
        buying = true;
        if (playing === true) {
          pauseButton.click();
        }
        pauseButton.disabled = true;
        stopButton.disabled = true;
        buyButton.textContent = "Stop Buying";
        const barList = document.getElementById("stock-bars").children;
        for (let i = 0; i < 5; i++) {
          switch (i) {
            default:
              barList[i].setAttribute("id", "buying-1");
              break;
            case 1:
              barList[i].setAttribute("id", "buying-2");
              break;
            case 2:
              barList[i].setAttribute("id", "buying-3");
              break;
            case 3:
              barList[i].setAttribute("id", "buying-4");
              break;
            case 4:
              barList[i].setAttribute("id", "buying-5");
              break;
          }
        }
      } else {
        for (let i = 0; i < 5; i++) {
          barList[i].style.backgroundColor = "";
          switch (i) {
            default:
              barList[i].setAttribute("id", "stock-1-bar");
              break;
            case 1:
              barList[i].setAttribute("id", "stock-2-bar");
              break;
            case 2:
              barList[i].setAttribute("id", "stock-3-bar");
              break;
            case 3:
              barList[i].setAttribute("id", "stock-4-bar");
              break;
            case 4:
              barList[i].setAttribute("id", "stock-5-bar");
              break;
          }
        }
        pauseButton.disabled = false;
        stopButton.disabled = false;
        buying = false;
      }
    });
  });
  return (
    <main id="dashboard-main">
      <section id="time-control">
        <button id="play-button">Start</button>
        <button id="pause-button" disabled>
          Pause
        </button>
        <button id="stop-button" disabled>
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
        <p>
          <button id="buy-button" disabled>
            Buy Stonks
          </button>
        </p>
      </section>
      <section id="stock-info">
        <aside id="y-axis">
          <div>2.00</div>
          <div>1.50</div>
          <div>1.00</div>
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
