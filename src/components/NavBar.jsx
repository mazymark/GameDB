import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import Links from "./Links";
import NavCollapse from "./NavCollapse";
import { Context } from "../App";

export default function NavBar() {
  const { openMenu } = useContext(Context);
  return (
    <div className="navbar">
      <Logo />
      {openMenu && <NavCollapse />}
      <SearchBar />
      <Links />
    </div>
  );
}
