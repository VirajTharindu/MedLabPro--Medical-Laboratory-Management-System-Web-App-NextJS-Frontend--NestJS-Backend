# 🧠 Engineering Lessons

Developing MedLabPro was a deep dive into building real-time, resilient, and performant web applications with modern fullstack frameworks.

---

## 1. Real-time Synchronization with WebSockets
Integrating **Socket.io** within **NestJS** taught me the importance of a clean event-driven architecture.
- **Lesson**: Decoupling the business logic from the communication layer (Gateways) allows for easier testing and cleaner controllers.
- **Application**: Used NestJS Gateways to broadcast events (e.g., `patient_created`) only to relevant subscribers, reducing network overhead.

## 2. Browser-side Persistence with IndexedDB
To solve the problem of data loss on page refreshes in a demo environment, I leveraged **IndexedDB**.
- **Lesson**: Standard LocalStorage is synchronous and limited in size. IndexedDB provides an asynchronous, structured way to store large amounts of data.
- **Application**: Integrated the `idb` library for a promise-based API to manage local state, ensuring a seamless user experience.

## 3. Modular Architecture in NestJS
NestJS's dependency injection and modular design were key to managing project complexity.
- **Lesson**: Proper module boundaries (domain-driven) prevent circular dependencies and make the codebase more maintainable.
- **Application**: Organized the backend into `auth`, `patients`, `inventory`, and `realtime` modules with clear interfaces.

## 4. UI Alignment & CSS Standardisation
Refactoring the UI for symmetry and alignment highlighted the power of a centralized design system.
- **Lesson**: Ad-hoc Tailwind classes lead to "UI drift." Standardizing on a core set of utility tokens is essential for a premium feel.
- **Application**: Created a global style layer in `globals.css` that enforced consistent spacing and sizing across all 7 core modules.

## 5. Security Best Practices
Implementing authentication and secure headers reinforced the necessity of defense-in-depth.
- **Lesson**: Security is not a feature; it's a foundation.
- **Application**: Used **Helmet** for header protection and **BCrypt** for hashing, along with secure, HTTP-only cookies for session management.

## 6. Fullstack Workspace Pattern
Managing both a Next.js and a NestJS project within a single repository provided deep insights into cross-cutting concerns as "Monorepo" or "Unified Workspace".
- **Lesson**: Standardizing the domain types in a shared-like folder (or a library) is crucial to prevent "API drift" between the client and server.
- **Application**: Maintained a consistent domain model that both Next.js and NestJS follow, reducing "Undefined is not a function" errors during local development.
