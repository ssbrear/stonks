import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function Home() {
  return [
    <header>
      <div id="title">Stonks</div>
    </header>,
    <main id="home-main">
      <p>
        Test yourself in a stonk market that is interpreted as being completely
        random!
      </p>
      <p>Are you able to come out on top?</p>
      <img alt="Game dashboard" src="https://via.placeholder.com/450"></img>
      <p>There will be 5 total stocks that change share value every second.</p>
      <p>
        You will be given $100 to begin, with each stock starting at $1 per
        share.
      </p>
      <Link to="/dashboard">Begin</Link>
    </main>,
  ];
}

export default Home;
