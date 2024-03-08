import React from "react";
import Galaxy from "./Galaxy";
import AboutContent from "./AboutContent";


const About = () => {
  return (
    <>
      <div className="h-full">
        <AboutContent />
        <Galaxy />
      </div>
    </>
  );
};

export default About;
