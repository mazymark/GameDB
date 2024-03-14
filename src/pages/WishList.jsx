import React, { useContext, useState } from "react";
import Logo from "../components/Logo";
import Links from "../components/Links";
import { Context } from "../App";
import { Link, useNavigate } from "react-router-dom";
import NavCollapse from "../components/NavCollapse";

export default function WishList() {
  const { wishList, setWishList, openMenu } = useContext(Context);
  const [bySorted, setBySorted] = useState("standard");

  let sorted = [];
  if (bySorted === "standard") sorted = wishList;
  if (bySorted === "az")
    sorted = wishList.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (bySorted === "rating")
    sorted = wishList.slice().sort((a, b) => b.metacritic - a.metacritic);
  if (bySorted === "release")
    sorted = wishList
      .slice()
      .sort((a, b) => b.released.localeCompare(a.released));

  function handleDeleteGame(deleteGame) {
    setWishList(wishList.filter((game) => game.id !== deleteGame));
  }

  function handleClearList() {
    const confirm = window.confirm("Are you sure you want to clear the list?");
    if (confirm) setWishList([]);
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="navbar-new-games">
        <Logo />
        <Links />
      </div>
      {openMenu && <NavCollapse />}
      {wishList.length > 1 && (
        <div className="sort ">
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
      )}
      <div className="wishlist-buttons-wrap">
        <button className="back-home-button" onClick={() => navigate("/")}>
          &#60; Back to Home
        </button>
        {wishList.length > 1 && (
          <button className="clear-list-button" onClick={handleClearList}>
            Clear {wishList.length} games
          </button>
        )}
      </div>

      <div className="wishlist-wrapper">
        {wishList.length === 0 && (
          <h1 className="wishlist-empty-message">
            There are currently no games in the wishlist
          </h1>
        )}
        {sorted.map((game) => (
          <div className="game-div" key={game.id}>
            <img
              className="game-image-small"
              src={game.background_image}
              alt={game.name}
            />
            <div className="game-details">
              <h3>{game.name.toUpperCase()}</h3>
              {game.genres.map((genre) => (
                <span style={{ color: "grey" }}> {genre.name} </span>
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

            <Link to={`/wishlist/${game.id}`}>
              <h5 className="see-more-button">See More</h5>
            </Link>
            <h5
              onClick={() => handleDeleteGame(game.id)}
              className="remove-button"
            >
              Remove
            </h5>
          </div>
        ))}
      </div>
    </>
  );
}
