# Anantharama Raju Muppala — 3D AI Full-Stack Portfolio

A lightweight static portfolio for GitHub Pages with a free, browser-only AI portfolio assistant.

## What is included

- Clean 3D-inspired portfolio layout
- Pure CSS interactive human/avatar figure
- Recruiter-focused AI Full-Stack Engineer content
- Floating "Ask Ananth AI" chat assistant
- No backend, no API key, no paid model
- Local structured knowledge base in `script.js`
- Works on GitHub Pages

## AI assistant approach

The assistant is intentionally lightweight and free. It does not call OpenAI, Claude, Gemini, or any remote API. It answers from local resume/project data using keyword/intent matching in JavaScript.

You can customize answers by editing the `profileKnowledge` array in `script.js`.

## Deploy to GitHub Pages

Copy these files into your `AnanthASU/Portfolio` repo:

- `index.html`
- `styles.css`
- `script.js`
- `404.html`
- `README.md`

Then run:

```powershell
git add .
git commit -m "Add lightweight AI portfolio assistant"
git push -u origin HEAD:main --force-with-lease
```

In GitHub, set Pages to:

- Source: Deploy from a branch
- Branch: main
- Folder: /root

Open:

```text
https://AnanthASU.github.io/Portfolio/?v=assistant
```

## Placeholder notes

Add later when ready:

- Real profile photo or custom avatar
- Resume PDF link
- Live project demo links
- GitHub repo links for each project
- Blog/case study pages
- Optional real RAG/LLM backend using Vercel or Cloudflare Workers
