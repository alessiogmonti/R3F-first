/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const lightMaterial = new THREE.MeshStandardMaterial({
   color: 'rgba(20,100,200,1)',
   metalness: 1.0,
   roughness: 0.0,
  //  emissive: 'rgba(10,15,75,1)',
  //  emissiveIntensity: 0.2,
   flatShading: true,
   shininess: 1,
   side: THREE.DoubleSide,
   transparent: false,
   opacity: 1,
});

const shadowMaterial = new THREE.MeshStandardMaterial({
  color: 'rgba(80,150,200,1)',
  metalness: 0.9,
  roughness: 0.3,
  opacity: 1,
  transparent: false,
  side: THREE.DoubleSide,
})  

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF("/ioDraco.gltf")
  useFrame(() => (group.current.rotation.y += 0.004))
  return (
      <group ref={group} {...props} dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes['Node-Mesh'].geometry} material={shadowMaterial} />
        <mesh castShadow receiveShadow geometry={nodes['Node-Mesh_1'].geometry} material={lightMaterial} />
        <mesh castShadow receiveShadow geometry={nodes['Node-Mesh_2'].geometry} material={materials['diffuse_0_0_0_255-2']} />
      </group>
  )
}

// export const Background = () => {
//   const TEXTURE_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";
//   const textureLoader = new THREE.TextureLoader();
//   const gridTexture = textureLoader.load(TEXTURE_PATH);

//   const geometry = new THREE.PlaneGeometry(1000, 2000, 240, 240);
//   const material = new THREE.MeshBasicMaterial({
//     // Add the texture to the material
//     map: gridTexture,
//   });

//   const plane = new THREE.Mesh(geometry, material);
//   plane.rotation.x = -Math.PI * 0.5;
//   plane.position.y = 0.0;
//   plane.position.z = 0.15;

//   return (
//     <plane/>
//   )
// }

useGLTF.preload('/ioDraco.gltf')
