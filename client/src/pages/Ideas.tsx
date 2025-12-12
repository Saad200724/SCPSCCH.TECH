import { useState } from "react";
import { Shield, Code2, Cpu, Sparkles, Loader2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import SectionTitle from "@/components/SectionTitle";
import CyberButton from "@/components/CyberButton";

type Category = "CP" | "WEB-DEV" | "AI-ML";

const Ideas = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState<string | null>(null);

  const categories = [
    {
      id: "CP" as Category,
      icon: Code2,
      title: "COMPETITIVE PROGRAMMING",
      description: "Algorithms, data structures, and problem-solving challenges",
      color: "cyan",
    },
    {
      id: "WEB-DEV" as Category,
      icon: Shield,
      title: "WEB DEVELOPMENT",
      description: "Web applications, APIs, databases, and modern frameworks",
      color: "violet",
    },
    {
      id: "AI-ML" as Category,
      icon: Cpu,
      title: "AI/ML",
      description: "Machine learning, neural networks, and intelligent systems",
      color: "cyan",
    },
  ];

  const sampleIdeas: Record<Category, string[]> = {
    CP: [
      "Build a competitive programming practice platform with daily challenges",
      "Create an algorithm visualizer for sorting, searching, and graph algorithms",
      "Develop a code submission system with real-time judging for contests",
      "Build a problem recommendation engine based on skill level and weak areas",
      "Create a collaborative whiteboard for solving problems in teams",
      "Implement a segment tree visualizer with range queries",
      "Build a dynamic programming solution explainer",
      "Create a graph theory playground with BFS/DFS animations",
      "Develop a binary search practice tool with visual feedback",
      "Build a greedy algorithm simulator for scheduling problems",
      "Create a trie data structure visualizer for string matching",
      "Implement a union-find visualizer for connected components",
      "Build a shortest path algorithm comparator (Dijkstra vs Bellman-Ford)",
      "Create a convex hull visualizer with step-by-step explanation",
      "Develop a bit manipulation playground with binary operations",
      "Build a recursion tree visualizer for understanding call stacks",
      "Create a hash table collision resolver simulator",
      "Implement a priority queue visualizer with heap operations",
      "Build a topological sort animator for DAGs",
      "Create a maximum flow network visualizer",
      "Develop a string matching algorithm comparator (KMP, Rabin-Karp)",
      "Build a matrix exponentiation calculator for linear recurrences",
      "Create a modular arithmetic playground for competitive math",
      "Implement a number theory toolkit with prime factorization",
      "Build a geometry problem solver with coordinate visualization",
      "Create a game theory problem analyzer for zero-sum games",
      "Develop a probability problem simulator with Monte Carlo methods",
      "Build an interval scheduling optimizer",
      "Create a knapsack problem solver with backtracking visualization",
      "Implement a minimum spanning tree comparator (Kruskal vs Prim)",
      "Build a sliding window technique demonstrator",
      "Create a two-pointer algorithm animator",
      "Develop a meet-in-the-middle algorithm explainer",
      "Build a sqrt decomposition visualizer",
      "Create a heavy-light decomposition tutorial tool",
      "Implement a centroid decomposition visualizer for trees",
      "Build a suffix array constructor with LCP array",
      "Create an Aho-Corasick algorithm visualizer for multiple patterns",
      "Develop a Z-algorithm demonstrator for pattern matching",
      "Build a longest common subsequence finder with alignment",
      "Create an edit distance calculator with operation visualization",
      "Implement a coin change problem solver with DP states",
      "Build a rod cutting optimizer with memoization display",
      "Create a matrix chain multiplication optimizer",
      "Develop a traveling salesman problem approximator",
      "Build a subset sum problem solver with bit masking",
      "Create a strongly connected components finder (Tarjan/Kosaraju)",
      "Implement a bridge and articulation point detector",
      "Build an Euler path/circuit finder with visualization",
      "Create a bipartite matching solver with Hungarian algorithm",
      "Develop a 2-SAT problem solver with implication graphs",
      "Build a palindrome partitioning minimizer",
      "Create a digit DP problem solver framework",
      "Implement a bitmask DP visualizer for subset problems",
      "Build a tree DP tutorial with re-rooting technique",
      "Create a expected value calculator for probability DP",
      "Develop a problem difficulty estimator based on tags",
      "Build a virtual contest simulator with rating prediction",
      "Create a code template generator for common algorithms",
      "Implement a test case generator for stress testing",
      "Build a time complexity analyzer for submitted code",
      "Create a memory usage profiler for competitive solutions",
      "Develop a multi-language code translator for CP",
      "Build a problem statement parser with constraint extraction",
      "Create a competitive programming flashcard system",
      "Implement a spaced repetition system for algorithm concepts",
    ],
    "WEB-DEV": [
      "Build a real-time collaborative code editor with video chat integration",
      "Create an event management platform for SCPSC clubs and activities",
      "Develop a student portfolio generator that showcases projects beautifully",
      "Build a resource sharing platform for notes, tutorials, and study materials",
      "Create a campus marketplace for students to buy and sell items",
      "Develop a task management app with Kanban boards and team collaboration",
      "Build a blog platform with markdown support and syntax highlighting",
      "Create a social media dashboard aggregating multiple platforms",
      "Develop a booking system for campus facilities and equipment",
      "Build a quiz and assessment platform with automatic grading",
      "Create a job board connecting students with internship opportunities",
      "Develop a crowdfunding platform for student projects",
      "Build a mentorship matching platform for peer learning",
      "Create a campus news aggregator with push notifications",
      "Develop a study group finder with scheduling features",
      "Build a virtual classroom with whiteboard and screen sharing",
      "Create a feedback collection system with analytics dashboard",
      "Develop a skills tracking platform with learning paths",
      "Build a hackathon management system with team formation",
      "Create a code snippet library with search and categorization",
      "Develop a API documentation generator from code comments",
      "Build a component library showcase with live previews",
      "Create a CSS animation playground with export functionality",
      "Develop a responsive design tester for multiple devices",
      "Build a website performance analyzer with recommendations",
      "Create a SEO checker tool with improvement suggestions",
      "Develop a color palette generator with accessibility checks",
      "Build a typography explorer with font pairing suggestions",
      "Create an icon library manager with custom uploads",
      "Develop a form builder with validation rule generator",
      "Build a survey creator with branching logic support",
      "Create a landing page builder with drag-and-drop",
      "Develop an email template designer with preview",
      "Build a notification system with multiple channels",
      "Create a file upload service with progress tracking",
      "Develop an image optimization tool with CDN integration",
      "Build a URL shortener with analytics and QR codes",
      "Create a webhook testing and debugging tool",
      "Develop an API rate limiter with dashboard",
      "Build a database schema visualizer from SQL",
      "Create a migration generator for database changes",
      "Develop a cron job scheduler with monitoring",
      "Build a log aggregator with search and filtering",
      "Create an error tracking system with stack traces",
      "Develop a feature flag management system",
      "Build an A/B testing platform with statistics",
      "Create a user session replay tool for debugging",
      "Develop a real-time analytics dashboard",
      "Build a customer support chat widget",
      "Create a knowledge base with search functionality",
      "Develop a changelog generator from git commits",
      "Build a status page for service monitoring",
      "Create an incident management system",
      "Develop a deployment pipeline visualizer",
      "Build a container orchestration dashboard",
      "Create a serverless function manager",
      "Develop a WebSocket testing tool",
      "Build a GraphQL playground with schema explorer",
      "Create a REST API client with history",
      "Develop an OAuth flow debugger",
      "Build a JWT decoder and validator",
      "Create a password strength checker library",
      "Develop a CAPTCHA alternative with puzzles",
      "Build a two-factor authentication system",
      "Create a single sign-on integration hub",
      "Develop a privacy consent manager",
    ],
    "AI-ML": [
      "Build a smart attendance system using facial recognition",
      "Create a chatbot that answers questions about SCPSC courses and events",
      "Develop a study recommendation system based on learning patterns",
      "Build an image classifier for campus plant and wildlife identification",
      "Create an AI-powered resume analyzer and improvement suggester",
      "Develop a sentiment analyzer for social media feedback",
      "Build a plagiarism detector using NLP techniques",
      "Create a handwriting recognition system for note digitization",
      "Develop a voice-controlled campus navigation assistant",
      "Build a predictive text completion for coding environments",
      "Create an automated code review system using LLMs",
      "Develop a bug prediction model from code metrics",
      "Build a student performance predictor based on engagement",
      "Create a personalized tutoring system with adaptive difficulty",
      "Develop an emotion detection system from text",
      "Build a fake news detector for social media posts",
      "Create a language translation tool for campus communication",
      "Develop a summarization tool for research papers",
      "Build a question answering system for documentation",
      "Create an auto-tagging system for uploaded content",
      "Develop a recommendation engine for course selection",
      "Build a collaborative filtering system for study resources",
      "Create a knowledge graph builder from text documents",
      "Develop a named entity recognition system for campus data",
      "Build a topic modeling tool for research categorization",
      "Create a text-to-speech system with custom voices",
      "Develop a speech-to-text transcription service",
      "Build a meeting summarizer from audio recordings",
      "Create a podcast episode analyzer with key points",
      "Develop a music genre classifier using audio features",
      "Build an audio denoising tool for recordings",
      "Create a voice cloning system for accessibility",
      "Develop an object detection system for campus security",
      "Build a license plate recognition system for parking",
      "Create a crowd density estimator for event management",
      "Develop a gesture recognition interface for presentations",
      "Build a pose estimation system for sports analysis",
      "Create a medical image analysis tool for health studies",
      "Develop a satellite image analyzer for environmental studies",
      "Build a document layout analyzer for form processing",
      "Create an OCR system for multilingual documents",
      "Develop a signature verification system",
      "Build a product defect detection system using vision",
      "Create a virtual try-on system for merchandise",
      "Develop an AR filter creator using face detection",
      "Build a video content moderation system",
      "Create a highlight generator from long videos",
      "Develop a scene change detector for video editing",
      "Build a deepfake detection system",
      "Create a time series forecaster for resource planning",
      "Develop an anomaly detector for system monitoring",
      "Build a churn prediction model for user retention",
      "Create a demand forecasting system for events",
      "Develop a price optimization engine",
      "Build a fraud detection system for transactions",
      "Create a credit scoring model for student loans",
      "Develop a customer segmentation tool",
      "Build a next-best-action recommender",
      "Create a reinforcement learning game player",
      "Develop a self-driving simulation environment",
      "Build a robot path planning optimizer",
      "Create a drone navigation system",
      "Develop a smart energy management system",
      "Build a predictive maintenance system for equipment",
      "Create an inventory optimization model",
      "Develop a supply chain demand predictor",
      "Build a neural network architecture search tool",
      "Create an AutoML pipeline for beginners",
    ],
  };

  const generateIdea = () => {
    if (!selectedCategory) return;

    setIsGenerating(true);
    setGeneratedIdea(null);

    setTimeout(() => {
      const ideas = sampleIdeas[selectedCategory];
      const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
      setGeneratedIdea(randomIdea);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="NEXUS AI"
          subtitle="Let our quantum neural network generate breakthrough project ideas"
          glowColor="violet"
        />

        <div className="max-w-5xl mx-auto mb-8 md:mb-12">
          <h3 className="font-display text-lg md:text-xl text-foreground mb-4 md:mb-6 text-center">
            Select Your <span className="text-primary text-glow-cyan">Domain</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 perspective-1000">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer transition-all duration-500 preserve-3d ${
                  selectedCategory === category.id
                    ? "scale-105"
                    : "hover:scale-102"
                }`}
                style={{
                  transform: selectedCategory === category.id
                    ? "translateY(-8px) rotateX(2deg)"
                    : undefined,
                }}
              >
                <GlassCard
                  hover3D={false}
                  className={`h-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? category.color === "cyan"
                        ? "border-primary/60 shadow-glow-cyan-lg"
                        : "border-secondary/60 shadow-glow-violet-lg"
                      : ""
                  }`}
                >
                  <div className="text-center py-2 md:py-4">
                    <div
                      className={`w-14 h-14 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        selectedCategory === category.id
                          ? category.color === "cyan"
                            ? "bg-primary/30 shadow-glow-cyan"
                            : "bg-secondary/30 shadow-glow-violet"
                          : category.color === "cyan"
                          ? "bg-primary/10"
                          : "bg-secondary/10"
                      }`}
                    >
                      <category.icon
                        className={`w-7 h-7 md:w-10 md:h-10 ${
                          category.color === "cyan" ? "text-primary" : "text-secondary"
                        }`}
                      />
                    </div>

                    <h4
                      className={`font-display text-lg md:text-2xl font-bold mb-1 md:mb-2 ${
                        selectedCategory === category.id
                          ? category.color === "cyan"
                            ? "text-primary text-glow-cyan"
                            : "text-secondary text-glow-violet"
                          : "text-foreground"
                      }`}
                    >
                      {category.title}
                    </h4>

                    <p className="text-muted-foreground font-body text-xs md:text-sm">
                      {category.description}
                    </p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-12">
          <CyberButton
            variant="secondary"
            size="lg"
            onClick={generateIdea}
            disabled={!selectedCategory || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="inline-block mr-2 w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="inline-block mr-2 w-5 h-5" />
                Generate Idea
              </>
            )}
          </CyberButton>
        </div>

        {(isGenerating || generatedIdea) && (
          <div className="max-w-3xl mx-auto">
            <GlassCard className="glass-strong border-secondary/40">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-secondary animate-glow-pulse" />
                <span className="font-display text-sm text-secondary uppercase tracking-wider">
                  Nexus Output
                </span>
              </div>

              <div className="min-h-[100px] flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-8 bg-secondary rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground font-mono text-sm">
                      Processing neural pathways...
                    </p>
                  </div>
                ) : (
                  <p className="text-foreground font-body text-xl leading-relaxed text-center">
                    {generatedIdea}
                  </p>
                )}
              </div>
            </GlassCard>
          </div>
        )}

        <div className="mt-20">
          <GlassCard className="max-w-2xl mx-auto text-center">
            <Cpu className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              200+ Project Ideas
            </h3>
            <p className="text-muted-foreground font-body text-sm">
              Choose a domain and let Nexus AI generate unique project ideas from our curated collection of 200+ innovative concepts across Competitive Programming, Web Development, and AI/ML.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Ideas;
