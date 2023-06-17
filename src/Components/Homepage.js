import {
  Bodies,
  Composite,
  Constraint,
  Engine,
  Render,
  Runner,
} from "matter-js";
import Body from "matter-js/src/body/Body";
import React, { useEffect, useRef } from "react";

const Homepage = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    let w = window.innerWidth;
    let h = window.innerHeight;

    let car = function (xx, yy, width, height, wheelSize) {
      var group = Body.nextGroup(true),
        wheelBase = 20,
        wheelAOffset = -width * 0.5 + wheelBase,
        wheelBOffset = width * 0.5 - wheelBase,
        wheelYOffset = 0;

      var car = Composite.create({ label: "Car" }),
        body = Bodies.rectangle(xx, yy, width, height, {
          collisionFilter: {
            group: group,
          },
          chamfer: {
            radius: height * 0.5,
          },
          density: 0.0002,
        });

      var wheelA = Bodies.circle(
        xx + wheelAOffset,
        yy + wheelYOffset,
        wheelSize,
        {
          collisionFilter: {
            group: group,
          },
          friction: 0.8,
        }
      );

      var wheelB = Bodies.circle(
        xx + wheelBOffset,
        yy + wheelYOffset,
        wheelSize,
        {
          collisionFilter: {
            group: group,
          },
          friction: 0.8,
        }
      );

      var axelA = Constraint.create({
        bodyB: body,
        pointB: { x: wheelAOffset, y: wheelYOffset },
        bodyA: wheelA,
        stiffness: 1,
        length: 0,
      });

      var axelB = Constraint.create({
        bodyB: body,
        pointB: { x: wheelBOffset, y: wheelYOffset },
        bodyA: wheelB,
        stiffness: 1,
        length: 0,
      });

      Composite.addBody(car, body);
      Composite.addBody(car, wheelA);
      Composite.addBody(car, wheelB);
      Composite.addConstraint(car, axelA);
      Composite.addConstraint(car, axelB);

      return car;
    };

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

    // add all of the bodies to the world
    Composite.add(engineRef.current.world, [boxA, boxB]);
    Composite.add(engineRef.current.world, [
      // walls
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
    ]);

    var scale = 0.9;
    Composite.add(
      engineRef.current.world,
      car(150, 100, 150 * scale, 30 * scale, 30 * scale)
    );

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
