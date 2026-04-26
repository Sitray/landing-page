import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { projects, type Project } from "../data/projects";

interface ProjectStarsProps {
  onProjectClick?: (project: Project) => void;
  activeProject?: Project | null;
  visitedProjects?: Set<string>;
}

function ProjectStar({
  project,
  isActive,
  visited,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  visited: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animate scale and emissive on hover
  useFrame((state) => {
    if (!meshRef.current) return;

    // Scale animation - smoother
    const targetScale = hovered ? 1.4 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08,
    );

    // Pulse animation when hovered
    if (hovered && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const pulse = Math.sin(state.clock.elapsedTime * 5) * 0.2 + 0.8;
      material.emissiveIntensity = pulse;
    }
  });

  return (
    <group>
      {/* Ring indicator for visited stars */}
      {visited && !isActive && (
        <mesh position={project.position} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.4, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

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
          emissiveIntensity={
            isActive ? 1.0 : hovered ? 0.9 : visited ? 0.5 : 0.4
          }
        />
        <Html
          position={[1.5, 0, 0]}
          center
          distanceFactor={12}
          style={{
            pointerEvents: "none",
            minWidth: "200px",
          }}
        >
          <div
            className={`rounded-lg p-3 transition-all duration-200 ${
              hovered
                ? "bg-zinc-900/95 text-white"
                : "bg-black/60 text-white opacity-0"
            }`}
          >
            <div className="font-semibold text-lg mb-1">{project.name}</div>
            <div className="text-zinc-400 text-sm mb-2">
              {project.shortDescription}
            </div>
            <div className="flex flex-wrap gap-1">
              {project.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs bg-zinc-800 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div
            className={`absolute -bottom-8 left-0 right-0 text-center text-xs text-zinc-500 transition-all duration-200 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Click for selecting Targeted system
          </div>
        </Html>
      </mesh>
    </group>
  );
}

export function ProjectStars({
  onProjectClick,
  activeProject,
  visitedProjects = new Set(),
}: ProjectStarsProps) {
  return (
    <group>
      {projects.map((project) => (
        <ProjectStar
          key={project.id}
          project={project}
          isActive={activeProject?.id === project.id}
          visited={visitedProjects.has(project.id)}
          onClick={() => onProjectClick?.(project)}
        />
      ))}
    </group>
  );
}
