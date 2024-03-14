import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import GameDetails from "./pages/GameDetails";
import WishList from "./pages/WishList";
import Loader from "./components/Loader";
const NewGames = React.lazy(() => import("./pages/NewGames"));
const storedItems = JSON.parse(localStorage.getItem("wishlist"));
export const Context = createContext();

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishList, setWishList] = useState(storedItems || []);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  function handleAddGame(newgame) {
    if (wishList.some((game) => game.id === newgame.id)) {
      return;
    }
    setWishList([...wishList, newgame]);
  }
  return (
    <Context.Provider
      value={{
        searchQuery,
        setSearchQuery,
        handleAddGame,
        wishList,
        setWishList,
        openMenu,
        setOpenMenu,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="games/:id" element={<GameDetails />} />

          <Route
            path="/newgames"
            element={
              <Suspense fallback={<Loader />}>
                <NewGames />
              </Suspense>
            }
          />
          <Route path="newgames/:id" element={<GameDetails />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="wishlist/:id" element={<GameDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}
