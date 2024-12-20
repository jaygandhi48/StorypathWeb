import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
//Import three 3d models.
import Place from "../../public/Place";
import Campus from "../../public/Campus";
import Museum from "../../public/Museum";

/**
 * ThreeDcomponent dynamically renders one of three 3D models (Place, Campus, Museum)
 * based on the `componentIdentifier` prop using React Three Fiber and Drei utilities.
 *
 * Features:
 * - Utilizes the `Canvas` component from @react-three/fiber to create a 3D rendering space.
 * - Supports camera controls using `OrbitControls` for smooth interactions (limited panning and rotation).
 * - The displayed model (Place, Campus, or Museum) is determined by the value of `componentIdentifier`.
 * - 3D models are rendered using a lazy-loading pattern with `Suspense`, ensuring graceful loading.
 * - Adds environmental lighting with an ambient light source and an `Environment` preset to simulate a sunset atmosphere.
 * - The `componentIdentifier` prop:
 *   - `0`: Renders the Place model with a scale of `[0.13, 0.13, 0.13]`.
 *   - `1`: Renders the Campus model with a scale of `[0.13, 0.13, 0.13]`.
 *   - Any other value: Renders the Museum model with a scale of `[0.5, 0.5, 0.5]`.
 *
 * Props:
 * @param {number} componentIdentifier - Determines which 3D model to render (0: Place, 1: Campus, other: Museum).
 *
 * Example usage:
 * @example
 * return (
 *   <ThreeDcomponent componentIdentifier={0} />
 * )
 *
 * Dependencies:
 * - `@react-three/fiber` for the 3D canvas and rendering.
 * - `@react-three/drei` for environmental effects and controls (OrbitControls, Environment).
 * - 3D models (Place, Campus, Museum) must be imported and provided in the appropriate paths.
 */
function ThreeDcomponent({ componentIdentifier }) {
  return (
    <>
      <Canvas
        className="w-full h-full"
        camera={{
          position: [0, 2, 5], // Set initial camera position in the 3D space
          fov: 75,
        }}
      >
        <ambientLight intensity={1.5} />
        <OrbitControls
          enableRotate={true}
          enablePan={false}
          //Limit certain rotation angles.
          maxAzimuthAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 2}
        />
        {/* Suspense handles the loading state of model. */}
        <Suspense fallback={null}>
          {componentIdentifier == 0 ? (
            <Place
              scale={[0.13, 0.13, 0.13]}
              rotation={[0, -Math.PI / 2, 0]}
              position={[0, 1, 0]}
            />
          ) : componentIdentifier == 1 ? (
            <Campus
              scale={[0.13, 0.13, 0.13]}
              rotation={[0, -Math.PI / 2, 0]}
            />
          ) : (
            <Museum scale={[0.5, 0.5, 0.5]} rotation={[0, -Math.PI / 2, 0]} />
          )}
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </>
  );
}

export default ThreeDcomponent;
