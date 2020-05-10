import React from "react";
import { Carousel } from "react-bootstrap";

const Home = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="w-100"
          src="../assets/img/gift1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <div className="row">
            <div className="col-md-6">
              <h3 className="h1 text-left text-dark">Why Corporate Gifting?</h3>
              <p className="h3 text-left text-dark">
                Leave A Good Impression With A Little Something Extra.
                <br />
                <br />
                Show Your Clients. Show Your Employees. Show Your Friends That
                You Care.
              </p>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Home;
