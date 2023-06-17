import { Bodies, Composite, Engine, Render, Runner } from "matter-js";
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
    Render.run(renderRef.current);
    var runner = Runner.create();
    Runner.run(runner, engineRef.current);

    // Add objects to the world
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
    });

    // add all of the bodies to the world
    Composite.add(engineRef.current.world, [boxA, boxB, ground]);

    // run the renderer
    Render.run(renderRef.current);

    // run the engine
    Runner.run(runner, engineRef.current);

    // Cleanup
    return () => {
      Render.stop(renderRef.current);
      Composite.clear(engineRef.current.world);
      Engine.clear(engineRef.current);
      renderRef.current = null;
      engineRef.current = null;
    };
  }, []);

  return (
    <div id="homepage-main">
      <div ref={sceneRef} />
      <div id="homepage-main-elelments"></div>
    </div>
  );
};

export default Homepage;
