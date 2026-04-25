import { useMemo } from "react";
import { QuadraticBezierLine } from "@react-three/drei";
import { projects } from "../data/projects";

interface TraceLinesProps {
  traceLines: [string, string][];
}

function getProjectPosition(
  projectId: string,
): [number, number, number] | null {
  const project = projects.find((p) => p.id === projectId);
  return project ? project.position : null;
}

function midpoint(
  a: [number, number, number],
  b: [number, number, number],
): [number, number, number] {
  return [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2 + 0.5, // lift the curve slightly
    (a[2] + b[2]) / 2,
  ];
}

export function TraceLines({ traceLines }: TraceLinesProps) {
  const lineData = useMemo(() => {
    return traceLines
      .map(([fromId, toId]) => {
        const from = getProjectPosition(fromId);
        const to = getProjectPosition(toId);
        if (!from || !to) return null;
        const mid = midpoint(from, to);
        return { from, mid, to };
      })
      .filter(Boolean);
  }, [traceLines]);

  if (lineData.length === 0) return null;

  return (
    <group position={[0, 0, 0.1]}>
      {lineData.map((line, index) => {
        if (!line) return null;
        return (
          <QuadraticBezierLine
            key={index}
            start={line.from}
            mid={line.mid}
            end={line.to}
            color="#ffffff"
            lineWidth={2}
            transparent
            opacity={0.9}
          />
        );
      })}
    </group>
  );
}