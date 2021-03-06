/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'

const lightMaterial = new THREE.MeshStandardMaterial({
   color: 'rgba(20,100,220,1)',
   metalness: 0.9,
   roughness: 0.1,
  //  emissive: 'rgba(10,15,75,1)',
  //  emissiveIntensity: 0.2,
   flatShading: true,
   shininess: 1,
   side: THREE.DoubleSide,
   transparent: false,
   opacity: 1,
});

const Head_Material = new THREE.MeshStandardMaterial({
  color: 'rgba(5,90,20,1)',
  metalness: 0.8,
  roughness: 0.1,
  opacity: 1,
  shininess: 0.9,
  transparent: false,
  side: THREE.DoubleSide,
})  

const TStrut_Material = new THREE.MeshStandardMaterial({
  color: 'rgba(5,90,20,1)',
  metalness: 0.9,
  roughness: 0.2,
  opacity: 1,
  shininess: 1,
  transparent: false,
  side: THREE.DoubleSide,
})  


//node-mesh = back
//node-mesh4 = t
//node-mesh5 = head
//node-mesh6 = front

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/ioBDraco.gltf')
  useFrame(() => (group.current.rotation.y += 0.004))
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes['Node-Mesh'].geometry} material={lightMaterial} />
      <mesh castShadow receiveShadow geometry={nodes['Node-Mesh_1'].geometry} material={materials.Plastic} />
      <mesh castShadow receiveShadow geometry={nodes['Node-Mesh_2'].geometry} material={lightMaterial} />
      <mesh castShadow receiveShadow geometry={nodes['Node-Mesh_3'].geometry} material={lightMaterial} /> 
      <mesh castShadow receiveShadow geometry={nodes['Node-Mesh_4'].geometry} material={TStrut_Material} />
      <mesh castShadow receiveShadow geometry={nodes['Node-Mesh_5'].geometry} material={Head_Material} /> 
      <mesh castShadow receiveShadow geometry={nodes['Node-Mesh_6'].geometry} material={lightMaterial} />
    </group>
  )
}

useGLTF.preload('/ioBDraco.gltf')
