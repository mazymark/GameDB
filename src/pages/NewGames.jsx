import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import Links from "../components/Links";
import AddIcon from "@mui/icons-material/Add";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../App";
import NavCollapse from "../components/NavCollapse";

export default function NewGames() {
  const [newGames, setNewGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bySorted, setBySorted] = useState("standard");
  const { handleAddGame, openMenu } = useContext(Context);

  let sorted = [];
  if (bySorted === "standard") sorted = newGames;
  if (bySorted === "az")
    sorted = newGames.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (bySorted === "release")
    sorted = newGames
      .slice()
      .sort((a, b) => b.released.localeCompare(a.released));

  useEffect(() => {
    async function getNewGame() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=bab70de9f3dd49d38647cec266113fac&dates=2024-01-01,2024-05-31&ordering=-added`
        );
        const data = await res.json();
        setNewGames(data.results);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    getNewGame();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="navbar-new-games">
        <Logo />
        <Links />
      </div>
      {openMenu && <NavCollapse />}
      <div className="sort">
        <select
          className="sort-input"
          onChange={(e) => setBySorted(e.target.value)}
        >
          <option value="standard">Sorted By: Standard</option>
          <option value="release">
            Sorted By: Release Date (Newest to Oldest)
          </option>
          <option value="az">Sorted By: Alphabetical (A-Z)</option>
        </select>
      </div>
      <h1 className="heading">
        New<span className="heading-span">Games</span>
      </h1>
      <button
        className="back-home-button-new-games"
        onClick={() => navigate("/")}
      >
        &#60; Back to Home
      </button>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <section className="game-wrapper">
          {sorted?.map((game) => (
            <div className="game-div" key={game.id}>
              <img
                className="game-image-small"
                src={game.background_image}
                alt={game.name}
              />
              <div className="game-details">
                <h3>{game.name.toUpperCase()}</h3>
                {game.genres.map((genre) => (
                  <span key={genre.id} style={{ color: "grey" }}>
                    {genre.name}
                  </span>
                ))}
                <p style={{ color: "grey" }}>Release Date: {game.released}</p>
              </div>
              <AddIcon
                onClick={() => handleAddGame(game)}
                className="wishlist-button"
                icon={faHeart}
              />
              <Link to={`/newgames/${game.id}`}>
                <h5 className="see-more-button">See More</h5>
              </Link>
            </div>
          ))}
        </section>
      )}
      <Outlet />
    </>
  );
}
