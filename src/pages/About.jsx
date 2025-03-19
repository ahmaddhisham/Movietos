import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About MovieTos</h1>
        <p>
          Welcome to <span className="highlight">MOVIETOS</span>, your go-to platform for discovering and exploring movies from various genres and eras. Our goal is to provide an immersive experience for movie enthusiasts, helping you find detailed information about your favorite films, actors, and directors.
        </p>
        <p>
          Whether you're searching for the latest blockbusters or classic masterpieces, MovieTos offers a user-friendly interface and up-to-date data to enhance your movie-watching journey.
        </p>
        <p>
          Stay tuned for upcoming features, including personalized recommendations, user reviews, and watchlist functionality to keep track of your favorite movies.
        </p>
        <p className="bold-text">Enjoy your cinematic adventure with MovieTos!</p>
      </div>
    </div>
  );
};

export default About;
