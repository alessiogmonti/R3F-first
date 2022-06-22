import React, { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Environment, BakeShadows, ContactShadows, useFBO, Stage, Effects } from "@react-three/drei"
import Model from "./IoBDraco.jsx"
import { AdditiveBlendingShader } from './shaders/AdditiveBlendingShader'
import { VolumetricLightShader } from './shaders/VolumetricLightShader'
import { FXAAShader } from 'three-stdlib'
import './App.css'

const DEFAULT_LAYER = 0
const OCCLUSION_LAYER = 1

function Post() {
  const { gl, camera, size } = useThree()
  const occlusionRenderTarget = useFBO()
  const occlusionComposer = useRef()
  const composer = useRef()
  camera.far = 10000;
  useFrame(() => {
    camera.layers.set(OCCLUSION_LAYER)
    occlusionComposer.current.render()
    camera.layers.set(DEFAULT_LAYER)
    composer.current.render()
  }, 1)
  return (
    <>
      <mesh layers={OCCLUSION_LAYER} position={[-1, 45, -20]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial />
      </mesh>

      <Effects ref={occlusionComposer} disableGamma disableRender args={[gl, occlusionRenderTarget]} renderToScreen={false}>
        <shaderPass args={[VolumetricLightShader]} needsSwap={false} />
      </Effects>
      <Effects ref={composer} disableRender>
        <shaderPass args={[AdditiveBlendingShader]} uniforms-tAdd-value={occlusionRenderTarget.texture} />
        <shaderPass args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
      </Effects>
    </>
  )
}

// const Marker = () => {
//   const [clicked, setClicked] = useState(false)
//   const markerRef = useRef();
//   const vec = new THREE.Vector3(0, 0, 0)

//   useFrame(state => {
//     if(clicked){
//       state.camera.lookAt(markerRef.current.position)
//       state.camera.position.lerp(vec.set(xPosition, yPosition, zPosition), 0.1)
//       state.camera.updateProjectionMatrix()
//     } return null
//   })


//   return(
//     <Model ref={markerRef}
//            onClick={()=> setClicked(!clicked)}/>
//   )
// }

function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-25, 40, 40], fov: 45, near: 0.001 }} onCreated={(state) => (state.gl.shadowMap.autoUpdate = false)}>
      <color attach="background" args={["black"]} />
      {/* <spotLight position={[1, -100, 100]} angle={0.9} penumbra={1} intensity={1} castShadow shadow-mapSize={[2048, 2048]} /> */}
      {/* <spotLight position={[500, -30, 90]} intensity={3} angle={0.1} penumbra={2} castShadow shadow-mapSize={[1024, 1024]} /> */}
      {/* <ambientLight intensity={1} /> */}
      <Suspense fallback={null}>
        <Stage intensity={3}>
        {/* <PresentationControls config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 600 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}> */}
          <Model frames={1} limit={50} position={[0, 0, 0]} scale={1} castShadow receiveShadow/>
          <ContactShadows frames={1} rotation-x={[Math.PI / 2]} position={[0, -0.4, 0]} far={1} width={1.5} height={1.5} blur={3} />
        {/* </PresentationControls> */}
        <Environment files={"/aircraft.hdr"}  background={false} resolution={256}/>
        <BakeShadows />
        </Stage>
        {/* <Post/> */}
      </Suspense>
      <OrbitControls target={Model.position} zoomSpeed={0.5} autoRotate autoRotateSpeed={0.001} rotateSpeed={2} dampingFactor={0.5} minPolarAngle={-Math.PI / 2} maxPolarAngle={Math.PI / 1.7} makeDefault />
    </Canvas>
  );
}

export default App
