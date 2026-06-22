# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/


# Docker
- Use bun as the package manager and runtime for both backend and frontend in all Docker configurations. Confidence: 0.70

# Deployment
- Prefer local Docker builds over CI/CD pipelines — keep deployment simple, build images locally then push to Docker Hub, VPS only pulls & runs. Confidence: 0.70
- Use Docker Hub over GHCR for simplicity — no PAT or GitHub Secrets needed. Confidence: 0.65
- Separate deployment documentation by method (manual, Docker Hub, GHCR) rather than one monolithic guide. Confidence: 0.70

# Scripts
- Avoid creating deploy/utility scripts unless explicitly requested — user prefers direct commands. Confidence: 0.65

