import React from "react";
import { Link } from "@reach/router";
import "./About.css";

const About = () => {
  return (
    <div className="flex flex-column items-center">
      <h1 className="tc ma4 page-title">WHAT IS PIXELTHIS?</h1>
      <div className="word-container w-70">
        <h2 className="tc fw1 mh4">
          welcome to PixelThis, a platform for sharing your unique pixel artworks with friends! each
          day, you’ll be given a different art prompt, and you’ll be able to create your artwork{" "}
          <Link to="/draw" className="textblock-link">
            here
          </Link>
          . make sure to post your pix once you’re finished, and you can find all of your friends
          pix from today on our{" "}
          <Link to="/" className="textblock-link">
            home page
          </Link>
          . if you’d like to view previous pix, feel free to browse the{" "}
          <Link to="/archive" className="textblock-link">
            archive
          </Link>
          .
        </h2>
        <h2 className="tc fw1 mv3">* happy drawing! *</h2>
      </div>
    </div>
  );
};

export default About;
