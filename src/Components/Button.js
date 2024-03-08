import React, { useEffect } from "react";
import gsap from "gsap";

const Button = ({ text, position }) => {

// jugaad in gsap animation as it was not working as expected 
  useEffect(() => {
    gsap.to(".btn", {
      opacity: 1,
      delay: 0.8,
      duration: 1.2,
      stagger: 0.2,
    });
  }, []);

  return (
    <div
      className={`btn text-white border-[2px] border-white cursor-pointer uppercase py-3  ${
        position === "right" ? "ml-4" : ""
      }`}
      style={{ opacity: 0 }}
    >
      <div className="animate overlayOfWhite"></div>
      <span>{text}</span>
    </div>
  );
};

export default Button;
