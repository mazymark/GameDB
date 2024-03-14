import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../App";

export default function NavCollapse() {
  const { wishList, setOpenMenu } = useContext(Context);
  return (
    <div className="nav-open-menu">
      <div className="links-open-menu">
        <NavLink
          onClick={() => setOpenMenu((prev) => !prev)}
          to="/newgames"
          className={({ isActive }) =>
            isActive ? "nav-link-open-menu isActive" : "nav-link-open-menu"
          }
        >
          NEW GAMES
        </NavLink>
        <NavLink
          onClick={() => setOpenMenu((prev) => !prev)}
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "nav-link-open-menu isActive" : "nav-link-open-menu"
          }
        >
          WISHLIST <span>({wishList.length})</span>
        </NavLink>
      </div>
    </div>
  );
}
