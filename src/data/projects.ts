export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  stack: string[];
  links: {
    live?: string;
    github?: string;
  };
  position: [number, number, number];
  color: string;
  size?: number;
}

export const projects: Project[] = [
  {
    id: "project-nova",
    name: "Nova",
    shortDescription: "Real-time analytics dashboard",
    description: "A real-time analytics dashboard for monitoring metrics.",
    stack: ["React", "TypeScript", "Supabase"],
    links: {
      live: "https://nova.example.com",
      github: "https://github.com/user/nova",
    },
    position: [0, 0, 0],
    color: "#6366f1",
  },
  {
    id: "project-pulse",
    name: "Pulse",
    shortDescription: "Health tracking mobile app",
    description: "Mobile application for tracking daily health metrics.",
    stack: ["React Native", "GraphQL"],
    links: {
      live: "https://pulse.example.com",
    },
    position: [8, 3, -5],
    color: "#10b981",
  },
  {
    id: "project-zenith",
    name: "Zenith",
    shortDescription: "E-commerce platform",
    description: "Full-featured e-commerce platform with payments.",
    stack: ["Next.js", "Stripe", "PostgreSQL"],
    links: {
      live: "https://zenith.example.com",
      github: "https://github.com/user/zenith",
    },
    position: [-6, 4, -10],
    color: "#f59e0b",
  },
  {
    id: "project-aurora",
    name: "Aurora",
    shortDescription: "Music visualization engine",
    description: "Real-time audio visualization with WebGL shaders.",
    stack: ["Three.js", "Web Audio API"],
    links: {
      live: "https://aurora.example.com",
      github: "https://github.com/user/aurora",
    },
    position: [4, -3, -8],
    color: "#ec4899",
  },
];
