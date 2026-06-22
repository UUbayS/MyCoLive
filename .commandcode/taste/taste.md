# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/


# Docker
- Use bun as the package manager and runtime for both backend and frontend in all Docker configurations. Confidence: 0.70
- When building Docker images on Windows for Alpine Linux containers, strip CRLF line endings from shell scripts by adding `RUN sed -i 's/\r$//'` before `chmod +x` in the Dockerfile. Confidence: 0.70

# Deployment
- Prefer local Docker builds over CI/CD pipelines — keep deployment simple, build images locally then push to Docker Hub, VPS only pulls & runs. Confidence: 0.70
- Use Docker Hub over GHCR for simplicity — no PAT or GitHub Secrets needed. Confidence: 0.65
- Separate deployment documentation by method (manual, Docker Hub, GHCR) rather than one monolithic guide. Confidence: 0.70
- Use git to sync deployment files (docker-compose, Caddyfile, etc.) to VPS instead of SCP — user maintains a git repo on the VPS. Confidence: 0.60

# Scripts
- Avoid creating deploy/utility scripts unless explicitly requested — user prefers direct commands. Confidence: 0.65

