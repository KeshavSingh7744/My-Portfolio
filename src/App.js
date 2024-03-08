import React from "react";
import ReactDOM from "react-dom";
import { useEffect , useState} from "react";
import ThreeBackground from "./Components/ThreeBackground";
import "../style.css";
import { Canvas } from "@react-three/fiber";
import Text from "./Components/TextThreeD";
import Button from "./Components/Button";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Projects from "./Components/Projects";
import Greet from "./Components/Greet";
import About from "./Components/About";


const App = () => {

  const [threeBackgroundRendered, setThreeBackgroundRendered] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setThreeBackgroundRendered(true);
    }, 500);

    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Canvas>
        <Text />
        <ThreeBackground onRendered={() => setThreeBackgroundRendered(true)} />
      </Canvas>


      {threeBackgroundRendered && (
        <>
      <Greet />

      <div className="button-container">
        <Link to="/projects">
          <Button text="Projects" position="left" />
        </Link>
        <Link to='/about'>
        <Button text="About" position="right" />
        </Link>
      </div>
      </>
      )}
    </>
  );
};

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);


ReactDOM.createRoot(document.getElementById('root')).render(<Root />);

