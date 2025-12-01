# AVX Governance Platform – Architecture (Draft)

## 1. System Overview

AVX Governance Platform is the central layer that controls:
- Identity & Access Management (IAM)
- Roles and permissions across AVX modules
- Policy enforcement (RBAC + ABAC)
- Audit logging & compliance
- Multi-country and multi-institution governance

The platform will serve as the **“control tower”** for all ArabVisionX services.

---

## 2. Main Components

### 2.1 Frontend (Governance Dashboard)
- Technology: React / Next.js
- Responsibilities:
  - Role management
  - User management
  - Viewing audit logs
  - Policy configuration
  - Country & institution setup

### 2.2 Backend API
- Technology: Node.js (Fastify) or Python (FastAPI)
- Responsibilities:
  - Authentication (JWT / OAuth2)
  - Policy engine (RBAC + ABAC)
  - Audit logging
  - Serving secure APIs to all AVX modules

### 2.3 Database Layer
- Technology: PostgreSQL
- Tables:
  - users
  - roles
  - user_roles
  - countries
  - institutions
  - policies
  - audit_logs

### 2.4 Integration Layer
- Centralized API gateway for all AVX tools.
- Enforces governance policies per request.

---

## 3. Authentication Flow

1. User logs in ? /auth/login  
2. Password validated  
3. JWT access token issued containing:
   - user_id
   - roles[]
   - country_id
   - institution_id  
4. Frontend stores token  
5. All requests include the token in **Authorization: Bearer** header  

---

## 4. Authorization Flow

For each API request:

1. Extract token  
2. Identify user  
3. RBAC check:
   - Does the assigned role allow this action?  
4. ABAC policy check:
   - Is the user allowed based on country, institution, data type, etc.?  
5. Log the action  
6. Respond with allow/deny  

---

## 5. API Endpoints (Draft)

### Auth
- POST /auth/login
- POST /auth/refresh

### Users
- GET /users
- POST /users
- GET /users/{id}
- PATCH /users/{id}

### Roles
- GET /roles
- POST /roles

### Policies
- GET /policies
- POST /policies

### Audit Logs
- GET /audit?filters...

---

## 6. Next Steps

1. Build backend starter project  
2. Build frontend starter (Next.js layout + login page)  
3. Implement IAM module  
4. Implement Policy Engine  
5. Connect Governance to other AVX systems  
