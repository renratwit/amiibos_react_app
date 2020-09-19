import React, { useState, useEffect } from "react";
import Amiibo from "./components/Amiibo";
import Games from "./components/Games";
import "./App.css";

function App() {
  const API = `https://www.amiiboapi.com/api/amiibo/`;

  const [input, setInput] = useState("");
  const [amiibos, setAmiibos] = useState([]);
  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  function search(e) {
    if (e.key == "Enter") {
      fetch(`${API}/?character=${input}`)
        .then((res) => {
          if (res.ok) return res.json();
          else {
            throw new Error("Invalid Search Input");
          }
        })
        .then((data) => {
          setAmiibos(data.amiibo);
          setInput("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function renderAmiibos() {
    return (
      <div className="amiibos">
        {console.log("renderAmiibos")}
        {amiibos.map((a) => (
          <Amiibo
            key={`${a.head}${a.tail}`}
            name={a.name}
            img={a.image}
            game={a.amiiboSeries}
          />
        ))}
      </div>
    );
  }

  function renderAllAmiibos() {
    fetch(`${API}${query}`)
      .then((res) => res.json())
      .then((data) => {
        setAmiibos(data.amiibo);
      });
  }

  function DropDownOption({ game }) {
    return (
      <button
        value={game.id}
        key={game.id}
        onClick={() => {
          setQuery(`${game.id}`);
        }}
      >
        {game.name}
      </button>
    );
  }

  useEffect(() => {
    console.log("useEffect");
    renderAllAmiibos();
  }, [query]);

  return (
    <div className="App">
      <h1 onClick={renderAllAmiibos}>Amiibros</h1>
      <div className="top-bar">
        <input
          type="text"
          placeholder="search by name..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyPress={search}
        />
        <button onClick={() => setShowMenu(!showMenu)}>Filter by Series</button>
        {showMenu ? (
          <div className="dropdown-container">
            {" "}
            {Games.map((g) => (
              <DropDownOption key={g.id} game={g} />
            ))}{" "}
          </div>
        ) : (
          ""
        )}
      </div>
      {renderAmiibos()}
    </div>
  );
}

export default App;
