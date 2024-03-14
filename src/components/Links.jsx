import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Context } from "../App";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Links() {
  const { wishList, setOpenMenu } = useContext(Context);
  return (
    <>
      <div className="links">
        <NavLink
          to="/newgames"
          className={({ isActive }) =>
            isActive ? "nav-link isActive" : "nav-link"
          }
        >
          NEW GAMES
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "nav-link isActive" : "nav-link"
          }
        >
          <FontAwesomeIcon
            icon={faHeart}
            style={{
              color: "#fff",
              backgroundColor: "transparent",
              fontSize: "1.4rem",
              paddingRight: "0.5rem",
            }}
          />
          WISHLIST
        </NavLink>
        <span className="wishlist-number">({wishList.length})</span>
      </div>

      <FontAwesomeIcon
        onClick={() => setOpenMenu((prev) => !prev)}
        className="hamburger-icon"
        icon={faBars}
      />
    </>
  );
}
