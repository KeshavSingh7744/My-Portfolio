import React, { useEffect} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const Galaxy = () => {
  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer's DOM element to the document body
    document.body.appendChild(renderer.domElement);

    // Set up a colored background for the scene
    const backgroundColor = "#0B0B0B"; // Black background
    scene.background = new THREE.Color(backgroundColor);

    const controls = new OrbitControls(camera, renderer.domElement);

    /**
     * Galaxy
     */
    const parameters = {};
    parameters.count = 100000;
    parameters.size = 0.02;
    parameters.radius = 12;
    parameters.branches = 3;
    parameters.spin = 1;
    parameters.randomness = 0.2;
    parameters.randomnessPower = 4;
    parameters.insideColor = "#ff6030";
    parameters.outsideColor = "#1b3984";

    let geometry = null;
    let material = null;
    let points = null;

    const generateGalaxy = () => {
      // Destroy old galaxy
      if (points !== null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }

      /**
       * Geometry
       */
      geometry = new THREE.BufferGeometry();

      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        // Position
        const i3 = i * 3;

        const radius = Math.random() * parameters.radius;

        const spinAngle = radius * parameters.spin;
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;
        const randomY =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;
        const randomZ =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      /**
       * Material
       */
      material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      /**
       * Points
       */
      points = new THREE.Points(geometry, material);
      scene.add(points);

      points.rotation.x = Math.PI / 4;
    };

    generateGalaxy();

    // particles(stars)

    const objectDistance = 4;

    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);
    // camera.position.z = 6;
    cameraGroup.add(camera);

    
    const particlesCount = 2000;
    const position = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      position[i * 3 + 0] = (Math.random() - 0.5) * 80;
      position[i * 3 + 1] = (Math.random() - 0.5) * 90;
      position[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(position, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("mediumpurple"),
      alpha: true,
      transparent: true,
      sizeAttenuation: true,
      size: 0.06,
    });

    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    let scrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
    });

    const cursor = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      cursor.x = e.clientX / window.innerWidth - 0.5;
      cursor.y = e.clientY / window.innerHeight - 0.5;
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    /**
     * Camera
     */

    cameraGroup.position.set(-1, 0, 15);

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    let previousTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;
      camera.position.y = (-scrollY / window.innerHeight) * objectDistance;

      const parallaxX = cursor.x;
      const parallaxY = -cursor.y;

      cameraGroup.position.x +=
        (parallaxX - cameraGroup.position.x) * 2 * deltaTime;
      cameraGroup.position.y +=
        (parallaxY - cameraGroup.position.y) * 2 * deltaTime;

      points.rotation.y += -0.003;

      particles.rotation.x += 0.0002;
      particles.rotation.y += 0.0002;
      

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
};

export default Galaxy;
