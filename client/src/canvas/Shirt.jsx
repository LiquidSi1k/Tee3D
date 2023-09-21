import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(
    snap.logoDecal,
    undefined,
    (texture) => {
      // Called when the texture is loaded successfully
      texture.anisotropy = 16;
    },
    (error) => {
      // Called when there's an error loading the texture
      console.error("Error loading logo texture:", error);
    }
  );

  const fullTexture = useTexture(
    snap.fullDecal,
    undefined,
    (texture) => {
      // Called when the texture is loaded successfully
      texture.anisotropy = 16;
    },
    (error) => {
      // Called when there's an error loading the texture
      console.error("Error loading full texture:", error);
    }
  );

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};
export { Shirt };
