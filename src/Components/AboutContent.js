import React, { useRef, useEffect, useState } from "react";
import music from "/assets/interstellar_stay.mp3";
import gsap from "gsap";
import play from "/assets/volume-up.png";
import mute from "/assets/silent.png";
import reactIcon from "/assets/1174949_js_react js_logo_react_react native_icon.png";
import jsIcon from "/assets/4375017_js_logo_node_icon.png";
import javaIcon from "/assets/java.png";
import htmlIcon from "/assets/html-5.png";
import cssIcon from "/assets/css-3.png";
import tailwindIcon from "/assets/tailwind-css-icon.png";
import threejsIcon from "/assets/three-js-icon.png";
import { Link } from "react-router-dom";

const AboutContent = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicPlayedBefore, setMusicPlayedBefore] = useState(
    localStorage.getItem("musicPlayedBefore") === "true"
  );

  useEffect(() => {
    // Adjust the volume once the component is mounted
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }

    // If music has been played before, play it
    if (musicPlayedBefore && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }

    // Check if the music is paused after the component mounts
    if (audioRef.current && audioRef.current.paused) {
      setIsPlaying(false);
    }

    // Clean up function to pause audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [musicPlayedBefore]); // Empty dependency array to run only once on mount

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
        localStorage.setItem("musicPlayedBefore", "true");
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <div className="text-white flex gap-x-4 ml-8 mt-8 absolute ">
        <Link to="/">
          <h3 className="btnP cursor-pointer hover:text-gray-400 transition-all duration-500 hover:scale-[0.98]">
            Home
          </h3>
        </Link>
        <Link to="/projects">
          <h3 className="btnP cursor-pointer hover:text-gray-400 transition-all duration-500 hover:scale-[0.98]">
            Projects
          </h3>
        </Link>
      </div>

      <audio ref={audioRef} src={music} preload="none" loop />
      <button
        className=" bounce-animation right-6 top-6 hover:shadow-none  music-btn rounded-full w-[32px] h-[32px]  hover:scale-[0.97] shadow-md shadow-glow-btn  transition-all duration-500  absolute  "
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <img src={play}></img>
        ) : (
          <img className="" src={mute}></img>
        )}
      </button>

      <div className="text-white w-full h-full flex items-center justify-between px-8">
        <div className="info">
          <div className="glass-card card1 w-[400px] h-[300px]  duration-500 hover:bg-transparent">
            <p className="leading-8 text-lg cursor-default para-about ">
              <span className="text-gray-400 font-bold text-[22px]">
                Hi there!
              </span>{" "}
              I'm{" "}
              <span className="font-bold text-orange-400 text-[22px]">
                Keshav
              </span>
              , a second-year Information Technology student ,also pursuing{" "}
              <span className="font-black text-gray-400">Data Science</span> at
              IIT Madras. This Portfolio is a window into my journey, showcasing
              my projects, skills, and passion for technology. Feel free to
              explore and connect with me – I'm always up for a chat about Code,
              data, or even a friendly
              <span className="text-green-400 font-semibold"> Chess</span> game!
            </p>
          </div>
        </div>

        <div className="skills">
          <div className="glass-card card2 w-[402px] h-[300px] duration-500 bg-transparent">
            <h1 className="text-center h1 cursor-default text-cyan-400 -mt-1">
              SKILLS
            </h1>
            <div className="flex items-center justify-around p-4 gap-x-32 -mt-2">
              <ul className="leading-[50px]">
                <li>
                  <img src={reactIcon} className="inline-block w-5 mr-2"></img>
                  React
                </li>
                <li>
                  <img src={jsIcon} className="inline-block w-5 mr-2"></img>
                  Javascript
                </li>
                <li>
                  <img src={jsIcon} className="inline-block w-5 mr-2"></img>
                  Node.js
                </li>
                <li>
                  <img src={javaIcon} className="inline-block w-5 mr-2"></img>
                  Java
                </li>
              </ul>

              <ul className="leading-[50px]">
                <li>
                  <img src={htmlIcon} className="inline-block w-5 mr-2"></img>
                  HTML
                </li>
                <li>
                  <img src={cssIcon} className="inline-block w-5 mr-2"></img>CSS
                </li>
                <li>
                  <img
                    src={tailwindIcon}
                    className="inline-block w-5 mr-2"
                  ></img>
                  Tailwind
                </li>
                <li>
                  <img
                    src={threejsIcon}
                    className="inline-block w-5 mr-2 bg-slate-100 rounded-sm"
                  ></img>
                  Three.js
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
