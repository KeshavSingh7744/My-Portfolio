import React from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import arrowIcon from "/assets/arrow-27-512.png";
import bubbleGame from "/assets/bubble.mp4";
import amazingShoes from "/assets/amazing-shoes.mp4";
import ytClone from "/assets/yt-clone.mp4";
import foodSite from "/assets/foodSite.mp4";
import cloudSite from "/assets/cloud-site.mp4";
import resSite from "/assets/Responsive-site.mp4";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  const tl = gsap.timeline();

  useEffect(() => {
    tl.from(".heading ", {
      y: -80,
      duration: 1.3,
      delay: 0.2,
      opacity: 0,
    });

    tl.from(".para", {
      x: -60,
      opacity: 0,
      duration: 1,
    });
  }, []);

  /**  const overlayRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleMouseEnter2 = (index) => {
    const overlay = overlayRefs[index].current;
    if (overlay) {
      gsap.to(overlay, {
        y: "-2%",
        duration: 0.3,
        opacity: 1,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave2 = (index) => {
    const overlay = overlayRefs[index].current;
    if (overlay) {
      gsap.to(overlay, {
        y: "-100%",
        duration: 0.3,
        opacity: 0,
        ease: "power2.in",
      });
    }
  };

  */

  const videoRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleMouseEnter = (index) => {
    const video = videoRefs[index].current;
    if (video) {
      video
        .play()
        .then(() => {
          // Video started playing successfully
        })
        .catch((error) => {
          console.error("Error playing video:", error);
        });
    }
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs[index].current;
    if (video) {
      video.pause();
      video.currentTime = 0; // Reset video to the beginning
    }
  };

  return (
    <>
      <div className="w-full h-auto bg-black overflow-hidden ">
        <div className="text-white w-fit h-fit flex gap-x-4 left-[90%] mt-5 relative bg-black ">
          <Link to="/">
            <h3 className="btnP cursor-pointer hover:text-gray-400 transition-all duration-500 hover:scale-[0.98]">
              Home
            </h3>
          </Link>
          <Link to="/about">
            <h3 className="btnP cursor-pointer hover:text-gray-400 transition-all duration-500 hover:scale-[0.98]">
              About
            </h3>
          </Link>
        </div>

        <div className="heading  relative text-white text-[120px] ml-8 -mt-2  cursor-default">
          Projects
        </div>
        <div className="para flex items-center mt-[-10px]">
          <img
            src={arrowIcon}
            className="w-[20px] rounded-full ml-8 mr-2 "
          ></img>
          <p className="text-white para-content cursor-default text-[16px]">
            Take a glimpse into my front-end development journey with these
            projects !
          </p>
        </div>

        {/* boxes */}

        <div className="parent grid grid-cols-2 gap-10 gap-y-40 justify-items-center mt-32 pb-16 text-white">
          {/* First box */}
          <motion.div
            className="project-box relative w-[600px]  h-fit border-[2px] border-green-400 rounded-lg p-2 shadow-glow1"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            // onMouseEnter={() => handleMouseEnter2(0)}
            // onMouseLeave={() => handleMouseLeave2(0)}
          >
            {/* <div
              // ref={overlayRefs[0]}
              className="project-overlay absolute rounded-[16px] translate-x-[-9px] p-3 translate-y-36  bg-black text-white bg-opacity-40 opacity-0 overflow-hidden transition-all duration-500"
              style={{
                width: "100%",
                height: "40%",
                bottom: 0,
              }}
            >
              HIIIIII
            </div> */}

            <motion.h3
              className="project-h3  relative -top-[46px] text-[28px]"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Bubble Game
            </motion.h3>
            <video
              className="-mt-8 rounded-md"
              ref={videoRefs[0]}
              src={bubbleGame}
              muted
              loop
              playsInline
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={() => handleMouseLeave(0)}
            />
          </motion.div>

          {/* Second box */}

          <motion.div
            className="project-box w-[600px] h-fit border-[2px] border-blue-500 rounded-lg p-2 shadow-glow2"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.h3
              className="project-h3 second-h3 relative -top-[46px] text-[28px]"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Cloud Hosting Website
            </motion.h3>
            <video
              className="-mt-8 rounded-md"
              ref={videoRefs[1]}
              src={cloudSite}
              muted
              loop
              playsInline
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={() => handleMouseLeave(1)}
            />
          </motion.div>

          {/* Third Box */}
          <motion.div
            className="project-box w-[600px] h-fit border-[2px] border-[#FFD700] rounded-lg p-2 shadow-glow3"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.h3
              className="project-h3 third-h3 relative -top-[46px] text-[28px]"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Youtube Clone
            </motion.h3>
            <video
              className="-mt-8 rounded-md"
              ref={videoRefs[2]}
              src={ytClone}
              muted
              loop
              playsInline
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={() => handleMouseLeave(2)}
            />
          </motion.div>
          {/* Fourth box */}

          <motion.div
            className="project-box w-[600px] h-fit border-[2px] border-pink-400 rounded-lg p-2 shadow-glow4"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.h3
              className="project-h3 fourth-h3 relative -top-[46px] text-[28px]"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Chizos
            </motion.h3>
            <video
              className="-mt-8 rounded-md"
              ref={videoRefs[3]}
              src={foodSite}
              muted
              loop
              playsInline
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={() => handleMouseLeave(3)}
            />
          </motion.div>

          {/* fifth box */}
          <motion.div
            className="project-box w-[600px] h-fit border-[2px] border-orange-400 rounded-lg p-2 shadow-glow5"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.h3
              className="project-h3 fifth-h3 relative -top-[46px] text-[28px]"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Scss Website
            </motion.h3>
            <video
              className="-mt-8 rounded-md"
              ref={videoRefs[4]}
              src={amazingShoes}
              muted
              loop
              playsInline
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={() => handleMouseLeave(4)}
            />
          </motion.div>

          {/* sixth box */}
          <motion.div
            className="project-box w-[600px] h-fit border-[2px] border-sky-400 rounded-lg p-2 shadow-glow6"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.h3
              className="project-h3 sixth-h3 relative -top-[46px] text-[28px]"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Creative Agency Website
            </motion.h3>
            <video
              className="-mt-8 rounded-md"
              ref={videoRefs[5]}
              src={resSite}
              muted
              loop
              playsInline
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={() => handleMouseLeave(5)}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Projects;
