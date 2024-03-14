import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Context } from "../App";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../components/NavBar";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchQuery, handleAddGame } = useContext(Context);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    async function getGameData() {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=bab70de9f3dd49d38647cec266113fac&search=${searchQuery}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setGames(data.results);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    getGameData();

    return function () {
      controller.abort();
    };
  }, [searchQuery]);

  const [bySorted, setBySorted] = useState("standard");

  let sorted = [];
  if (bySorted === "standard") sorted = games;
  if (bySorted === "az")
    sorted = games.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (bySorted === "rating")
    sorted = games.slice().sort((a, b) => b.metacritic - a.metacritic);
  if (bySorted === "release")
    sorted = games.slice().sort((a, b) => b.released.localeCompare(a.released));

  return (
    <>
      <NavBar />
      <div className="sort">
        <select
          className="sort-input"
          onChange={(e) => setBySorted(e.target.value)}
        >
          <option value="standard">Sorted By: Standard</option>
          <option value="az">Sorted By: Alphabetical (A-Z)</option>
          <option value="rating">Sorted By: Rating (High to Low)</option>
          <option value="release">
            Sorted By: Release Date (Newest to Oldest)
          </option>
        </select>
      </div>
      {searchQuery.length === 0 ? (
        <h1 className="heading">
          Popular<span className="heading-span">Games</span>
        </h1>
      ) : (
        <>
          <h1 className="heading">
            Search<span className="heading-span">Results</span>
          </h1>
        </>
      )}
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
                src={game?.background_image ?? "/images/game-logo.webp"}
                alt={game.name}
              />
              <div className="game-details">
                <h3>{game.name.toUpperCase()}</h3>
                {game.genres.map((genre) => (
                  <span key={genre.id} style={{ color: "grey" }}>
                    {genre.name}{" "}
                  </span>
                ))}
                <p style={{ color: "grey" }}>Release Date: {game.released}</p>
              </div>
              {game.metacritic > 0 && (
                <p
                  className={
                    game.metacritic >= 75
                      ? "green"
                      : game.metacritic < 50
                      ? "red"
                      : "orange"
                  }
                >
                  {game.metacritic}
                </p>
              )}
              <AddIcon
                onClick={() => handleAddGame(game)}
                className="wishlist-button"
                icon={faHeart}
              />
              <Link to={`/games/${game.id}`}>
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
