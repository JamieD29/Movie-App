import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleDomain = () => {
      navigate(-1);
  }

  return (
    <div>
      <section className="notFound">
        <div className="img">
          <img
            src="https://assets.codepen.io/5647096/backToTheHomepage.png"
            alt="Back to the Homepage"
          />
          <img
            src="https://assets.codepen.io/5647096/Delorean.png"
            alt="El Delorean, El Doc y Marti McFly"
          />
        </div>
        <div className="text">
          <h1>404</h1>
          <h2>PAGE NOT FOUND</h2>
          <h3>GO BACK TO PREVIOUS?</h3>
          <NavLink onClick={handleDomain} key="yes" className="yes">
            YES
          </NavLink>
          <NavLink to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" key="no">NO</NavLink>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
