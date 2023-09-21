import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      position={[0, 0, -0.14]}
      temporal
      frames={60}
      alphaTest={0.85}
      scae={10}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <RandomizedLight
        amount={8}
        radius={9}
        intensity={2}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={6}
        radius={5}
        intensity={2}
        ambient={0.7}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export { Backdrop };
