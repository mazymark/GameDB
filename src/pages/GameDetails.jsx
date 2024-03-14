import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../App";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import Links from "../components/Links";
import NavCollapse from "../components/NavCollapse";

export default function GameDetails() {
  const { id } = useParams();
  const { openMenu } = useContext(Context);
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getGameData() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}?key=bab70de9f3dd49d38647cec266113fac&`
        );
        const data = await res.json();
        setGameData(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    getGameData();
  }, [id]);

  useEffect(() => {
    if (!gameData.name) return;
    document.title = `GAME DB | ${gameData.name}`;

    return function () {
      document.title = `GAME DB`;
    };
  }, [gameData.name]);

  const navigate = useNavigate();

  return (
    <>
      <div className="navbar-new-games">
        <Logo />
        <Links />
        {openMenu && <NavCollapse />}
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        &#60; Go Back
      </button>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="wrapper">
          <div className="game-header">
            <h1 className="game-details-title">{gameData.name}</h1>
            <img
              className="game-image"
              src={gameData?.background_image ?? "/images/game-logo.webp"}
              alt={gameData.name || "Game Image"}
            />
          </div>
          <div className="game-details-wrap">
            <h2 style={{ color: "rgb(255, 189, 9)" }}>Game Details</h2>
            <p
              className="game-desc"
              dangerouslySetInnerHTML={{
                __html: gameData?.description
                  ?.split(".")
                  .splice(0, 3)
                  .join("."),
              }}
            ></p>
            <div className="details">
              <img
                className="platform-icon"
                src="/images/monitor.png"
                alt="Release Date"
              />
              <span> Platforms: </span>
              {gameData.platforms?.map((game, index) => (
                <span key={index}>{game.platform.name} | </span>
              ))}
              <br />
              <img
                className="developer-icon"
                src="/images/developer.png"
                alt="Release Date"
              />
              <span> Developers: </span>
              {gameData.developers?.map((developer, index) => (
                <span key={index}>
                  {developer.name} {gameData.developers.length > 1 ? " | " : ""}
                </span>
              ))}
              <br />
              <img
                className="clock-icon"
                src="/images/clock.png"
                alt="Release Date"
              />
              {gameData.released ? (
                <span>Release Date: {gameData.released} </span>
              ) : (
                <span>N/A</span>
              )}
              <br />
              {gameData.metacritic && (
                <span>
                  <img
                    className="metacritic-icon"
                    src="/images/metacritic.png"
                    alt="Release Date"
                  />
                  Metacritic Score: {gameData.metacritic}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
