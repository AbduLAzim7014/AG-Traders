// // src/components/Belan3D.jsx
// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, MeshWobbleMaterial } from "@react-three/drei";

// export default function Belan3D() {
//   return (
//     <Canvas style={{ height: "100%", width: "100%" }}>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} />
//       <Suspense fallback={null}>
//         <mesh rotation={[0, 1, 0]} position={[0, 0, 0]}>
//           <cylinderGeometry args={[0.2, 0.2, 3, 32]} />
//           <MeshWobbleMaterial color="#EAB308" speed={2} factor={0.3} />
//         </mesh>
//       </Suspense>
//       <OrbitControls enableZoom={false} />
//     </Canvas>
//   );
// }
