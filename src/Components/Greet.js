import React from "react";
import gsap from "gsap";
import {  useEffect } from "react";

const Greet = () => {
  const tl = gsap.timeline(); 

  useEffect(() => {
    tl.from(".h1,.tag", {
      opacity: 0,
      // scale: 0,
      // z: -100, // Start from a deep position
      duration: 3,
      delay :0.3,
      stagger:0.4,
      ease: "power4.out",
    });
  }, []);

  return (
    <>
      <div className="main absolute top-[45%] ml-12 text-white">
        <div className="text">
          <h1 className="text-3xl h1 ">
            Hi . I am <span className="text-orange-400">Keshav</span>
          </h1>
          <span className="text-[32px] tag">Front-End Developer</span>
        </div>
      </div>
    </>
  );
};

export default Greet;
