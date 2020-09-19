import React, { Component, useState } from "react";
import App from "../App";

function SeriesDropDown({ game }) {
  return (
    <button value={game.id} key={game.id}>
      {game.name}
    </button>
  );
}

export default SeriesDropDown;
