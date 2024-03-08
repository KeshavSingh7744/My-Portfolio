import React, { useRef, useEffect, useState } from "react";
import {  Text3D, useTexture } from "@react-three/drei";
import helvetikerRegular from "/assets/helvetiker_regular.typeface.json";
import * as THREE from "three";

const Text = () => {
  const textRef = useRef();
  // const groupRef = useRef();
  const matcapTexture = useTexture(
    "https://raw.githubusercontent.com/nidorx/matcaps/master/256/BC928D_F9E2D6_654445_835A51-256px.png"
  );

  useEffect(() => {
    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const swayMagnitude = 0.14;
      const swaySpeed = 2.5;
      if (textRef.current) {
        textRef.current.position.y =
          Math.sin(elapsedTime * swaySpeed) * swayMagnitude;
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  

  return (
    <>
      

      <Text3D
        ref={textRef}
        position={[-1.7, 0, 0]}
        font={helvetikerRegular}
        size={0.8}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        Keshav
        <meshBasicMaterial map={matcapTexture} />
      </Text3D>
    </>
  );
};

export default Text;
