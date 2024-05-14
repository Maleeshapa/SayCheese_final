import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExampleAutoplaying" className="carousel slide fade-up" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://img.freepik.com/premium-photo/portrait-cat-sitting-beautiful-shadow_1048944-8102924.jpg?w=740" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/premium-photo/coconut-tree-sawarna-beach-banten_1048944-8747544.jpg?w=740" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/free-photo/aerial-view-beautiful-sky-road-top-mountains-with-green-jungle-nan-province-thailand_335224-1063.jpg?t=st=1709873178~exp=1709876778~hmac=53d39959c9729cf4f761569d575d42de4cdb7b7574f89a37dc40dd93ee78528b&w=740" className="d-block w-100" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
