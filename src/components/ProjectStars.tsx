import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { projects, type Project } from "../data/projects";

interface ProjectStarsProps {
  onProjectClick?: (project: Project) => void;
  activeProject?: Project | null;
}

function ProjectStar({
  project,
  isActive,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animate scale on hover
  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1,
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={project.position}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial
        color={project.color}
        emissive={project.color}
        emissiveIntensity={hovered || isActive ? 0.8 : 0.4}
      />
      <Html
        position={[0, 0.5, 0]}
        center
        distanceFactor={12}
        style={{
          pointerEvents: "none",
        }}
      >
        <div className="bg-black/60 text-white px-3 py-1 rounded-lg text-base font-medium whitespace-nowrap">
          {project.name}
        </div>
      </Html>
    </mesh>
  );
}

export function ProjectStars({
  onProjectClick,
  activeProject,
}: ProjectStarsProps) {
  return (
    <group>
      {projects.map((project) => (
        <ProjectStar
          key={project.id}
          project={project}
          isActive={activeProject?.id === project.id}
          onClick={() => onProjectClick?.(project)}
        />
      ))}
    </group>
  );
}
