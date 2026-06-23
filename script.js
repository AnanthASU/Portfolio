const profileKnowledge = [
  {
    intent: "summary",
    keywords: ["about", "intro", "summary", "who", "background", "overview"],
    answer:
      "Anantharama Raju Muppala is a full-stack software engineer moving toward AI Engineering. He has 4+ years of experience across React, Redux, TypeScript, Angular, C#, .NET, REST APIs, AWS, CI/CD, testing, and enterprise cloud products. His AI direction focuses on practical agents, RAG-ready systems, semantic search, tool calling, and developer productivity."
  },
  {
    intent: "enlyte",
    keywords: ["enlyte", "mitchell", "current", "mce", "cloud estimating", "recent work"],
    answer:
      "At Enlyte, Ananth works as a Software Development Engineer on Mitchell Cloud Estimating. His work includes .NET 8 / ASP.NET Core microservices, AWS-based backend modernization, estimate profile history, audit trails, schema validation, carrier-specific rules, React/Redux/TypeScript UI features, annotations, accessory part tagging, reviewer/state logic, and integration reliability."
  },
  {
    intent: "teradata",
    keywords: ["teradata", "intern", "vantagecloud", "lake", "angular", "pendo", "covalent"],
    answer:
      "At Teradata, Ananth worked on VantageCloud Lake Console UI. He built Angular/TypeScript compute resource management features that improved query performance by 25–50%, integrated Pendo Resource Center modules, contributed to the Covalent Angular/Material open-source library, redesigned the VantageCloud Lake homepage, and used AI-assisted development practices across a large Angular/Nx monorepo."
  },
  {
    intent: "cicd-agent",
    keywords: ["ci", "cd", "cicd", "jenkins", "build failure", "triage", "agent", "streamlit", "logs"],
    answer:
      "The CI/CD Failure Triage Agent is Ananth's practical AI Engineering project. It analyzes Jenkins/CI logs, extracts error signals, classifies failures like Jest/RTL, TypeScript, .NET, npm, schema, flaky timeout, memory, and infrastructure issues, retrieves known fixes from a local knowledge base, and generates Markdown reports plus Teams-ready summaries. Live demo: https://cicd-triage-agent-ife5455wtbmykud5htumeb.streamlit.app/"
  },
  {
    intent: "skills",
    keywords: ["skills", "tech", "stack", "tools", "frontend", "backend", "cloud", "ai"],
    answer:
      "Ananth's core stack includes JavaScript, TypeScript, Java, C#, Python, SQL, React, Redux, Angular, Next.js, Node.js, ASP.NET Core, ASP.NET Web API, REST APIs, microservices, AWS, Lambda, S3, API Gateway, Jenkins, GitHub, GitLab, Azure DevOps, Jira, Jest, React Testing Library, Cypress, Playwright, PostgreSQL, MySQL, and MongoDB. AI-focused skills include agents, RAG, embeddings, vector search, semantic search, prompt engineering, tool calling, evaluation, guardrails, and AI-assisted SDLC."
  },
  {
    intent: "projects",
    keywords: ["project", "projects", "gitview", "ml", "news recommender", "test case"],
    answer:
      "Key projects include the CI/CD Failure Triage Agent, GitView GitHub analytics app, ML Test Case Reduction research pipeline, and a Personalized News Recommender. These projects show a mix of full-stack engineering, developer tools, analytics, and applied machine learning."
  },
  {
    intent: "contact",
    keywords: ["contact", "email", "linkedin", "github", "hire", "resume"],
    answer:
      "You can contact Ananth at amuppal1@asu.edu. GitHub: https://github.com/AnanthASU. LinkedIn: https://www.linkedin.com/in/anantharama-raju-muppala-57141017b/. He is open to AI Engineer, Full-Stack Engineer, Forward-Deployed Engineer, and Applied AI roles."
  }
];

const defaultAnswer =
  "I can answer questions about Ananth's Enlyte experience, Teradata internship, AI direction, CI/CD triage agent, projects, skills, education, and contact details.";

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreIntent(question, item) {
  const q = normalize(question);
  return item.keywords.reduce((score, keyword) => {
    const k = normalize(keyword);
    if (q.includes(k)) return score + Math.max(2, k.split(" ").length * 2);
    return score;
  }, 0);
}

function getAssistantAnswer(question) {
  const q = normalize(question);
  if (!q) return defaultAnswer;
  if (["hi", "hello", "hey"].includes(q)) {
    return "Hi, I’m Ananth AI. Ask me about his experience, projects, AI Engineering direction, or CI/CD triage agent.";
  }

  const ranked = profileKnowledge
    .map((item) => ({ ...item, score: scoreIntent(q, item) }))
    .sort((a, b) => b.score - a.score);

  if (!ranked[0] || ranked[0].score === 0) return defaultAnswer;
  return ranked[0].answer;
}

const chatToggle = document.getElementById("chatToggle");
const navAiButton = document.getElementById("navAiButton");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
let greeted = false;

function addMessage(role, text) {
  const message = document.createElement("div");
  message.className = `chat-message ${role}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function openChat() {
  chatPanel.classList.add("open");
  chatPanel.setAttribute("aria-hidden", "false");
  chatToggle.setAttribute("aria-expanded", "true");

  if (!greeted) {
    addMessage(
      "bot",
      "Hi, I’m Ananth AI 👋\nI’m a free local portfolio assistant. Ask me about Ananth’s experience, AI projects, skills, or CI/CD triage agent."
    );
    greeted = true;
  }

  setTimeout(() => chatInput.focus(), 80);
}

function closeChat() {
  chatPanel.classList.remove("open");
  chatPanel.setAttribute("aria-hidden", "true");
  chatToggle.setAttribute("aria-expanded", "false");
}

chatToggle?.addEventListener("click", () => {
  if (chatPanel.classList.contains("open")) closeChat();
  else openChat();
});

navAiButton?.addEventListener("click", openChat);
chatClose?.addEventListener("click", closeChat);

document.querySelectorAll(".chat-suggestions button").forEach((button) => {
  button.addEventListener("click", () => {
    const text = button.textContent.trim();
    addMessage("user", text);
    setTimeout(() => addMessage("bot", getAssistantAnswer(text)), 220);
  });
});

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;

  addMessage("user", question);
  chatInput.value = "";

  setTimeout(() => {
    addMessage("bot", getAssistantAnswer(question));
  }, 220);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatPanel.classList.contains("open")) {
    closeChat();
  }
});
