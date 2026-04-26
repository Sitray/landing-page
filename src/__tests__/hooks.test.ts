import { describe, it, expect } from "vitest";
import { projects, type Project } from "../data/projects";

// Test traceLines derivation logic from useSceneState
// No deriveTraceLines - traceLines stored as transitions in state

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