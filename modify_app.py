import re
import json

app_path = "c:/Users/Mahir/Desktop/Portfolio/mahir-dalal-portfolio/src/App.tsx"

with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove SYS_ARCH and green dot
content = re.sub(
    r'<div className="font-headline text-2xl font-black text-primary tracking-tighter hover:opacity-80 transition-all flex items-center gap-1.5">\s*<span>SYS_ARCH</span>\s*<span className="w-1\.5 h-1\.5 bg-tertiary rounded-full animate-pulse inline-block" />\s*</div>',
    '<div className="font-headline text-2xl font-black text-primary tracking-tighter hover:opacity-80 transition-all flex items-center gap-1.5">\n              <span>Mahir Dalal</span>\n            </div>',
    content
)

content = re.sub(
    r'\{/\* Active Chip \*/\}\s*<div className="inline-flex items-center gap-2 px-3 py-1\.5 border border-\[#c0c1ff\]/20 bg-\[#c0c1ff\]/5 rounded-sm">\s*<span className="w-2 h-2 rounded-full bg-\[#4edea3\] animate-pulse" />\s*<span className="font-mono text-\[10px\] uppercase tracking-wider text-primary">SYSTEMS_ACTIVE_v1\.0\.4</span>\s*</div>',
    '',
    content
)

# 2. Change Stats to Competitive Programming in Nav
content = content.replace(
    '              Stats\n            </button>',
    '              Competitive Programming\n            </button>'
)

content = content.replace(
    '                  // BENCHMARKS\n                </button>',
    '                  // COMPETITIVE_PROGRAMMING\n                </button>'
)

content = content.replace(
    '// BENCHMARKS\n                </span>',
    '// PLATFORMS\n                </span>'
)

# 3. Update Social IDs
content = content.replace(
    'href="https://github.com"',
    'href="https://github.com/mahirdll29"'
)
content = content.replace(
    'href="https://linkedin.com"',
    'href="https://www.linkedin.com/in/mahirdll/"'
)

# 4. Update Resume Skills
new_skills = """  const skillCategories = [
    {
      title: "LANGUAGES",
      icon: <Terminal className="w-4 h-4 text-[#89ceff]" />,
      skills: ["C++", "Java", "Python", "JavaScript", "TypeScript"]
    },
    {
      title: "WEB DEV",
      icon: <Globe className="w-4 h-4 text-[#89ceff]" />,
      skills: ["Next.js", "React", "Node.js", "Express.js", "NestJS", "FastAPI", "Tailwind CSS"]
    },
    {
      title: "AI & AGENTIC",
      icon: <Cpu className="w-4 h-4 text-[#89ceff]" />,
      skills: ["LangChain", "LangGraph", "LLM Integration", "AI Workflow Orchestration"]
    },
    {
      title: "SYSTEMS",
      icon: <Layers className="w-4 h-4 text-[#89ceff]" />,
      skills: ["Distributed Systems", "Socket.IO", "WebSockets", "Concurrency", "Docker"]
    },
    {
      title: "DATABASES & TOOLS",
      icon: <Monitor className="w-4 h-4 text-[#89ceff]" />,
      skills: ["MongoDB", "PostgreSQL", "SQL", "Git", "Postman"]
    },
    {
      title: "CS FUNDAMENTALS",
      icon: <BookOpen className="w-4 h-4 text-[#89ceff]" />,
      skills: ["DSA", "DBMS", "Operating Systems", "Computer Networks", "OOP"]
    }
  ];"""

content = re.sub(r'const skillCategories = \[.*?\];', new_skills, content, flags=re.DOTALL)

# 5. Add TripSync project
trip_sync_project = """    {
      id: "tripsync",
      title: "TripSync",
      description: "Collaborative travel planning application with real-time syncing and itinerary management.",
      tags: ["#React", "#Node.js", "#MongoDB", "#Socket.IO"],
      bannerUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
      repoLink: "https://github.com/mahirdll29/tripsync",
      badge: { text: "LIVE_SYNC_v2" },
      longDescription: "TripSync is designed to solve the complexity of group travel planning. It provides a real-time collaborative workspace where multiple users can edit itineraries, vote on destinations, and split expenses. The platform ensures data consistency across connected clients through WebSockets.",
      architectureDetails: [
        "Implemented real-time bidirectional communication using Socket.IO for live itinerary updates.",
        "Built a robust REST API with Express and Node.js, backed by MongoDB for persistent storage.",
        "Designed responsive and interactive UI components with React and Tailwind CSS."
      ],
      simulatedConsole: [
        "Initializing TripSync cluster...",
        "Connecting to MongoDB Atlas... OK",
        "Binding WebSocket server on port 8080...",
        "User 'mahir' joined room 'euro-trip-2025'",
        "Syncing itinerary changes to 4 connected clients...",
        "Transaction complete in 42ms."
      ]
    }"""

projects_match = re.search(r'const projects: Project\[\] = \[(.*?)\];', content, re.DOTALL)
if projects_match:
    projects_content = projects_match.group(1)
    new_projects_content = projects_content + ",\n" + trip_sync_project
    content = content.replace(projects_content, new_projects_content)

# 6. Change Experience to Position of Responsibility
content = content.replace(
    '<h2 className="font-headline text-3xl font-extrabold text-[#dae2fd]">\n                  Experience\n                </h2>',
    '<h2 className="font-headline text-3xl font-extrabold text-[#dae2fd]">\n                  Position of Responsibility\n                </h2>'
)

# 7. Update Experience Items (remove research, update mentor)
new_experience = """  const timelineExperience: ExperienceItem[] = [
    {
      period: "Aug 2025 - Present",
      role: "Competitive Programming Mentor",
      organization: "Learn Code Solve (LCS)",
      description: "Collaborated with competitive programmers to design, review, and validate algorithmic problems for contests and practice sets.",
      bullets: [
        "Contributed to contest organization, editorials, solution verification, and problem-setting initiatives.",
        "Mentored over 80+ software engineering students via curated dynamic programming and graph structures problem sheets.",
        "Conducted mock live interviews focused on algorithmic runtime optimization under precise scale constraints."
      ],
      techUsed: ["C++", "Algorithms Design", "Code Reviews"]
    }
  ];"""

content = re.sub(r'const timelineExperience: ExperienceItem\[\] = \[.*?\];', new_experience, content, flags=re.DOTALL)

# 8. Add CGPA and JEE Main
content = content.replace(
    '<p className="text-xs text-on-surface-variant leading-relaxed font-sans">\n                    Advanced Algorithms, Discrete Mathematics, Operating Systems, Computer Networks, Database Management Systems.\n                  </p>',
    '<p className="text-xs text-on-surface-variant leading-relaxed font-sans">\n                    Advanced Algorithms, Discrete Mathematics, Operating Systems, Computer Networks, Database Management Systems.\n                  </p>\n                  <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-sm">\n                    <div className="flex justify-between items-center text-xs font-mono mb-2">\n                      <span className="text-on-surface-variant">CGPA</span>\n                      <span className="text-primary font-bold">8.05 / 10</span>\n                    </div>\n                    <div className="flex justify-between items-center text-xs font-mono">\n                      <span className="text-on-surface-variant">JEE Main</span>\n                      <span className="text-primary font-bold">98.2 Percentile</span>\n                    </div>\n                  </div>'
)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Modifications done!")
