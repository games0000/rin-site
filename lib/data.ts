export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

export interface Plan {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
}

export interface Letter {
  id: string;
  title: string;
  date: string;
  content: string;
  color: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  year: string;
  title: string;
  description: string;
  category: "Life" | "Work" | "Project" | "Idea";
}

export interface ChangelogItem {
  version: string;
  date: string;
  changes: string[];
}

export const recentPlans: Post[] = [
  { id: "1", title: "Project Refactoring Strategy", date: "2026-01-25", excerpt: "Rethinking the core architecture for better scalability and performance.", link: "/plan" },
  { id: "2", title: "Q1 Goals Review", date: "2026-01-15", excerpt: "Analyzing the progress of the first quarter goals and adjusting timelines.", link: "/plan" },
  { id: "3", title: "New Design System", date: "2026-01-05", excerpt: "Drafting the initial concepts for the unified design language.", link: "/plan" },
];

export const recentNotes: Post[] = [
  { id: "1", title: "Understanding React Server Components", date: "2026-01-26", excerpt: "Deep dive into RSC and how it changes the data fetching paradigm.", link: "/notes" },
  { id: "2", title: "The Art of Minimalism", date: "2026-01-20", excerpt: "Why less is often more when it comes to digital interfaces.", link: "/notes" },
  { id: "3", title: "VS Code Extensions I Use", date: "2026-01-10", excerpt: "A list of essential extensions that boost my productivity.", link: "/notes" },
];

export const recentLetters: Post[] = [
  { id: "1", title: "To My Future Self", date: "2026-01-27", excerpt: "A reminder of what matters most in this moment of time.", link: "/letter" },
  { id: "2", title: "Regarding the Rain", date: "2026-01-12", excerpt: "Thoughts provoked by a rainy afternoon in the city.", link: "/letter" },
];

export const plans: Plan[] = [
  {
    id: "1",
    title: "Project Refactoring Strategy",
    date: "2026-01-25",
    content: "The current architecture served us well for the prototype, but as we scale, we're hitting some bottlenecks. The plan is to modularize the core services, decouple the frontend from the backend logic, and introduce a more robust state management solution. This isn't just about code quality; it's about preparing the ground for the new features we have in the pipeline.",
    tags: ["Architecture", "Refactor", "Tech Debt"]
  },
  {
    id: "2",
    title: "Q1 Goals Review",
    date: "2026-01-15",
    content: "It's mid-January, a good time to check in on our quarterly goals. We are ahead of schedule on the design system implementation but lagging slightly on the mobile responsiveness updates. I'm adjusting the timeline to prioritize the mobile view fixes before we push the new marketing pages.",
    tags: ["Management", "Goals", "Q1"]
  },
  {
    id: "3",
    title: "New Design System",
    date: "2026-01-05",
    content: "We need a unified language for our UI. The current inconsistency is confusing for users and slows down development. I've started drafting the 'Aurora' design system, focusing on light, airy interfaces with subtle glassmorphism effects. The key is to make it feel organic yet structured.",
    tags: ["Design", "UI/UX", "System"]
  },
  {
    id: "4",
    title: "Learning Rust",
    date: "2025-12-28",
    content: "I've decided to pick up Rust. The memory safety guarantees and the performance characteristics are too good to ignore for some of the lower-level tooling I want to build. It's a steep learning curve, but the compiler is like a strict but helpful teacher.",
    tags: ["Learning", "Rust", "Programming"]
  }
];

export const letters: Letter[] = [
  {
    id: "1",
    title: "To My Future Self",
    date: "2026-01-27",
    content: "If you are reading this, I hope you have found what you were looking for. Or at least, I hope you have stopped looking for things in places where they cannot be found. Remember the rainy days in January? You were worried about things that seem trivial now.",
    color: "bg-white/10"
  },
  {
    id: "2",
    title: "Regarding the Rain",
    date: "2026-01-12",
    content: "The rain has been falling for three days straight. It washes away the dust but also brings a certain heaviness to the air. I've been thinking about how we weather storms—not by fighting them, but by enduring them.",
    color: "bg-white/5"
  },
  {
    id: "3",
    title: "A Quiet Sunday",
    date: "2025-12-15",
    content: "Sundays are for silence. For resetting the clock. I spent the day organizing my digital garden, pruning dead links and watering the ideas that show promise. It's slow work, but necessary.",
    color: "bg-white/10"
  },
  {
    id: "4",
    title: "The First Step",
    date: "2025-11-01",
    content: "Starting is always the hardest part. The blank page stares back at you, indifferent. But once you make that first mark, the universe shifts slightly. You are no longer an observer; you are a creator.",
    color: "bg-white/5"
  }
];

export const timelineEvents: TimelineEvent[] = [
  { id: "1", date: "Jan 27, 2026", year: "2026", title: "Site Refactoring", description: "Completely reorganized the site structure to better reflect my current state of mind. Added sections for Plans, Letters, and a Timeline.", category: "Project" },
  { id: "2", date: "Jan 10, 2026", year: "2026", title: "Started 'Project Aurora'", description: "Kicked off the new design system initiative. The goal is to create a unified visual language for all my personal tools.", category: "Work" },
  { id: "3", date: "Dec 25, 2025", year: "2025", title: "Winter Reflection", description: "Spent the holidays offline. Read three books and reconnected with old friends. Realized the importance of digital detox.", category: "Life" },
  { id: "4", date: "Nov 15, 2025", year: "2025", title: "First Rust Crate", description: "Published my first crate to crates.io. It's a small CLI tool for file management, but it felt good to ship something in a new language.", category: "Project" },
  { id: "5", date: "Sep 01, 2025", year: "2025", title: "Joined New Team", description: "Started a new role as a Senior Frontend Engineer. The team is distributed, which is a new challenge for me.", category: "Work" },
  { id: "6", date: "Jun 12, 2025", year: "2025", title: "Idea for Rin's Space", description: "The initial spark for this website came during a late-night walk. I wanted a place that felt like a digital home, not just a portfolio.", category: "Idea" },
];

export const changelog: ChangelogItem[] = [
  {
    version: "v1.1.0",
    date: "2026-01-27",
    changes: [
      "Restructured the entire website layout.",
      "Added dedicated Plan, Letter, and Timeline pages.",
      "Implemented a 'stack' view for the Letter page.",
      "Added a searchable timeline feature.",
      "Refreshed the Home page with recent updates sections."
    ]
  },
  {
    version: "v1.0.5",
    date: "2026-01-26",
    changes: [
      "Added 'Shattered Glass' effect to the navigation bar.",
      "Integrated Anime.js for character-by-character text animations.",
      "Added SVG feather animation to the Letter component.",
      "Optimized build process and fixed deployment issues."
    ]
  },
  {
    version: "v1.0.0",
    date: "2026-01-20",
    changes: [
      "Initial release of Rin's Space.",
      "Implemented basic Glassmorphism UI.",
      "Created the core 'GlassArticle' component.",
      "Set up Next.js 16 environment."
    ]
  }
];
