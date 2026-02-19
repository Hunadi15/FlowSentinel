# FlowSentinel

**[🚀 Try the live dashboard now](https://automatic-chainsaw-v6wjxpc6ppjrfpvr6-8000.app.github.dev){:target="_blank"}**

> Opens the preview directly in your browser using the workspace server so you can interact with the UI without any setup.

FlowSentinel is an open‑source traffic governance and abuse‑detection platform built in .NET Core. The project includes a sample API, a gateway, a rate‑limiting engine, and a front‑end dashboard for policy management and analytics.

---

## 🚀 Features

- **Real‑time statistics** and traffic distribution visualization
- **Policy management UI** with create/edit/delete workflows
- **Modular architecture** with samples and worker services

---

## 🧠 Dashboard (Live Demo)

The dashboard is a static HTML/JS interface located under `flowsentinel-main/src/FlowSentinel.Dashboard`. It comes with interactive controls:

- Switch between overview, policies, analytics, etc.
- Create, edit and delete rate‑limiting policies via a modal form
- Search policies by name
- Simulated real‑time metrics and charts

### 🖥️ Local preview

1. Navigate to the dashboard folder:
   ```bash
   cd flowsentinel-main/src/FlowSentinel.Dashboard
   ```
2. Start a simple HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

### 🌐 Hosted demo

A live copy of the dashboard is available via GitHub Pages (branch `gh-pages`):

> https://hunadi15.github.io/FlowSentinel/flowsentinel-main/src/FlowSentinel.Dashboard/index.html

*(If the demo link is not yet active, follow the GitHub Pages setup steps below.)*

---

## 🛠️ Running the full stack with Docker

A `docker-compose.yml` at the repo root can spin up all services for integration testing:

```bash
cd flowsentinel-main
docker compose up --build
```

This will launch:

- `FlowSentinel.Gateway` (API gateway)
- `FlowSentinel.SampleApi` (demo service)
- `FlowSentinel.Worker` (analytics worker)

Once the containers are running you can browse the dashboard as described above and the services will respond to policy changes.

---

## 📖 Documentation

See the `docs/` directory for additional articles:
- `rate-limiting.md` – overview of rate limiter implementations
- `chaos-testing.md` – guidance for fault injection experiments

---

## 🏗️ Contribution

Feel free to file issues or open PRs. Run unit tests with:

```bash
cd tests/FlowSentinel.UnitTests
dotnet test
```

## ✅ License

MIT
