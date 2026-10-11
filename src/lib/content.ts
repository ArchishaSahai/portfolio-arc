import poemData from "./poems.json";

export type Link = { label: string; href: string };

export type Poem = {
  slug: string;
  title: string;
  teaser: string;
  lines: string[];
  closing: string;
};

export const poems: Poem[] = poemData;

export const links = {
  // Kept in parts so the address never appears whole in the page HTML; see RevealEmail.
  email: { user: "archishalko", domain: "gmail.com" },
  linkedin: "https://www.linkedin.com/in/archisha-s-1593bb260",
  github: "https://github.com/ArchishaSahai",
};

export type Project = {
  name: string;
  kind: string;
  summary: string;
  role: string;
  skills: string[];
  links: Link[];
  tint: string;
};

// Featured work, shown as the stacked cards. Written for people, not for a code review.
export const featured: Project[] = [
  {
    name: "Lumina",
    kind: "AI study space",
    summary:
      "Drop in PDFs, lecture videos, websites and notes, then ask questions. Every answer points back to the exact page or timestamp it came from, and Lumina can turn the same material into summaries, learning roadmaps and a two-voice podcast.",
    role: "I shaped the idea, designed how people move from a pile of sources to something they understand, and built it end to end, including the checks that stop it from answering when it isn't sure.",
    skills: ["Product thinking", "Learning design", "Trust and safety", "AI engineering"],
    links: [
      { label: "Try it", href: "https://lumina-smoky-eta.vercel.app" },
      { label: "Source", href: "https://github.com/ArchishaSahai/lumina" },
    ],
    tint: "#b9a6ff",
  },
  {
    name: "Shiro",
    kind: "Toolkit for building AI agents",
    summary:
      "A toolkit developers use to build AI assistants that take several steps on their own. Its point is visibility: you can watch every step an agent takes, see why it chose it, and approve actions before they happen.",
    role: "I designed it around the developer's experience first, then wrote the library, a command-line tool, a visual studio for inspecting runs, tests and the documentation site.",
    skills: ["Developer experience", "Systems design", "Documentation", "Testing"],
    links: [
      { label: "Read the docs", href: "https://shiro-docs.vercel.app/" },
      { label: "Source", href: "https://github.com/ArchishaSahai/shiro" },
    ],
    tint: "#f2b36d",
  },
  {
    name: "Voix",
    kind: "Brand and product design",
    summary:
      "A social platform where creators earn rewards for what they post, built on the Solana blockchain. The challenge was making something technical feel simple and creator-first.",
    role: "I designed the complete brand identity, the web and mobile app, and the pitch materials used to present it.",
    skills: ["Brand identity", "Product design", "Mobile UX", "Pitch storytelling"],
    links: [],
    tint: "#8fd3c7",
  },
  {
    name: "PhishGuard",
    kind: "Research at IIIT Allahabad",
    summary:
      "A Gmail extension that spots phishing emails while you read them. All the checking happens on your own device, so your inbox never leaves your computer. It is right 98.7% of the time and answers in under two seconds.",
    role: "I built the model, then studied where it went wrong and what users reported, which cut false alarms by 63%.",
    skills: ["Research", "Listening to users", "Privacy by design", "Machine learning"],
    links: [{ label: "Source", href: "https://github.com/ArchishaSahai/email_extension" }],
    tint: "#ff9fb2",
  },
  {
    name: "LectureLens",
    kind: "Search for lecture recordings",
    summary:
      "Ask a question across a whole course and get an answer with clickable timestamps that jump to the moment the lecturer said it. Broad questions, narrow ones and \"which lecture covered this?\" each get their own way of searching.",
    role: "I built the whole path, from bringing in subtitle files to the search and the answers with their timestamps.",
    skills: ["Learning design", "Search", "AI engineering"],
    links: [
      { label: "Try it", href: "https://lecture-lens-zeta.vercel.app" },
      { label: "Source", href: "https://github.com/ArchishaSahai/lecture-lens" },
    ],
    tint: "#a6c8ff",
  },
  {
    name: "TrueFace",
    kind: "Deepfake detection",
    summary:
      "A browser extension that flags deepfakes as you browse, from edited photos and videos to AI-written text, so people can tell what's real before they share it.",
    role: "I worked on the concept and on the experience of being warned without being alarmed.",
    skills: ["Product concept", "UX design", "Research"],
    links: [{ label: "Source", href: "https://github.com/ArchishaSahai/TrueFace" }],
    tint: "#d6b4ff",
  },
];

export type SmallProject = { name: string; summary: string; links: Link[] };

export const more: SmallProject[] = [
  {
    name: "ChaiGPT Build",
    summary:
      "A chat assistant that searches the web when it needs to and lets you branch one conversation into separate threads.",
    links: [
      { label: "Try it", href: "https://chai-gpt-build-phi.vercel.app" },
      { label: "Source", href: "https://github.com/ArchishaSahai/chai-gpt-build" },
    ],
  },
  {
    name: "Self-Consistency CLI",
    summary:
      "Asks three different AI models the same question, then has a fourth act as judge and pick or combine the best answer.",
    links: [{ label: "Source", href: "https://github.com/ArchishaSahai/self-consistency-cli" }],
  },
  {
    name: "Persona Chatbot",
    summary: "Talk to characters that stay in character and remember what you said earlier.",
    links: [{ label: "Source", href: "https://github.com/ArchishaSahai/persona-chatbot" }],
  },
  {
    name: "Swarm Learning on Solana",
    summary:
      "My final-year project: many devices train one shared model without sharing their data, bad actors get filtered out, and every contribution is recorded on the blockchain.",
    links: [],
  },
  {
    name: "Portfolio redesign for a client",
    summary:
      "Reworked a Web3 developer's portfolio so their projects read clearly and the site brings in better opportunities.",
    links: [],
  },
];

export type Role = {
  org: string;
  title: string;
  when: string;
  place?: string;
  note: string;
  current?: boolean;
};

export const work: Role[] = [
  {
    org: "ZAVO",
    title: "Business Development Representative",
    when: "2026 – now",
    note: "Formerly Valorant Consulting. A new chapter on the business side: finding the right clients, starting the first conversation and turning it into a partnership.",
    current: true,
  },
  {
    org: "IIIT Allahabad",
    title: "Research Intern",
    when: "May – Jul 2025",
    place: "Prayagraj",
    note: "Built PhishGuard, a private, on-device phishing detector for Gmail, and used real user feedback to cut its false alarms by 63%.",
  },
  {
    org: "Coforge",
    title: "Product Intern",
    when: "Jun – Jul 2024",
    place: "Gurugram",
    note: "Turned business and engineering needs into customer journeys and Figma prototypes for a meeting-room booking product, and worked with stakeholders on what to build first.",
  },
  {
    org: "National Informatics Centre",
    title: "Technology Intern",
    when: "Dec 2023 – Jan 2024",
    place: "Lucknow",
    note: "Helped with APIs, databases and documentation for Manav Sampada, a government HR platform.",
  },
];

export const community: Role[] = [
  {
    org: "ACM Student Chapter, VIT Chennai",
    title: "Chairperson",
    when: "Jun 2024 – Jun 2025",
    note: "Led a coding contest for 400+ participants, raised ₹80,000 in funding from ACM India, and brought in partners for a national-level hackathon.",
  },
  {
    org: "Data Science Club, VIT Chennai",
    title: "Social Media and Marketing Admin",
    when: "",
    note: "Planned the campaigns that grew event turnout by 50% and our following by 80%.",
  },
];

export const education = {
  school: "Vellore Institute of Technology, Chennai",
  degree: "B.Tech in Computer Science and Engineering",
  when: "2022 – 2026",
  note: "CGPA 8.86 / 10",
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "People and business",
    items: [
      "Business development",
      "Client conversations",
      "Partnerships and sponsorship",
      "Leading teams",
      "Event planning",
      "Marketing campaigns",
    ],
  },
  {
    group: "Design and product",
    items: [
      "Product design",
      "UX research",
      "Prototyping in Figma",
      "Brand identity",
      "Design systems",
      "Usability testing",
    ],
  },
  {
    group: "Words",
    items: ["Poetry", "Storytelling", "Pitch decks", "Documentation"],
  },
  {
    group: "AI and building",
    items: [
      "AI assistants and agents",
      "Answering from documents",
      "Prompt design",
      "Web apps",
      "Browser extensions",
    ],
  },
];
