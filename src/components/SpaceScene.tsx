import { useState, useRef, Suspense, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { StarField } from "./StarField";
import { ProjectStars } from "./ProjectStars";
import { TraceLines } from "./TraceLines";
import { ProjectPanel } from "./ProjectPanel";
import { MobileGrid } from "./MobileGrid";
import { LoadingScreen } from "./LoadingScreen";
import { Hint } from "./Hint";
import { useIsMobile } from "../hooks/useIsMobile";
import { useWebGL } from "../hooks/useWebGL";
import { useSceneState } from "../hooks/useSceneState";
import type { Project } from "../data/projects";

interface SpaceCanvasProps {
  onProjectSelect?: (project: Project) => void;
  activeProject?: Project | null;
  traceLines: [string, string][];
  controlsRef: React.RefObject<CameraControls>;
}

function SpaceCanvas({
  onProjectSelect,
  activeProject,
  traceLines,
  controlsRef,
}: SpaceCanvasProps) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 0, 15], fov: 60, near: 0.1, far: 1000 }}
      style={{ background: "#000", width: "100vw", height: "100vh" }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <StarField />
        <ProjectStars
          onProjectClick={onProjectSelect}
          activeProject={activeProject}
        />
        <TraceLines traceLines={traceLines} />
        <CameraControls
          ref={controlsRef}
          makeDefault
          mouseButtons={{
            left: activeProject ? 0 : 1,
            middle: 0,
            right: 0,
            wheel: activeProject ? 0 : 1,
          }}
          touches={{
            one: activeProject ? 0 : 1,
            two: 0,
            three: 0,
          }}
        />
      </Suspense>
    </Canvas>
  );
}

export function SpaceScene() {
  const isMobile = useIsMobile();
  const hasWebGL = useWebGL();
  const { state, selectProject, closePanel } = useSceneState();
  const controlsRef = useRef<CameraControls>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hide loading screen after scene ready
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (state.panelOpen) {
          closePanel();
        }
        // Always return to overview
        controlsRef.current?.setLookAt(0, 0, 15, 0, 0, 0, true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.panelOpen, closePanel]);

  // Camera flight when project selected
  useEffect(() => {
    if (state.activeProject && controlsRef.current) {
      const [x, y, z] = state.activeProject.position;
      controlsRef.current.setLookAt(x, y, z + 4, x, y, z, true);
    }
  }, [state.activeProject]);

  // Determine what to render
  if (isMobile || !hasWebGL) {
    return <MobileGrid />;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen">
      {isLoading && <LoadingScreen />}
      <Hint />
      <SpaceCanvas
        onProjectSelect={selectProject}
        activeProject={state.activeProject}
        traceLines={state.traceLines}
        controlsRef={controlsRef}
      />
      {state.activeProject && (
        <ProjectPanel
          project={state.activeProject}
          isOpen={state.panelOpen}
          onClose={closePanel}
        />
      )}
    </div>
  );
}