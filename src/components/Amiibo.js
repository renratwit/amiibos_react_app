import React, { Component } from "react";

const Amiibo = ({ name, img, game }) => {
  return (
    <div className="amiibo">
      <h1>{name}</h1>
      <img src={img}></img>
      <p>{game}</p>
      {/* <button onClick={() => localStorage.setItem(game, name)}>+</button>  */}
    </div>
  );
};

export default Amiibo;
