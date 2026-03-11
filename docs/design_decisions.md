# 🔧 Key Design Decisions

The development of MedLabPro involved several strategic technical choices to balance speed of development with a professional-grade user experience.

---

## 1. Choice of In-Memory Storage for Demo
**Decision**: Use JavaScript `Map` objects on the backend instead of a persistent database like MongoDB or PostgreSQL for the initial release.
- **Reasoning**: This eliminates the "barrier to entry" for reviewers. The project can be cloned and run instantly without setting up external infrastructure.
- **Trade-off**: Data is lost on server restart, but this is mitigated by frontend IndexedDB persistence.

## 2. Decoupled Role-Based UI
**Decision**: Implementing a unified layout with conditional rendering for different roles (Admin, Tech, Doctor).
- **Reasoning**: This ensures a consistent brand experience while strictly enforcing access control via the authentication state.
- **Benefit**: Reduces code duplication by sharing common components like the `LayoutNav` while specializing the dashboard.

## 3. Dark-Mode "Premium" Aesthetics
**Decision**: Choosing a Deep Slate (950) and Cyan (500) color palette with glassmorphism effects.
- **Reasoning**: In a laboratory environment, high-contrast dark modes are often preferred for readability over long shifts and provide a modern, "Pro" feel.
- **Benefit**: Differentiates the product from traditional, clinical-looking gray/white legacy systems.

## 4. Semantic Layout Refactoring
**Decision**: Moving from ad-hoc page paddings to a single, robust container in `layout.tsx`.
- **Reasoning**: This ensures that all pages are perfectly symmetric and aligned, regardless of content complexity.
- **Outcome**: Achieved pixel-perfect alignment across the site, contributing to the recruitment-ready quality of the project.

## 5. Socket.io for Event-Driven Updates
**Decision**: Opting for WebSockets over long-polling or Server-Sent Events (SSE).
- **Reasoning**: Clinical data often requires bi-directional, low-latency communication (e.g., instant result alerts).
- **Benefit**: Provides a much more responsive feel that mimics high-end medical software.

## 6. Migration to Supabase
**Decision**: Moving from in-memory maps to Supabase (PostgreSQL).
- **Reasoning**: To scale from a demo to a production-ready system, persistent cloud storage and enterprise-grade auth are required. Supabase provides these while maintaining high development velocity.

## 7. Decoupled Clean Architecture
**Decision**: Implementing a strict monorepo-style separation between frontend and backend.
- **Reasoning**: This pattern provides the best separation of concerns, allowing for independent scaling and testing of the backend API and the frontend client.
- **Outcome**: A clean, technical stack that is easy to navigate for reviewers and simple to extend for developers.
