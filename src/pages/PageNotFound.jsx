import React, { useEffect } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, []);

  return (
    <>
      <Logo />
      <h1>404 Error</h1>
      <h3>
        Page Not Found. You will be automatically redirected to the Homepage
        shortly.
      </h3>
    </>
  );
}
