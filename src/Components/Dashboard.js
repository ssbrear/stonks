import React, { useEffect } from "react";

function Dashboard() {
  // Initialized stock value
  let stocks = [1.0, 1.0, 1.0, 1.0, 1.0];
  let ownedStocks = [0, 0, 0, 0, 0];
  let deadStocks = [false, false, false, false, false];
  let cashHand = 100;
  let cashInvested = 0;

  // Game loop only enters when a boolean is equal to true
  const loop = () => {
    if (playing === true) {
      let changes = [];
      for (let i = 0; i < 5; i++) {
        if (deadStocks[i] === false) {
          changes.push(Math.random() - Math.random());
        } else changes.push(0);
      }
      let newStocks = stocks.map((x, i) => {
        let newX = x + changes[i];
        if (newX < 0.01) {
          changes[i] = 0.01 - stocks[i];
          deadStocks[i] = true;
          return 0.01;
        }
        if (newX > 1.99) {
          changes[i] = 2 - stocks[i];
          deadStocks[i] = true;
          return 2;
        }
        return newX;
      });
      cashInvested = ownedStocks
        .map((x, i) => {
          return x * stocks[i] * (1 + changes[i] / stocks[i]);
        })
        .reduce((a, b) => a + b);
      stocks = newStocks;
      document.getElementById(
        "player-invested"
      ).textContent = cashInvested.toFixed(2);
      document.getElementById("player-total").textContent = (
        parseFloat(document.getElementById("player-cash").textContent) +
        cashInvested
      ).toFixed(2);
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
    const modalWindow = document.getElementById("modal");
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
        buyButton.textContent = "Lock Portfolio";
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
          buyButton.textContent = "Buy/Sell";
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
    window.onclick = (e) => {
      e.preventDefault();
      if (e.target.id.includes("buying")) {
        const stockNum = parseInt(e.target.id.slice(-1));
        document.getElementsByClassName(
          "selected-stock"
        )[0].textContent = e.target.id.slice(-1);
        document.getElementsByClassName(
          "selected-stock"
        )[1].textContent = e.target.id.slice(-1);
        document.getElementById("select-stock-price-buy").textContent =
          Math.ceil(100 * stocks[stockNum - 1]) / 100;
        document.getElementById("number-of-shares-to-buy").value = 0;
        document.getElementById("select-stock-amount-buy").textContent = `${
          document.getElementById("select-stock-price-buy").textContent +
          " x 0 = $0"
        }`;
        modalWindow.style.display = "block";
      } else if (e.target.id === "modal-buy-button") {
        const numberOfSharesToBuy = parseInt(
          document.getElementById("number-of-shares-to-buy").value
        );
        const pricePerShare = document.getElementById("select-stock-price-buy")
          .textContent;
        const cost =
          Math.ceil(
            100 * parseFloat(numberOfSharesToBuy) * parseFloat(pricePerShare)
          ) / 100;
        if (cashHand >= cost) {
          const boughtStock = parseInt(
            document.getElementsByClassName("selected-stock")[0].textContent
          );
          ownedStocks[boughtStock - 1] += numberOfSharesToBuy;
          cashHand = cashHand - cost;
          cashInvested = cashInvested + cost;
          document.getElementById("player-cash").textContent = cashHand.toFixed(
            2
          );
          document.getElementById(
            "player-invested"
          ).textContent = cashInvested.toFixed(2);
          document.getElementById("player-total").textContent = (
            cashInvested + cashHand
          ).toFixed(2);
        } else {
          alert("You do not have enough money for that purchase");
        }
      } else if (e.target.id === "modal-sell-button") {
        const numberOfSharesToSell = parseInt(
          document.getElementById("number-of-shares-to-sell").value
        );
        const stockIndex =
          parseInt(
            document.getElementsByClassName("selected-stock")[0].textContent
          ) - 1;
        if (numberOfSharesToSell > ownedStocks[stockIndex]) {
          alert("You do not own that many shares.");
        } else {
          cashHand += stocks[stockIndex] * numberOfSharesToSell;
          cashInvested -= stocks[stockIndex] * numberOfSharesToSell;
          ownedStocks[stockIndex] -= numberOfSharesToSell;
          document.getElementById("player-cash").textContent = cashHand.toFixed(
            2
          );
          document.getElementById(
            "player-invested"
          ).textContent = cashInvested.toFixed(2);
          document.getElementById("player-total").textContent = (
            cashInvested + cashHand
          ).toFixed(2);
        }
      } else if (e.target.id === "modal-done-button") {
        modalWindow.style.display = "none";
      } else if (e.target.id === "modal") {
        modalWindow.style.display = "none";
      }
    };
    document
      .getElementById("number-of-shares-to-buy")
      .addEventListener("input", () => {
        const numShares = document.getElementById("number-of-shares-to-buy")
          .value;
        const pricePerShare = document.getElementById("select-stock-price-buy")
          .textContent;
        const totalValue = parseFloat(numShares) * parseFloat(pricePerShare);
        document.getElementById("select-stock-amount-buy").textContent = `${
          pricePerShare +
          " x " +
          numShares +
          " = $" +
          (Math.ceil(100 * totalValue) / 100).toFixed(2)
        }`;
      });
  });
  return [
    <section id="modal">
      <form id="modal-content">
        <section>
          <label>
            How many shares of Stonk <span className="selected-stock"></span>{" "}
            would you like to BUY?
          </label>
          <input
            min="0"
            step="1"
            type="number"
            id="number-of-shares-to-buy"
          ></input>
          <small>
            Share price is currently: $<span id="select-stock-price-buy"></span>
          </small>
          <small>
            Currently Buying: $<span id="select-stock-amount-buy"></span>
          </small>
          <button id="modal-buy-button">Buy</button>
        </section>

        <section>
          <label>
            How many shares of Stonk <span className="selected-stock"></span>{" "}
            would you like to SELL?
          </label>
          <input
            min="0"
            step="1"
            type="number"
            id="number-of-shares-to-sell"
          ></input>
          <small>
            Share price is currently: $
            <span id="select-stock-price-sell"></span>
          </small>
          <small>
            Currently Selling: $<span id="select-stock-amount-sell"></span>
          </small>
          <button id="modal-sell-button">Sell</button>
          <button id="modal-done-button">Done</button>
        </section>
      </form>
    </section>,
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
          Cash on hand: $<span id="player-cash">100.00</span>
        </p>
        <p>
          Cash invested: $<span id="player-invested">0.00</span>
        </p>
        <p>
          Cash total: $<span id="player-total">100.00</span>
        </p>
        <p>
          <button id="buy-button" disabled>
            Buy/Sell
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
    </main>,
  ];
}

export default Dashboard;
