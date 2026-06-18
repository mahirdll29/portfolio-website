import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal,
  Globe,
  Cpu,
  Layers,
  ArrowRight,
  Github,
  Linkedin,
  ExternalLink,
  School,
  Calendar,
  Award,
  TrendingUp,
  Menu,
  Mail,
  X,
  Send,
  Check,
  Activity,
  Sparkles,
  Info,
  Code2,
  ListRestart,
  BookOpen,
  Briefcase,
  User,
  Hash,
  Flame,
  FileDown,
  Monitor
} from "lucide-react";

// Interfaces & Types
interface CPPlatform {
  name: string;
  rankName: string;
  maxRating: number;
  currentRating: number;
  problemsSolved: number;
  globalRank: string;
  colorClass: string;
  borderClass: string;
  badgeIcon: React.ReactNode;
  tags: string[];
  url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  bannerUrl: string;
  repoLink: string;
  badge: { text: string; uppercase?: boolean };
  longDescription: string;
  architectureDetails: string[];
  simulatedConsole: string[];
}

interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  description: string;
  bullets: string[];
  techUsed?: string[];
  academic?: boolean;
}

interface SavedQuery {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}


// Custom SVG Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const CodeforcesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-7.5c0-.828.672-1.5 1.5-1.5h3z"/></svg>
);

const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.833s.513 2.851 1.494 3.833l4.332 4.363c.981.981 2.338 1.493 3.833 1.493s2.851-.512 3.833-1.493l2.697-2.606c.514-.515.497-1.365-.038-1.9-.535-.535-1.386-.552-1.9-.038z"/></svg>
);

const CodeChefIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.001 0C5.372 0 0 5.372 0 12.001c0 6.626 5.372 12 12.001 12 6.626 0 12-5.373 12-12C24 5.372 18.627 0 12.001 0zm-1.87 18.257H7.625l-.75-3.053h-.032l-.75 3.053H3.585l1.69-6.31h2.478l.685 3.03h.032l.685-3.03h2.479l1.691 6.31zm1.264-5.373c.758.04 1.446.463 1.83 1.135l.024.032v2.453l-.024.031c-.384.672-1.072 1.095-1.83 1.135-.851 0-1.541-.69-1.541-1.541v-1.694c0-.851.69-1.54 1.541-1.551zm7.426 3.85c-.012.355-.17.688-.432.912-.26.223-.604.341-.958.331H15.02v-3.791h2.411c.354-.01.698.108.958.331.262.224.42.557.432.912v1.305zm0-4.662c-.012.355-.17.688-.432.911-.26.223-.604.341-.958.332H15.02v-3.792h2.411c.354-.01.698.109.958.332.262.223.42.556.432.911v1.306zM15.02 5.093h2.411c.902-.016 1.765.342 2.395 1.002.63.66.974 1.546.958 2.45v1.305c.007.45-.098.895-.306 1.302a2.915 2.915 0 0 1-.849 1.001 2.915 2.915 0 0 1 .849 1.001c.208.407.313.852.306 1.302v1.305c.016.904-.328 1.79-.958 2.45-.63.66-1.493 1.018-2.395 1.002H13.83c-.852 0-1.542-.69-1.542-1.542V3.55c0-.851.69-1.54 1.542-1.54h2.411c.902-.016 1.765.342 2.395 1.002.63.66.974 1.546.958 2.45v1.305c.012.354-.146.686-.432.91a1.272 1.272 0 0 1-.958.331z"/></svg>
);

const AtCoderIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M10.875 1.35C10.5.4 9.5 0 8.5 0c-1 0-2 .4-2.375 1.35L0 18.2V24h5.25v-2.325h6.5V24h5.25v-5.8L10.875 1.35zm-2 5.7L10.75 15H6.25l2.625-7.95zm8.125-2.7l3 10.3c.125.4.5 1.05 1 1.05v-2.5c-.125-.125-.25-.375-.375-.625L18.25 4.35H17z"/></svg>
);

export default function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeCpTab, setActiveCpTab] = useState<string | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [isConsoleSimulating, setIsConsoleSimulating] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);

  // Refs for Scroll Syncing
  const sectionsRef = {
    hero: useRef<HTMLElement>(null),
    stats: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    exp: useRef<HTMLElement>(null),
    edu: useRef<HTMLElement>(null),
  };

  // Load Saved Contact Form Queries
  useEffect(() => {
    const loaded = localStorage.getItem("mahir_portfolio_queries");
    if (loaded) {
      try {
        setSavedQueries(JSON.parse(loaded));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Sync scroll with section active state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const [key, ref] of Object.entries(sectionsRef)) {
        const element = ref.current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Scroll Handlers
  const scrollToSection = (sectionId: keyof typeof sectionsRef) => {
    setMobileMenuOpen(false);
    const element = sectionsRef[sectionId].current;
    if (element) {
      const offsetTop = element.offsetTop - 80; // height of the fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  // CP Platforms Data
  const [cpPlatforms, setCpPlatforms] = useState<CPPlatform[]>([
    {
      name: "CODEFORCES",
      rankName: "Specialist",
      maxRating: 1403,
      currentRating: 1403,
      problemsSolved: 642,
      globalRank: "Top 25%",
      colorClass: "text-[#4edea3]",
      borderClass: "border-[#4edea3]/30",
      badgeIcon: <CodeforcesIcon className="w-5 h-5 text-[#4edea3]" />,
      tags: ["Dynamic Programming", "Greedy", "Math", "Sortings", "Graphs"],
      url: "https://codeforces.com/profile/mahirdll"
    },
    {
      name: "LEETCODE",
      rankName: "Knight",
      maxRating: 1879,
      currentRating: 1854,
      problemsSolved: 1000,
      globalRank: "Top 5%",
      colorClass: "text-[#89ceff]",
      borderClass: "border-[#89ceff]/30",
      badgeIcon: <LeetCodeIcon className="w-5 h-5 text-[#89ceff]" />,
      tags: ["Sliding Window", "Binary Search", "Graphs", "Bit Manipulation"],
      url: "https://leetcode.com/mahirdll/"
    },
    {
      name: "CODECHEF",
      rankName: "3-Star",
      maxRating: 1618,
      currentRating: 1618,
      problemsSolved: 285,
      globalRank: "Top 12%",
      colorClass: "text-[#4edea3]",
      borderClass: "border-[#4edea3]/30",
      badgeIcon: <CodeChefIcon className="w-5 h-5 text-[#4edea3]" />,
      tags: ["Interactive Problems", "Strings", "Number Theory", "Binary Search"],
      url: "https://www.codechef.com/users/mahirdll"
    },
    {
      name: "ATCODER",
      rankName: "7-kyu",
      maxRating: 601,
      currentRating: 582,
      problemsSolved: 110,
      globalRank: "Top 40%",
      colorClass: "text-[#ffb4ab]",
      borderClass: "border-[#ffb4ab]/30",
      badgeIcon: <AtCoderIcon className="w-5 h-5 text-[#ffb4ab]" />,
      tags: ["Constructive Algorithms", "GCD", "Greedy", "Prefix Sums"],
      url: "https://atcoder.jp/users/mahirdll"
    },
  ]);

    useEffect(() => {
    const fetchCPStats = async () => {
      try {
        // Fetch Codeforces
        const cfRes = await fetch("https://codeforces.com/api/user.info?handles=mahirdll").catch(e => console.error("CF fetch error", e));
        let cfData = null;
        if (cfRes && cfRes.ok) cfData = await cfRes.json();
        
        const cfStatusRes = await fetch("https://codeforces.com/api/user.status?handle=mahirdll").catch(e => console.error("CF status fetch error", e));
        let cfStatusData = null;
        if (cfStatusRes && cfStatusRes.ok) cfStatusData = await cfStatusRes.json();
        
        // Fetch LeetCode
        const lcRes = await fetch("https://alfa-leetcode-api.onrender.com/mahirdll").catch(e => console.error("LC fetch error", e));
        let lcData = null;
        if (lcRes && lcRes.ok) lcData = await lcRes.json();
        
        const lcSolvedRes = await fetch("https://alfa-leetcode-api.onrender.com/mahirdll/solved").catch(e => console.error("LC solved fetch error", e));
        let lcSolvedData = null;
        if (lcSolvedRes && lcSolvedRes.ok) lcSolvedData = await lcSolvedRes.json();

        setCpPlatforms(prev => prev.map(p => {
          let updated = { ...p };
          if (p.name === "CODEFORCES" && cfData && cfData.status === "OK") {
            const user = cfData.result[0];
            updated.currentRating = user.rating || p.currentRating;
            updated.maxRating = user.maxRating || p.maxRating;
            updated.rankName = user.rank ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1) : p.rankName;
            
            if (cfStatusData && cfStatusData.status === "OK") {
              const solvedSet = new Set();
              cfStatusData.result.forEach((sub: any) => {
                if (sub.verdict === "OK" && sub.problem && sub.problem.name) {
                  solvedSet.add(sub.problem.name);
                }
              });
              updated.problemsSolved = solvedSet.size || p.problemsSolved;
            }
            updated.extraStats = undefined;
          }
          if (p.name === "LEETCODE") {
            if (lcSolvedData && lcSolvedData.solvedProblem !== undefined) {
              updated.problemsSolved = lcSolvedData.solvedProblem;
            } else if (lcData && lcData.solvedProblem) {
              updated.problemsSolved = lcData.solvedProblem;
            }
            updated.extraStats = undefined;
          }
          return updated;
        }));
      } catch (err) {
        console.error("Failed to fetch CP stats", err);
      }
    };
    fetchCPStats();
  }, []);


  // Projects Data
  const projects: Project[] = [
    {
      id: "ai-dsa",
      title: "AI DSA/CP Coach",
      description: "An AI-powered adaptive learning platform for DSA and Competitive Programming that generates personalized practice plans using learner behavior, topic mastery, and contest-performance signals.",
      tags: ["#Next.js", "#FastAPI", "#PostgreSQL", "#LangGraph", "#LangChain"],
      bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      repoLink: "https://github.com",
      badge: { text: "AI_MENTOR" },
      longDescription: "Built an AI-powered adaptive learning platform for DSA and Competitive Programming that generates personalized practice plans using learner behavior, topic mastery, and contest-performance signals. Designed a hybrid recommendation engine leveraging 10+ learning signals including solve history, solve time, rating progression, hint dependency, and recurring mistake trends, reducing manual effort required for problem selection and study planning by an estimated 65%. Built multi-agent coaching workflows using LangGraph and LangChain for contextual hint generation, failure analysis, revision planning, and automated learning-path orchestration, enabling personalized learning recommendations at scale. Engineered a structured learner-modeling and analytics system tracking 20+ performance metrics across DSA and Competitive Programming workflows, reducing time spent identifying learning weaknesses by an estimated 50% through automated feedback and adaptive progression tracking.",
      architectureDetails: [],
      simulatedConsole: []
    },
    {
      id: "jan-ai",
      title: "JAN-AI",
      description: "Built an AI-assisted civic infrastructure platform supporting 5+ infrastructure categories including roads, sanitation, drainage, streetlights, and public spaces through geotagged image-based reporting and location-aware issue tracking.",
      tags: ["#Next.js", "#NestJS", "#PostgreSQL", "#Prisma", "#Mapbox", "#GroqAPI", "#TypeScript"],
      bannerUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
      repoLink: "https://github.com",
      badge: { text: "CIVIC_TECH" },
      longDescription: "Engineered a scalable, production-grade full-stack architecture using Next.js, NestJS, PostgreSQL, and Prisma, processing 10+ structured metadata attributes per report for infrastructure monitoring and analytics. Integrated multimodal AI services for automated issue categorization, severity assessment, report summarization, and content moderation, reducing manual report analysis effort by an estimated 60%.",
      architectureDetails: [],
      simulatedConsole: []
    },
    {
      id: "network-sim",
      title: "Intelligent Self-Healing Global Network Simulator",
      description: "Architected a distributed real-time network simulation across 15 global nodes and 21 edges using a 6-service event-driven backend with multi-threaded request handling, broadcasting synchronized full state to concurrent clients via WebSocket every 300ms.",
      tags: ["#Node.js", "#Express", "#React-19", "#Three.js", "#Socket.IO"],
      bannerUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
      repoLink: "https://github.com",
      badge: { text: "DISTRIBUTED_SYSTEMS" },
      longDescription: "Implemented dual concurrent routing algorithms (naive OSPF-style vs. health-aware Dijkstra) running in parallel with autonomous mid-transit rerouting when node failure probability exceeds threshold. Engineered a reinforcement-learning-inspired node scoring system with dynamic health feedback loops across 4 attack models (Blackhole, Grayhole, Delay, DDoS Flood), enabling the routing layer to autonomously exclude compromised nodes without manual intervention. Designed a multi-priority packet scheduling system with configurable cost weights and a composite routing cost function balancing latency, load, and node trust score across a live concurrent simulation.",
      architectureDetails: [],
      simulatedConsole: []
    },
    {
      id: "tripsync",
      title: "TripSync",
      description: "TripSync is a collaborative hotel discovery platform built for friend groups who currently scatter hotel recommendations across WhatsApp, Telegram, and DMs. Users create a trip, invite friends via a shareable link, add destination cities, and drop hotel booking links (Agoda, MakeMyTrip, Airbnb, etc.) organized under each city.",
      tags: ["#Next.js-15", "#MongoDB", "#NextAuth", "#TailwindCSS"],
      bannerUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
      repoLink: "https://github.com/mahirdll29/tripsync",
      badge: { text: "COLLABORATIVE" },
      longDescription: "TripSync is a collaborative hotel discovery platform built for friend groups who currently scatter hotel recommendations across WhatsApp, Telegram, and DMs. Users create a trip, invite friends via a shareable link, add destination cities, and drop hotel booking links (Agoda, MakeMyTrip, Airbnb, etc.) organized under each city. Every member sees the same centralized view, can maintain their own personal shortlist, and click directly to the original booking site. Built on Next.js 15, MongoDB, and NextAuth with a dark, animated UI targeting young Indian travelers.",
      architectureDetails: [],
      simulatedConsole: []
    }];

  // Skills Matrix
    const skillCategories = [
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
  ];

  // Timeline Experience Data
    const timelineExperience: ExperienceItem[] = [
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
  ];

  // Simulate Repository Execution Console
  const executeSimulation = (project: Project) => {
    setIsConsoleSimulating(true);
    setConsoleLogs([]);

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < project.simulatedConsole.length) {
        setConsoleLogs((prev) => [...prev, project.simulatedConsole[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsConsoleSimulating(false);
      }
    }, 450);
  };

  // Contact Form Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const newQuery: SavedQuery = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "No Subject",
        message: formData.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updated = [newQuery, ...savedQueries];
      setSavedQueries(updated);
      localStorage.setItem("mahir_portfolio_queries", JSON.stringify(updated));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Clear success visual state after 4 seconds
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1500);
  };

  // Delete Locally Logged Query
  const deleteQuery = (id: string) => {
    const filtered = savedQueries.filter(q => q.id !== id);
    setSavedQueries(filtered);
    localStorage.setItem("mahir_portfolio_queries", JSON.stringify(filtered));
  };

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] min-h-screen selection:bg-primary/30 selection:text-primary relative font-sans">
      
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(192,193,255,0.08),rgba(0,0,0,0))] pointer-events-none z-0"></div>
      
      <div className="absolute top-[20%] left-0 right-0 h-[400px] bg-[linear-gradient(rgba(137,206,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(137,206,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-xl border-b border-outline-variant">
        <div className="max-w-[1120px] mx-auto px-6 flex justify-between items-center h-[80px]">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="font-headline text-2xl font-black text-primary tracking-tighter hover:opacity-80 transition-all flex items-center gap-1.5">
              <span>Mahir Dalal</span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("stats")}
              className={`font-mono text-xs tracking-widest font-semibold transition-all hover:text-primary ${
                activeSection === "stats" ? "text-primary border-b border-primary pb-1" : "text-on-surface-variant"
              }`}
            >
              Competitive Programming
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`font-mono text-xs tracking-widest font-semibold transition-all hover:text-primary ${
                activeSection === "skills" ? "text-primary border-b border-primary pb-1" : "text-on-surface-variant"
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`font-mono text-xs tracking-widest font-semibold transition-all hover:text-primary ${
                activeSection === "projects" ? "text-primary border-b border-primary pb-1" : "text-on-surface-variant"
              }`}
            >
              Projects
            </button>

            <button
              onClick={() => scrollToSection("edu")}
              className={`font-mono text-xs tracking-widest font-semibold transition-all hover:text-primary ${
                activeSection === "edu" ? "text-primary border-b border-primary pb-1" : "text-on-surface-variant"
              }`}
            >
              Edu
            </button>
            
            <button 
              onClick={() => setIsResumeModalOpen(true)}
              className="ml-2 px-4 py-2 bg-primary text-on-primary font-mono text-xs font-bold rounded-sm border border-transparent hover:bg-transparent hover:text-primary hover:border-primary transition-all duration-300 shadow-[0_0_15px_rgba(192,193,255,0.15)]"
            >
              Resume
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-primary p-1 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-outline-variant bg-[#0b1326] px-6 py-4 space-y-4 shadow-xl"
            >
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => scrollToSection("stats")}
                  className="text-left font-mono text-xs tracking-widest font-semibold p-2 text-on-surface-variant hover:text-primary hover:bg-[#171f33] rounded-sm transition-all"
                >
                  // COMPETITIVE_PROGRAMMING
                </button>
                <button 
                  onClick={() => scrollToSection("skills")}
                  className="text-left font-mono text-xs tracking-widest font-semibold p-2 text-on-surface-variant hover:text-primary hover:bg-[#171f33] rounded-sm transition-all"
                >
                  // ARCHITECTURAL_STACK
                </button>
                <button 
                  onClick={() => scrollToSection("projects")}
                  className="text-left font-mono text-xs tracking-widest font-semibold p-2 text-on-surface-variant hover:text-primary hover:bg-[#171f33] rounded-sm transition-all"
                >
                  // PRODUCTION_LOGS
                </button>
                <button 
                  onClick={() => scrollToSection("exp")}
                  className="text-left font-mono text-xs tracking-widest font-semibold p-2 text-on-surface-variant hover:text-primary hover:bg-[#171f33] rounded-sm transition-all"
                >
                  // EXPERIENCE
                </button>
                <button 
                  onClick={() => scrollToSection("edu")}
                  className="text-left font-mono text-xs tracking-widest font-semibold p-2 text-on-surface-variant hover:text-primary hover:bg-[#171f33] rounded-sm transition-all"
                >
                  // EDUCATION
                </button>

                <div className="pt-2 border-t border-outline-variant flex gap-4">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsResumeModalOpen(true);
                    }}
                    className="flex-1 text-center py-2.5 bg-primary text-on-primary font-mono text-xs font-bold rounded-sm border border-primary transition-all"
                  >
                    View Resume
                  </button>
                  <a 
                    href="mailto:mahirdalal97@gmail.com"
                    className="flex-1 text-center py-2.5 border border-outline-variant text-[#dae2fd] font-mono text-xs font-bold rounded-sm hover:border-[#dae2fd] transition-all"
                  >
                    Email Direct
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Container */}
      <main className="pt-[80px] relative z-10 max-w-[1120px] mx-auto px-6 overflow-hidden">
        
        {/* HERO SECTION */}
        <section 
          ref={sectionsRef.hero}
          id="hero" 
          className="relative min-h-[720px] flex items-center py-16 md:py-24"
        >
          {/* Main Hero grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 space-y-6">
              

              {/* Title Header */}
              <div className="space-y-2">
                <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-[#dae2fd] tracking-tight leading-none">
                  Mahir Dalal
                </h1>
                <p className="font-headline text-2xl md:text-3xl font-bold text-primary-container max-w-2xl leading-snug">
                  Competitive Programmer &amp; <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Systems Engineer</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-on-surface-variant text-base md:text-lg font-normal max-w-xl leading-relaxed">
                Architecting high-performance solutions through algorithmic rigor and clean code. Specialized in AI-integrated systems and distributed architecture. Currently pursuing CS at IIIT Surat.
              </p>

              {/* Actions/Social buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://github.com/mahirdll29" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-5 py-3.5 bg-surface-container-highest border border-outline-variant hover:border-primary rounded-sm font-mono text-xs font-semibold tracking-wider transition-all duration-300 group"
                >
                  <GithubIcon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  GITHUB
                </a>
                <a 
                  href="https://www.linkedin.com/in/mahirdll/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-5 py-3.5 bg-surface-container-highest border border-outline-variant hover:border-secondary rounded-sm font-mono text-xs font-semibold tracking-wider transition-all duration-300 group"
                >
                  <LinkedinIcon className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                  LINKEDIN
                </a>
                <button
                  onClick={() => {
                    const el = sectionsRef.projects.current;
                    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-6 py-3.5 bg-primary text-on-primary font-mono text-xs font-bold rounded-sm hover:opacity-90 tracking-wider transition-all duration-300"
                >
                  VIEW_PROJECTS
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* COMPETITIVE PROGRAMMING RATINGS */}
        <section 
          ref={sectionsRef.stats}
          id="stats" 
          className="py-20 border-t border-outline-variant bg-[#060e20]/60 -mx-6 px-6"
        >
          <div className="max-w-[1120px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-3">
              <div>
                <span className="font-mono text-xs font-semibold text-secondary tracking-widest uppercase block mb-1">
                  // PLATFORMS
                </span>
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-[#dae2fd]">
                  Competitive Programming
                </h2>
              </div>
              <div className="font-mono text-xs md:text-sm text-on-surface-variant italic border-l-2 border-[#8183ff]/30 pl-3">
                "Optimizing time and space complexity at scale."
              </div>
            </div>

            {/* Interactive Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cpPlatforms.map((platform) => {
                const isActive = activeCpTab === platform.name;
                const percentFull = Math.min(100, Math.floor((platform.currentRating / 2000) * 100));

                return (
                  <a 
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border rounded-sm p-5 bg-[#171f33]/60 hover:bg-[#171f33] border-outline-variant hover:border-primary transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    title={`View ${platform.name} Profile`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className={`font-mono text-xs tracking-wider font-bold ${platform.colorClass}`}>
                          {platform.name}
                        </span>
                        <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                          {platform.badgeIcon}
                        </div>
                      </div>

                      <div className="font-headline text-2xl font-bold text-[#dae2fd] mb-1">
                        {platform.rankName}
                      </div>

                      {(platform.name === 'CODEFORCES' || platform.name === 'LEETCODE') && (
                        <div className="font-mono text-base font-bold text-[#dae2fd] mb-3">
                          {platform.problemsSolved} <span className="text-sm font-normal text-on-surface-variant">problems solved</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant mb-1">
                          <span>Max Rating:</span>
                          <span className="text-secondary font-bold">{platform.maxRating}</span>
                        </div>
                        <div className="font-mono text-[10px] text-on-surface-variant opacity-80">
                          ID: <span className="text-[#dae2fd]">mahirdll</span>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-8 pt-4 border-t border-outline-variant">
                      <div className="w-full bg-[#131b2e] h-1.5 rounded-sm flex overflow-hidden mb-2">
                        <div 
                          className="h-full rounded-sm transition-all duration-1000"
                          style={{ 
                            width: `${percentFull}%`,
                            backgroundColor: platform.name === 'CODEFORCES' ? '#4edea3' : platform.name === 'LEETCODE' ? '#89ceff' : platform.name === 'CODECHEF' ? '#4edea3' : '#ffb4ab'
                          }} 
                        />
                      </div>

                      <div className="text-center mt-3">
                        <span className="flex items-center justify-center gap-1 font-mono text-[9px] text-on-surface-variant opacity-80 group-hover:opacity-100 group-hover:text-primary transition-all">
                          <ExternalLink className="w-3 h-3" />
                          View Profile
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>


          </div>
        </section>

        {/* TECHNICAL PROFICIENCIES */}
        <section 
          ref={sectionsRef.skills}
          id="skills" 
          className="py-20"
        >
          <div className="text-center mb-16 space-y-2">
            <span className="font-mono text-xs font-semibold text-primary block tracking-widest uppercase">
              ARCHITECTURAL_STACK
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-[#dae2fd]">
              Technical Proficiencies
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => (
              <div 
                key={category.title} 
                className="flex flex-col gap-4 p-5 bg-[#171f33]/40 border border-outline-variant rounded-sm hover:border-[#8083ff]/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-secondary tracking-wider pb-3 border-b border-outline-variant/50">
                  {category.icon}
                  <span>{category.title}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1.5 bg-surface-container-high hover:bg-[#2d3449] border border-outline-variant/60 rounded-full font-mono text-xs text-on-surface-variant hover:text-[#dae2fd] transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SELECTED PROJECTS (Bento Grid) */}
        <section 
          ref={sectionsRef.projects}
          id="projects" 
          className="py-20 border-t border-outline-variant bg-[#0b1326] -mx-6 px-6"
        >
          <div className="max-w-[1120px] mx-auto">
            <div className="mb-14">
              <span className="font-mono text-xs font-semibold text-primary block tracking-widest">
                // PRODUCTION_LOGS
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-[#dae2fd]">
                Selected Projects
              </h2>
            </div>

                        <div className="flex flex-col gap-8">
              {projects.map((project, idx) => (
                <div key={project.id} className="group">
                  <div className="bg-[#171f33]/40 border border-outline-variant rounded-sm overflow-hidden flex flex-col md:flex-row shadow-lg hover:border-primary transition-all duration-300">
                    <div className="md:w-1/3 relative min-h-[200px] mb-4 md:mb-0">
                      <img 
                        src={project.bannerUrl} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0b1326]/90 via-[#0b1326]/60 to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-primary text-on-primary font-mono text-[9px] font-bold rounded-sm uppercase tracking-wide">
                          {project.badge.text}
                        </span>
                      </div>
                    </div>

                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h3 className="font-headline text-2xl font-bold text-[#dae2fd]">
                          {project.title}
                        </h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tags.map(t => (
                            <span key={t} className="text-xs font-mono text-primary font-semibold">{t}</span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <section 
          ref={sectionsRef.exp}
          id="exp" 
          className="py-20"
        >
          <div className="flex flex-col gap-16">
            
            {/* Education Panel */}
            <div 
              ref={sectionsRef.edu}
              id="edu"
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 border border-secondary/20 text-secondary rounded-sm">
                  <School className="w-5 h-5" />
                </div>
                <h2 className="font-headline text-3xl font-extrabold text-[#dae2fd]">
                  Education
                </h2>
              </div>

              {/* Education Card layout matching wireframe */}
              <div className="bg-[#171f33]/40 border border-outline-variant p-6 rounded-sm space-y-6">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-[#dae2fd] mb-1">
                    IIIT Surat
                  </h3>
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
                    B.TECH IN COMPUTER SCIENCE
                  </div>
                </div>

                <div className="space-y-3.5 border-t border-b border-outline-variant/50 py-4 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Batch</span>
                    <span className="text-on-surface font-semibold">2024 - 2028</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-bold">
                    Key Coursework
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                    Advanced Algorithms, Discrete Mathematics, Operating Systems, Computer Networks, Database Management Systems.
                  </p>
                  <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-sm">
                    <div className="flex justify-between items-center text-xs font-mono mb-2">
                      <span className="text-on-surface-variant">CGPA</span>
                      <span className="text-primary font-bold">8.05 / 10</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">JEE Main</span>
                      <span className="text-primary font-bold">98.2 Percentile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Panel */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 border border-primary/20 text-primary rounded-sm">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h2 className="font-headline text-3xl font-extrabold text-[#dae2fd]">
                  Position of Responsibility
                </h2>
              </div>

              <div className="relative border-l-2 border-outline-variant pl-6 ml-3 space-y-12">
                {timelineExperience.map((job) => (
                  <div key={job.role} className="relative group">
                    {/* timeline marker dot */}
                    <span className="absolute -left-[35px] top-1.5 w-4.5 h-4.5 rounded-sm bg-[#131b2e] border-2 border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-[#4edea3] rounded-sm" />
                    </span>

                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-mono text-xs font-bold text-secondary tracking-wider">
                          {job.period}
                        </span>
                        {job.academic && (
                          <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary font-mono text-[9px] rounded-sm uppercase font-semibold self-start sm:self-center">
                            ACADEMIC
                          </span>
                        )}
                      </div>

                      <h3 className="font-headline text-xl font-bold text-[#dae2fd]">
                        {job.role} <span className="text-on-surface-variant font-normal">at</span> {job.organization}
                      </h3>

                      <p className="text-on-surface-variant text-sm leading-relaxed font-sans mb-3">
                        {job.description}
                      </p>

                      {/* Timeline details list */}
                      <ul className="space-y-1.5 text-xs text-on-surface-variant font-sans list-none pl-0">
                        {job.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-primary font-mono font-bold select-none pt-0.5">//</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Chips */}
                      {job.techUsed && (
                        <div className="flex flex-wrap gap-1.5 pt-3">
                          {job.techUsed.map((t) => (
                            <span key={t} className="px-2 py-0.5 bg-[#171f33] border border-outline-variant/60 rounded-sm font-mono text-[10px] text-on-surface-variant">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* CTA CONNECT & LOCALLY PERSISTED QUERIES */}
        <section className="py-20 border-t border-outline-variant bg-[#171f33]/15 -mx-6 px-6">
          <div className="max-w-[760px] mx-auto text-center space-y-12">
            
            <div className="space-y-4">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#dae2fd]">
                Ready to scale?
              </h2>
              <p className="text-on-surface-variant text-base font-normal max-w-xl mx-auto leading-relaxed">
                I'm always open to discussing technical challenges, distributed systems, or the next high-impact AI integration. Connect directly below.
              </p>
            </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
              <a 
                href="https://www.linkedin.com/in/mahirdll/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-8 py-4 bg-[#171f33] border border-outline-variant hover:border-secondary rounded-sm font-mono text-sm font-semibold tracking-wider transition-all duration-300 group shadow-lg"
              >
                <LinkedinIcon className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                Connect on LinkedIn
              </a>
              <a 
                href="mailto:mahirdalal97@gmail.com" 
                className="flex items-center gap-3 px-8 py-4 bg-[#171f33] border border-outline-variant hover:border-primary rounded-sm font-mono text-sm font-semibold tracking-wider transition-all duration-300 group shadow-lg"
              >
                <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                Email Me
              </a>
            </div>

            {/* Saved Queries / Local Messaging Logs */}
            {savedQueries.length > 0 && (
              <div className="text-left max-w-2xl mx-auto space-y-4 pt-6">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/60">
                  <h3 className="font-mono text-xs font-bold text-secondary tracking-widest flex items-center gap-1.5 uppercase">
                    <Terminal className="w-4 h-4" />
                    // LOCAL_SESSION_TRANSMISSIONS
                  </h3>
                  <button 
                    onClick={() => {
                      setSavedQueries([]);
                      localStorage.removeItem("mahir_portfolio_queries");
                    }} 
                    className="text-[10px] font-mono text-on-surface-variant hover:text-error transition-colors flex items-center gap-1"
                  >
                    <ListRestart className="w-3 h-3" />
                    Reset Logger
                  </button>
                </div>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
                  {savedQueries.map((query) => (
                    <div 
                      key={query.id} 
                      className="p-4 bg-[#171f33]/40 border border-outline-variant rounded-sm text-xs space-y-2.5 relative group"
                    >
                      <button 
                        onClick={() => deleteQuery(query.id)}
                        className="absolute top-2.5 right-2.5 text-on-surface-variant hover:text-error opacity-60 group-hover:opacity-100 transition-opacity"
                        title="Delete transmission record"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 font-mono text-[10px] text-on-surface-variant">
                        <div>
                          <span className="text-primary font-bold">{query.name}</span>
                          <span className="mx-2">•</span>
                          <span>{query.email}</span>
                        </div>
                        <span className="text-secondary">{query.timestamp}</span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-sans font-semibold text-on-surface">Subj: {query.subject}</div>
                        <p className="text-on-surface-variant font-sans text-xs bg-[#0b1326]/50 p-2.5 rounded-sm border border-outline-variant/30 whitespace-pre-wrap">
                          {query.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-12 bg-surface-container-lowest border-t border-outline-variant relative z-10">
        <div className="max-w-[1120px] mx-auto px-6 flex flex-col items-center justify-center gap-6">
          <div className="flex gap-8 items-center justify-center">
            <a href="https://github.com/mahirdll29" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-on-surface hover:text-primary transition-colors flex items-center gap-2">
              <GithubIcon className="w-5 h-5" />
              GitHub
            </a>
            <a href="https://linkedin.com/in/mahirdll/" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-on-surface hover:text-secondary transition-colors flex items-center gap-2">
              <LinkedinIcon className="w-5 h-5" />
              LinkedIn
            </a>
            <a href="https://codeforces.com/profile/mahirdll" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-on-surface hover:text-tertiary transition-colors flex items-center gap-2">
              <CodeforcesIcon className="w-5 h-5" />
              Codeforces
            </a>
            <a href="https://leetcode.com/mahirdll/" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-on-surface hover:text-[#89ceff] transition-colors flex items-center gap-2">
              <LeetCodeIcon className="w-5 h-5" />
              LeetCode
            </a>
          </div>
        </div>
      </footer>

      {/* PORTFOLIO MODALS LAYER */}

      {/* 1. Resume PDF Modal */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeModalOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#131b2e] border border-outline-variant/80 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative z-50 text-left"
            >
              {/* Header */}
              <div className="bg-[#171f33] px-6 py-4 border-b border-outline-variant flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <Monitor className="text-primary w-5 h-5" />
                  <span className="font-mono text-xs font-bold text-[#dae2fd]">MAHIR_DALAL_RESUME.pdf</span>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href="/Mahir_CV.pdf"
                    download="Mahir_Dalal_Resume.pdf"
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant hover:border-primary text-xs font-mono rounded-sm transition-all text-on-surface-variant hover:text-[#dae2fd]"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Download
                  </a>
                  <button 
                    onClick={() => setIsResumeModalOpen(false)}
                    className="p-1 text-on-surface-variant hover:text-[#dae2fd] focus:outline-none"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Embedded PDF */}
              <div className="flex-1 overflow-hidden">
                <iframe 
                  src="/Mahir_CV.pdf" 
                  className="w-full h-full min-h-[75vh]" 
                  title="Mahir Dalal Resume"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Code Execution / Repositories Modal */}
      <AnimatePresence>
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setActiveProjectModal(null);
                setConsoleLogs([]);
                setIsConsoleSimulating(false);
              }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#131b2e] border border-outline-variant rounded-sm w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative z-50 text-left"
            >
              {/* Header */}
              <div className="bg-[#171f33] px-6 py-4.5 border-b border-outline-variant flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal className="text-primary w-5 h-5 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-secondary">PROJECT_SANDBOX // {activeProjectModal.title}</span>
                </div>
                <button 
                  onClick={() => {
                    setActiveProjectModal(null);
                    setConsoleLogs([]);
                    setIsConsoleSimulating(false);
                  }}
                  className="p-1 text-on-surface-variant hover:text-[#dae2fd] focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable core content */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Meta details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-primary/15 text-primary border border-primary/20 text-[10px] font-mono rounded-sm">
                      {activeProjectModal.badge.text}
                    </span>
                    <span className="text-[11px] font-mono text-on-surface-variant">Active Compilation Instance</span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-[#dae2fd]">
                    {activeProjectModal.title} Detailed Specification
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {activeProjectModal.longDescription}
                  </p>
                </div>

                {/* Architecture Checklist */}
                <div className="space-y-3 bg-[#171f33]/40 border border-outline-variant p-4 rounded-sm">
                  <h4 className="font-mono text-[11px] font-bold text-secondary uppercase tracking-wider">// SYSTEM ARCHITECTURE IMPLEMENTED</h4>
                  <ul className="space-y-2 text-xs text-on-surface-variant list-none pl-0">
                    {activeProjectModal.architectureDetails.map((details, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-tertiary select-none">✔</span>
                        <span>{details}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Simulated Repository Console */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <h4 className="font-mono text-[11px] font-bold text-[#dae2fd] tracking-wider uppercase">// VERIFY COMPILATION DAEMON</h4>
                    <button 
                      onClick={() => executeSimulation(activeProjectModal)}
                      disabled={isConsoleSimulating}
                      className="px-3 py-1 bg-primary text-on-primary hover:bg-[#8083ff] font-mono text-[10px] font-extrabold rounded-sm transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isConsoleSimulating ? "RUNNING_COMPILER..." : "FIRE_COMPILER_SYS"}
                    </button>
                  </div>

                  {/* Simulated screen logs */}
                  <div className="bg-[#060e20] border border-outline-variant p-4 rounded-sm font-mono text-[11px] text-on-surface-variant min-h-[160px] max-h-[220px] overflow-y-auto flex flex-col space-y-1.5 scrollbar-thin scrollbar-thumb-outline">
                    {consoleLogs.length === 0 ? (
                      <div className="text-center py-10 opacity-50 space-y-2">
                        <p>No telemetry active. Click 'FIRE_COMPILER_SYS' to compile repository live.</p>
                      </div>
                    ) : (
                      <>
                        {consoleLogs.map((log, i) => {
                          let color = "text-on-surface-variant";
                          if (log.startsWith("ALERT") || log.startsWith("Calculated user bottleneck")) {
                            color = "text-error";
                          } else if (log.includes("OK") || log.includes("achieved") || log.includes("successfully")) {
                            color = "text-tertiary";
                          } else if (log.startsWith("L") || log.startsWith("Running")) {
                            color = "text-secondary";
                          }
                          return (
                            <div key={i} className={`flex gap-1.5 ${color}`}>
                              <span>❯</span>
                              <span>{log}</span>
                            </div>
                          );
                        })}
                        {isConsoleSimulating && (
                          <div className="flex items-center gap-1.5 text-primary animate-pulse py-1">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                            <span>executing sequence data loops...</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom link controls */}
                <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/50 shrink-0">
                  <button 
                    onClick={() => {
                      setActiveProjectModal(null);
                      setConsoleLogs([]);
                      setIsConsoleSimulating(false);
                    }}
                    className="px-4 py-2 border border-outline-variant text-[#dae2fd] font-mono text-xs rounded-sm hover:border-[#dae2fd] transition-all"
                  >
                    Close Sandbox
                  </button>
                  <a 
                    href={activeProjectModal.repoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#171f33] border border-outline-variant hover:border-primary text-secondary hover:text-white font-mono text-xs font-bold rounded-sm flex items-center gap-1.5 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Open Source Repos
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
