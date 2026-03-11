# 🚀 Setup & Installation Guide

This guide provides step-by-step instructions to get the MedLabPro project running locally for development and testing.

---

## 📋 Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) (v10.x or later)
- [Docker](https://www.docker.com/) (Optional, for containerized deployment)

---

## 🔧 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/VirajTharindu/MedLabPro.git
cd MedLabPro
```

### 2. Backend Setup (NestJS)
```bash
cd backend
npm install
npm run start:dev
```
The backend will be available at `http://localhost:3001`.

### 3. Frontend Setup (Next.js)
```bash
cd ../frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`.

---

## 🗄️ Database Configuration
MedLabPro is currently configured for a **zero-overhead demo experience**:
- **Backend Storage**: Uses an in-memory `Map` that initializes on startup. No external database (like PostgreSQL or MongoDB) is required for the initial run.
- **Frontend Persistence**: Uses **IndexedDB** in your browser to maintain state during session refreshes.

### 🔮 Future Integration: Supabase
We are currently working on integrating **Supabase** to provide:
- Persistent cloud-based PostgreSQL storage.
- Multi-factor authentication (MFA).
- Row-level security (RLS) for clinical data.

> [!NOTE]
> For production environments, the `PatientsService` and other domain services can be easily refactored to use TypeORM or Mongoose by updating the dependency injection in NestJS modules.

---

## 🐳 Docker Deployment (Optional)
A `docker-compose.yml` can be used to spin up the entire stack in one command:
```bash
docker-compose up --build
```

---

## 🧪 Running Tests
### Backend Tests
```bash
cd backend
npm run test
```

### Frontend Linting
```bash
cd frontend
npm run lint
```
