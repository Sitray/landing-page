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
  offsetIndex: number = 0,
): [number, number, number] {
  // Lift higher and offset duplicates to avoid overlap
  const baseLift = 1.2;
  const offsetLift = offsetIndex * 0.4;
  return [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2 + baseLift + offsetLift,
    (a[2] + b[2]) / 2,
  ];
}

export function TraceLines({ traceLines }: TraceLinesProps) {
  const lineData = useMemo(() => {
    const seenPairs = new Map<string, number>();
    
    return traceLines
      .map(([fromId, toId]) => {
        const from = getProjectPosition(fromId);
        const to = getProjectPosition(toId);
        if (!from || !to) return null;

        // Normalize pair to detect duplicates (A→B same as B→A)
        const pairKey = [fromId, toId].sort().join("-");
        const count = seenPairs.get(pairKey) || 0;
        seenPairs.set(pairKey, count + 1);

        // Offset duplicates slightly to avoid overlap
        const offsetIndex = count;
        
        const mid = midpoint(from, to, offsetIndex);
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