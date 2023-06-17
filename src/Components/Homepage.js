import { Bodies, Engine, Render, World } from "matter-js";
import React, { useEffect, useRef } from "react";

const Homepage = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    // Create a Matter.js engine and renderer
    engineRef.current = Engine.create();
    renderRef.current = Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: "transparent",
        wireframes: false,
      },
    });

    // Add objects to the world
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
    });

    // add all of the bodies to the world
    World.add(engineRef.current.world, [boxA, boxB, ground]);

    // Start the engine and renderer
    Render.run(renderRef.current);
    Engine.run(engineRef.current);

    // Cleanup
    return () => {
      Render.stop(renderRef.current);
      World.clear(engineRef.current.world);
      Engine.clear(engineRef.current);
      renderRef.current = null;
      engineRef.current = null;
    };
  }, []);

  return (
    <div id="homepage-main">
      ppp
      <div ref={sceneRef} />
    </div>
  );
};

export default Homepage;
