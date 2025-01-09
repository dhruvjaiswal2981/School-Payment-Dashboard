import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="carousel">
        <div className="carousel-item active">
          <img
            src="/images/sch-1.jpg"
            alt="carousel-img-1"
            className="carousel-image"
          />
        </div>
        <div className="carousel-item">
          <video autoPlay loop muted className="carousel-video">
            <source src="/images/sch-3.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="carousel-item">
          <img
            src="/images/sch-2.jpg"
            alt="carousel-img-2"
            className="carousel-image"
          />
        </div>
      </div>
      <div className="content">
        <h1>Welcome to the School Payment Dashboard</h1>
        <p>Manage school transactions easily with our dashboard.</p>
        <Link to="/dashboard">
          <button className="primary">Go to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
