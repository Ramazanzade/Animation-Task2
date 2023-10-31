import React, { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Model = () => {
  const gltfPath = '../Asset/imge/2.glb';
  const gltfRef = useRef();
  const { camera, gl } = useThree();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(gltfPath, (gltf:any) => {
      gltfRef.current = gltf.scene;
    });
  }, [gltfPath]);

  useEffect(() => {
    if (camera && gl) {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.enableDamping = true;
      controls.update();

      return () => {
        controls.dispose();
      };
    }
  }, [camera, gl]);

  return (
    <group>
      {gltfRef.current && <primitive object={gltfRef.current} />}
    </group>
  );
};

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model />
    </Canvas>
  );
};

export default App;
   











