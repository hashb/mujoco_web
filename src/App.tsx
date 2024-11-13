import { Canvas } from "@react-three/fiber";
import { Mujoco } from "./components/Mujoco";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import "./App.css";
import "./index.css";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
const App = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows="soft"
        dpr={window.devicePixelRatio}
        style={{
          borderRadius: "inherit",
          width: window.innerWidth,
          height: window.innerHeight
        }}
        onCreated={(state) => {
          state.scene.background = new THREE.Color(0x264059);
        }}
      >
        {/* <AdaptiveDpr /> */}
        <ambientLight color={0xffffff} intensity={0.1} />
        <spotLight
          position={[0, 2, 2]}
          angle={0.15}
          penumbra={1}
          decay={1}
          intensity={3.14}
        />
        <PerspectiveCamera makeDefault position={[2.0, 1.7, 1.7]} fov={45} />
        <OrbitControls makeDefault />
        <Mujoco sceneUrl={"humanoid.xml"} />

        {/* Post-Processing Effects */}
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
export default App;
