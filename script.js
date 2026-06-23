const canvas = document.getElementById('stars');
const ctx = canvas?.getContext('2d');
let particles = [];

const resizeStars = () => {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  particles = Array.from({ length: Math.min(110, Math.floor(window.innerWidth / 11)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.25,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    a: Math.random() * 0.55 + 0.18,
  }));
};

const drawStars = () => {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(205, 241, 255, ${p.a})`;
    ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 105) {
        ctx.strokeStyle = `rgba(103, 232, 249, ${(1 - dist / 105) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawStars);
};
resizeStars();
drawStars();
window.addEventListener('resize', resizeStars);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const tiltCard = document.getElementById('tilt-card');
const humanAvatar = document.getElementById('humanAvatar');
if (tiltCard) {
  tiltCard.addEventListener('mousemove', (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 5}deg)`;
    if (humanAvatar) {
      humanAvatar.style.transform = `translate3d(${x * 10}px, ${y * 6}px, 0) rotateY(${x * 12}deg) rotateX(${y * -8}deg)`;
    }
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    if (humanAvatar) humanAvatar.style.transform = 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)';
  });
}

// Free, lightweight, open-source portfolio assistant.
// It runs fully in the browser with local resume/project data and does not call any API.
const profileKnowledge = [
  {
    intent: 'summary',
    keywords: ['about', 'intro', 'summary', 'who', 'background', 'tell me about', 'overview'],
    answer: `Anantharama Raju Muppala is a full-stack software engineer moving toward AI Engineering. He has 4+ years of experience across React, Redux, TypeScript, Angular, C#, .NET, REST APIs, AWS, CI/CD, and enterprise cloud products. His AI direction focuses on AI-assisted developer workflows, RAG-ready systems, semantic search foundations, agentic workflows, and reliable full-stack product delivery.`
  },
  {
    intent: 'enlyte',
    keywords: ['enlyte', 'mitchell', 'current', 'recent', 'job', 'work', 'cloud estimating', 'mce'],
    answer: `At Enlyte, Ananth works as a Software Development Engineer on Mitchell Cloud Estimating. His work includes .NET 8 / ASP.NET Core microservices, AWS-based backend modernization, estimate profile history, audit trails, schema validation, carrier-specific business rules, React/Redux/TypeScript UI features, annotations, accessory part tagging, reviewer/state logic, and integration reliability. He also prototypes AI-assisted SDLC workflows using GitHub Copilot, ticket context, repository search, Jenkins logs, and PR summaries.`
  },
  {
    intent: 'teradata',
    keywords: ['teradata', 'intern', 'vantagecloud', 'lake', 'angular', 'pendo', 'covalent'],
    answer: `At Teradata, Ananth worked as a Software Engineer Intern on VantageCloud Lake Console UI. He built Angular/TypeScript compute resource management features that improved query performance by 25–50%, integrated Pendo Resource Center modules for guides, feedback, announcements, and metrics, contributed to the Covalent Angular/Material open-source library, redesigned the VantageCloud Lake homepage, and used AI-assisted development practices to navigate and refactor a large Angular/Nx monorepo.`
  },
  {
    intent: 'valuelabs',
    keywords: ['valuelabs', 'mitchell connect', 'senior', 'software engineer', 'india'],
    answer: `At ValueLabs, Ananth worked on Mitchell Connect as a Software Engineer and later Senior Software Engineer. He led React/Redux state-management modernization, reduced data-handling defects by 30%, built REST APIs with ASP.NET Web API, delivered Jobs and Reports dashboards, supported AngularJS-to-React modernization, and built reusable UI components adopted by 15+ internal teams.`
  },
  {
    intent: 'skills',
    keywords: ['skills', 'tech', 'technology', 'stack', 'tools', 'languages', 'frontend', 'backend', 'cloud'],
    answer: `Ananth's core skills include JavaScript, TypeScript, Java, C#, Python, SQL, React, Redux, Angular, Next.js, Node.js, ASP.NET Core, ASP.NET Web API, REST APIs, microservices, AWS, Lambda, S3, API Gateway, Jenkins, GitHub, GitLab, Azure DevOps, Jira, Jest, React Testing Library, Cypress, Playwright, PostgreSQL, MySQL, and MongoDB. His AI-focused keywords include RAG, embeddings, vector search, prompt engineering, AI agents, tool calling, LLM evaluation, guardrails, semantic search, and AI-assisted SDLC workflows.`
  },
  {
    intent: 'projects',
    keywords: ['project', 'projects', 'portfolio', 'github', 'gitview', 'ml', 'machine learning', 'news recommender', 'test case'],
    answer: `Projects to notice: 1) AI SDLC Agent Prototype — a concept workflow for ticket/PR summaries, repo search, test suggestions, Jenkins failure triage, and Teams notifications. 2) GitView — a GitHub analytics app with OAuth, contributor insights, commit/PR analysis, date filtering, Excel upload, and dashboards. 3) ML Test Case Reduction — a research-style ML pipeline using Random Forest, KMeans, Decision Trees, adequacy scoring, and labels to reduce redundant tests while preserving coverage. 4) Personalized News Recommender — a React/Redux/MongoDB/Python recommendation system using content-based ML.`
  },
  {
    intent: 'ai',
    keywords: ['ai', 'agent', 'agents', 'rag', 'llm', 'semantic', 'copilot', 'genai', 'artificial intelligence'],
    answer: `Ananth is positioning toward AI Engineering by combining full-stack engineering with practical AI workflows. His strongest AI story is not "deployed production GenAI at every job"; it is more believable and useful: he builds reliable full-stack/cloud systems that can support semantic search, RAG, compliance assistants, tool-calling integrations, and AI-assisted developer workflows. He is also building portfolio projects around local AI assistants, SDLC agents, and RAG-ready product experiences.`
  },
  {
    intent: 'education',
    keywords: ['education', 'degree', 'asu', 'master', 'bachelor', 'university', 'cgpa'],
    answer: `Ananth earned a Master of Science in Computer Software Engineering from Arizona State University with a 3.70 CGPA. He also completed a Bachelor of Technology in Computer Science and Engineering from the School of Engineering and Technology, Jain University.`
  },
  {
    intent: 'contact',
    keywords: ['contact', 'email', 'linkedin', 'github', 'reach', 'hire', 'resume'],
    answer: `You can contact Ananth at amuppal1@asu.edu. His GitHub is https://github.com/AnanthASU and his LinkedIn is https://www.linkedin.com/in/anantharama-raju-muppala-57141017b/. He is open to AI Engineer, Full-Stack Engineer, Forward-Deployed Engineer, and Applied AI roles.`
  },
  {
    intent: 'whyhire',
    keywords: ['why hire', 'strength', 'fit', 'recruiter', 'candidate', 'good fit'],
    answer: `Ananth is a strong fit for AI Full-Stack roles because he combines production software engineering with AI-oriented workflows. He has hands-on experience across frontend, backend, cloud, CI/CD, testing, enterprise systems, and domain-heavy products. That gives him a practical foundation to build AI applications that are reliable, integrated into real workflows, and useful beyond demos.`
  }
];

const defaultAnswer = `I can answer questions about Ananth's experience, projects, skills, education, AI direction, Enlyte work, Teradata internship, and contact details. Try asking: "What did Ananth build at Enlyte?", "What projects show AI skills?", or "Why is he a fit for AI Engineer roles?"`;

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreIntent(question, item) {
  const q = normalize(question);
  return item.keywords.reduce((score, keyword) => {
    const k = normalize(keyword);
    if (q.includes(k)) return score + Math.max(2, k.split(' ').length * 2);
    return score;
  }, 0);
}

function getAssistantAnswer(question) {
  const q = normalize(question);
  if (!q) return defaultAnswer;
  if (['hi', 'hello', 'hey'].includes(q)) {
    return `Hi, I’m Ananth’s local portfolio assistant. Ask me about his Enlyte experience, AI direction, projects, skills, or resume.`;
  }
  const ranked = profileKnowledge
    .map(item => ({ ...item, score: scoreIntent(q, item) }))
    .sort((a, b) => b.score - a.score);
  const best = ranked[0];
  if (!best || best.score === 0) return defaultAnswer;

  const second = ranked[1];
  if (second && second.score > 0 && best.intent !== second.intent && best.score - second.score <= 1) {
    return `${best.answer}\n\nRelated note: ${second.answer}`;
  }
  return best.answer;
}

const chatToggle = document.getElementById('chatToggle');
const navChatButton = document.getElementById('navChatButton');
const chatPanel = document.getElementById('chatPanel');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
let hasGreeted = false;

function addMessage(role, text) {
  if (!chatMessages) return;
  const message = document.createElement('div');
  message.className = `chat-message ${role}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function openChat() {
  if (!chatPanel || !chatToggle) return;
  chatPanel.classList.add('open');
  chatPanel.setAttribute('aria-hidden', 'false');
  chatToggle.setAttribute('aria-expanded', 'true');
  if (!hasGreeted) {
    addMessage('bot', `Hi, I’m Ananth AI 👋\nI’m a free, local portfolio assistant. I can answer recruiter-style questions about Ananth’s experience, projects, skills, and AI Engineering direction.`);
    hasGreeted = true;
  }
  setTimeout(() => chatInput?.focus(), 60);
}

function closeChat() {
  if (!chatPanel || !chatToggle) return;
  chatPanel.classList.remove('open');
  chatPanel.setAttribute('aria-hidden', 'true');
  chatToggle.setAttribute('aria-expanded', 'false');
}

chatToggle?.addEventListener('click', () => {
  if (chatPanel?.classList.contains('open')) closeChat();
  else openChat();
});
navChatButton?.addEventListener('click', openChat);
chatClose?.addEventListener('click', closeChat);

document.querySelectorAll('.chat-suggestions button').forEach(button => {
  button.addEventListener('click', () => {
    const question = button.dataset.question || button.textContent;
    openChat();
    addMessage('user', question);
    setTimeout(() => addMessage('bot', getAssistantAnswer(question)), 280);
  });
});

chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = chatInput?.value.trim();
  if (!question) return;
  addMessage('user', question);
  chatInput.value = '';
  setTimeout(() => addMessage('bot', getAssistantAnswer(question)), 280);
});
