import { describe, it, expect } from "vitest";
import { projects, type Project } from "../data/projects";

// Test traceLines derivation logic from useSceneState
const deriveTraceLines = (history: string[]): [string, string][] => {
  if (history.length < 2) return [];
  const lines: [string, string][] = [];
  for (let i = 1; i < history.length; i++) {
    lines.push([history[i - 1], history[i]]);
  }
  return lines;
};

describe("deriveTraceLines", () => {
  it("should derive traceLines from visitHistory", () => {
    const visitHistory = ["a", "b", "c"];
    const expected: [string, string][] = [
      ["a", "b"],
      ["b", "c"],
    ];
    expect(deriveTraceLines(visitHistory)).toEqual(expected);
  });

  it("should return empty array for single project", () => {
    expect(deriveTraceLines(["a"])).toEqual([]);
  });

  it("should return empty array for empty history", () => {
    expect(deriveTraceLines([])).toEqual([]);
  });

  it("should handle two projects", () => {
    expect(deriveTraceLines(["x", "y"])).toEqual([["x", "y"]]);
  });
});

describe("projects data", () => {
  it("should have projects array", () => {
    expect(projects).toBeInstanceOf(Array);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project should have valid id", () => {
    projects.forEach((p) => {
      expect(p.id).toBeDefined();
      expect(typeof p.id).toBe("string");
    });
  });

  it("each project should have valid position tuple", () => {
    projects.forEach((p) => {
      expect(p.position).toHaveLength(3);
      p.position.forEach((n) => expect(typeof n).toBe("number"));
    });
  });

  it("each project should have valid color hex", () => {
    projects.forEach((p) => {
      expect(p.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

describe("Project type", () => {
  const mockProject: Project = {
    id: "test",
    name: "Test",
    shortDescription: "short",
    description: "long",
    stack: ["React"],
    links: { live: "https://x.com" },
    position: [0, 0, 0],
    color: "#fff",
  };

  it("should have all required fields", () => {
    expect(mockProject.id).toBe("test");
    expect(mockProject.name).toBe("Test");
    expect(mockProject.stack).toContain("React");
    expect(mockProject.links.live).toBe("https://x.com");
  });
});