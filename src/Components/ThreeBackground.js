import React, { useEffect } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const objectDistance = 4;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer's DOM element to the document body
    document.body.appendChild(renderer.domElement);

    // Set up a colored background for the scene
    const backgroundColor = 0x000000; // Black background
    scene.background = new THREE.Color(backgroundColor);

    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);
    camera.position.z = 6;
    cameraGroup.add(camera);

    // Add particles to the scene
    const particlesCount = 2000;
    const position = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      position[i * 3 + 0] = (Math.random() - 0.5) * 30;
      position[i * 3 + 1] = (Math.random() - 0.5) * 25;
      position[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(position, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("orange"),
      // opacity: 1,
      // alpha: true,
      transparent : true,
      sizeAttenuation:true,
      size: 0.035,
    });

    console.log(particleMaterial);

    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    // lights setup

    // const ambientLight = new THREE.AmbientLight(0xffffff, 100);
    // ambientLight.position.set(1, 1, -2);
    // scene.add(ambientLight);

    // Update the camera aspect ratio on window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    let scrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
    });

    const cursor = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      cursor.x = e.clientX / window.innerWidth - 0.5;
      cursor.y = e.clientY / window.innerHeight - 0.5;
    });

    // Initial render
    const clock = new THREE.Clock();
    let previousTime = 0;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;
      camera.position.y = (-scrollY / window.innerHeight) * objectDistance;

      const parallaxX = cursor.x;
      const parallaxY = -cursor.y;

      cameraGroup.position.x +=
        (parallaxX - cameraGroup.position.x) * 10 * deltaTime;
      cameraGroup.position.y +=
        (parallaxY - cameraGroup.position.y) * 10 * deltaTime;

      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
};

export default ThreeBackground;
